// Description: All the functions related to CarListing will be here.
// CODE WRITTEN BY SIMRANJOT KAUR
import CarListing from "../Models/CarListing.js";

import { errorHandler } from "../utils/error.js";
export const createCarListing = async (req, res, next) => {
  try {
    const carlisting = await CarListing.create(req.body);
    return res.status(201).json(carlisting);
  } catch (error) {
    next(error);
  }
};
export const deleteCarListing = async (req, res, next) => {
  const carlisting = await CarListing.findById(req.params.carId);
  console.log(req.body);
  console.log("User id from frontend", req.body.userId);
  console.log("Car id", req.params.carId);
  console.log("Car listing", carlisting);
  if (req.body.userId !== carlisting.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    await CarListing.findByIdAndDelete(req.params.carId);
    return res.status(200).json("CarListing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateCarListing = async (req, res, next) => {
  const carlisting = await CarListing.findById(req.params.carId);

  if (!carlisting) return next(errorHandler(404, "CarListing not found"));
  if (req.body.userRef !== carlisting.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    const updatedCarListing = await CarListing.findByIdAndUpdate(
      req.params.carId,
      req.body
    );

    return res.status(200).json(updatedCarListing);
  } catch (error) {
    next(error);
  }
};

export const getCarListing = async (req, res, next) => {
  try {
    const carlisting = await CarListing.findById(req.params.id);
    if (!carlisting) return next(errorHandler(404, "CarListing not found"));
    return res.status(200).json(carlisting);
  } catch (error) {
    next(error);
  }
};

// export const getAllCarsListings = async (req, res, next) => {
//   try {
//     const carlistings = await CarListing.find();
//     console.log(carlistings.length);
//     return res.status(200).json(carlistings);
//   } catch (error) {
//     next(error);
//   }
// };
export const getAllCarsListings = async (req, res, next) => {
  try {
    // Parse query parameters from request
    const { make, year, model, limit, fuel_type } = req.query;

    // Create a filter object based on the provided query parameters
    const filter = {};
    if (make) filter["details.make"] = make;
    if (year) filter["details.year"] = year;
    if (model) filter["details.model"] = model;
    if (fuel_type) filter["details.fuel_type"] = fuel_type;
    console.log("filter", { ...filter });

    // Perform database query with the filter
    const carlistings = await CarListing.find(filter); // Apply filter here

    console.log("here", carlistings.length);

    // Optionally, limit the number of results returned
    const limitedResults = carlistings.slice(
      0,
      parseInt(limit) || carlistings.length
    );

    console.log(limitedResults.length);
    return res.status(200).json(limitedResults);
  } catch (error) {
    next(error);
  }
};
