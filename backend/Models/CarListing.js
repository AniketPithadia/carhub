import mongoose from "mongoose";

const carListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    details: {
      city_mpg: {
        type: Number,
        required: true,
      },
      combination_mpg: {
        type: Number,
      },
      cylinders: {
        type: Number,
      },
      displacement: {
        type: Number,
      },
      drive: {
        type: String,
      },
      fuel_type: {
        type: String,
        required: true,
      },
      highway_mpg: {
        type: Number,
      },
      make: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      transmission: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const CarListing = mongoose.model("Cars", carListingSchema);

export default CarListing;
