import express from "express";
import {
  createCarListing,
  deleteCarListing,
  updateCarListing,
  getCarListing,
  getAllCarsListings,
} from "../Controllers/CarListingController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
const router = express.Router();
router.post("/create", createCarListing);
router.post("/delete/:carId", deleteCarListing);
router.post("/update/:carId", updateCarListing);
router.get("/getListing/:id", getCarListing);
router.get("/getAllCars", getAllCarsListings);
export default router;
