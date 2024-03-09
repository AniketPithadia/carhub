import express from "express";
import {
  updateUser,
  deleteUser,
  getUserCarListings,
  getUser,
} from "../Controllers/UserController.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:userId", getUserCarListings);
router.get("/getUser/:emailId", getUser);
export default router;
