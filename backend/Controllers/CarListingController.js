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
  const carlisting = await CarListing.findById(req.params.id);
  if (req.user.id !== carlisting.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    return res.status(200).json("CarListing has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateCarListing = async (req, res, next) => {
  const carlisting = await CarListing.findById(req.params.id);
  if (!carlisting) return next(errorHandler(404, "CarListing not found"));
  if (req.user.id !== carlisting.userRef)
    return next(errorHandler(403, "No access to this account"));
  try {
    const updatedCarListing = await CarListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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

export const getAllCarsListings = async (req, res, next) => {
  try {
    const carlistings = await CarListing.find();
    console.log(carlistings.length);
    return res.status(200).json(carlistings);
  } catch (error) {
    next(error);
  }
};
