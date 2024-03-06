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

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true }
);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const CarListing =
  mongoose.models?.CarListing || mongoose.model("CarListing", carListingSchema);
