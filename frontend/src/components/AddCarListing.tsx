"use client";
import { CarProps } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

const AddCarlisting = ({ session }: { session: any }) => {
  const router = useRouter();
  let emailId = session?.user?.email;
  const makers = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroen",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MINI",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Ram",
    "Rolls-Royce",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];
  const years = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];
  const [formData, setFormData] = useState<CarProps>({
    title: "",
    description: "",
    price: 1000,
    location: "",
    imageUrls: [],
    userRef: "",
    details: {
      city_mpg: 10,
      combination_mpg: 10,
      cylinders: 2,
      displacement: 1000,
      drive: "",
      fuel_type: "",
      highway_mpg: 1,
      make: "",
      model: "",
      transmission: "",
      year: 2000,
    },
  });
  console.log("user id from useEffect", formData.userRef);
  const [errors, setErrors] = useState<Partial<CarProps>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDetailsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      details: {
        ...prevFormData.details,
        [name]: value,
      },
    }));
  };

  const handleImageUploadSuccess = (imageUrl: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: [...prevFormData.imageUrls, imageUrl],
    }));
  };
  console.log("formData", formData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.imageUrls.length !== 0) {
      const newErrors: any = {};

      if (!formData.title || formData.title.trim() === "") {
        newErrors.title = "Title is required";
      }

      if (!formData.description || formData.description.trim() === "") {
        newErrors.description = "Description is required";
      }

      if (!formData.price || isNaN(formData.price) || formData.price < 0) {
        newErrors.price = "Price must be a valid number";
      }

      if (!formData.location || formData.location.trim() === "") {
        newErrors.location = "Location is required";
      }

      if (
        !formData.details.fuel_type ||
        formData.details.fuel_type.trim() === ""
      ) {
        newErrors.fuel_type = "Fuel Type is required";
      }

      if (!formData.details.make || formData.details.make.trim() === "") {
        newErrors.make = "Make is required";
      }

      if (!formData.details.model || formData.details.model.trim() === "") {
        newErrors.model = "Model is required";
      }

      if (
        !formData.details.year ||
        isNaN(formData.details.year) ||
        formData.details.year < 0
      ) {
        newErrors.year = "Year of Production must be a valid number";
      }

      if (
        !formData.details.city_mpg ||
        isNaN(formData.details.city_mpg) ||
        formData.details.city_mpg < 0
      ) {
        newErrors.city_mpg = "City MPG must be a valid number";
      }

      if (
        !formData.details.combination_mpg ||
        isNaN(formData.details.combination_mpg) ||
        formData.details.combination_mpg < 0
      ) {
        newErrors.combination_mpg = "Combination MPG must be a valid number";
      }

      if (
        !formData.details.cylinders ||
        isNaN(formData.details.cylinders) ||
        formData.details.cylinders < 0
      ) {
        newErrors.cylinders = "Cylinders must be a valid number";
      }

      if (
        !formData.details.displacement ||
        isNaN(formData.details.displacement) ||
        formData.details.displacement < 0
      ) {
        newErrors.displacement = "Displacement must be a valid number";
      }

      if (!formData.details.drive || formData.details.drive.trim() === "") {
        newErrors.drive = "Drive type is required";
      }

      if (
        !formData.details.highway_mpg ||
        isNaN(formData.details.highway_mpg) ||
        formData.details.highway_mpg < 0
      ) {
        newErrors.highway_mpg = "Highway MPG must be a valid number";
      }

      if (
        !formData.details.transmission ||
        formData.details.transmission.trim() === ""
      ) {
        newErrors.transmission = "Transmission type is required";
      }

      setErrors(newErrors);
      console.log("errors", newErrors);
      const emailId = session?.user.email;

      // If there are no errors, submit the form
      if (Object.keys(newErrors).length === 0) {
        try {
          if (formData.userRef != "") {
            console.log("inside", formData);
            const response = await fetch(
              "http://localhost:4000/api/listing/create",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              }
            );
            if (response.ok) {
              // Car listing added successfully
              toast.success("Car listing added successfully");

              setTimeout(() => {
                router.push("/profile");
              }, 1500);

              console.log("Car listing added successfully");
            } else {
              // Handle error response
              console.error("Error adding car listing:", response.statusText);
            }
          }
        } catch (error) {
          // console.error("Error adding car listing:", error.message);
        }
      }
    } else {
      toast.error("Uploading Image");
    }
  };
  useEffect(() => {
    const getUserId = async () => {
      const currentUser = await fetch(
        `http://localhost:4000/api/user/getUser/${emailId}`
      );

      currentUser.json().then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          userRef: data,
        }));
      });
    };
    getUserId();
  }, [emailId]);

  return (
    <div className="max-w-lg mx-auto my-10 ">
      <h2 className="text-2xl font-semibold my-8">Add Car Listing</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.imageUrls && (
            <p className="text-red-500">{errors.imageUrls}</p>
          )}
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>
        <div>
          <label htmlFor="displacement" className="block mb-1">
            Total Displacement:
          </label>
          <input
            type="number"
            id="displacement"
            name="displacement"
            value={formData.details.displacement}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.details?.displacement && (
            <p className="text-red-500">{errors.details?.displacement}</p>
          )}
        </div>
        <div>
          <label htmlFor="details.city_mpg" className="block mb-1">
            City MPG:
          </label>
          <input
            type="number"
            id="city_mpg"
            name="city_mpg"
            value={formData.details.city_mpg}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.details?.city_mpg && (
            <p className="text-red-500">{errors.details?.city_mpg}</p>
          )}
        </div>
        <div>
          <label htmlFor="details.highway_mpg" className="block mb-1">
            Highway MPG:
          </label>
          <input
            type="number"
            id="highway_mpg"
            name="highway_mpg"
            value={formData.details.highway_mpg}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.details?.highway_mpg && (
            <p className="text-red-500">{errors.details?.highway_mpg}</p>
          )}
        </div>
        <div>
          <label htmlFor="details.fuel_type" className="block mb-1">
            Fuel Type:
          </label>
          <select
            id="fuel_type"
            name="fuel_type"
            value={formData.details.fuel_type}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div>
          <label htmlFor="details.drive" className="block mb-1">
            Drive Type:
          </label>
          <select
            id="drive"
            name="drive"
            value={formData.details.drive}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select Drive Type</option>
            <option value="4WD">4WD</option>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
          </select>
        </div>
        <div>
          <label htmlFor="details.cylinders" className="block mb-1">
            Cylinders:
          </label>
          <input
            type="number"
            id="cylinders"
            name="cylinders"
            value={formData.details.cylinders}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          {errors.details?.cylinders && (
            <p className="text-red-500">{errors.details?.cylinders}</p>
          )}
        </div>
        <div>
          <label htmlFor="details.make" className="block mb-1">
            Make:
          </label>
          <select
            id="make"
            name="make"
            value={formData.details.make}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select Make</option>
            {makers.map((maker) => (
              <option key={maker} value={maker}>
                {maker}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details.model" className="block mb-1">
            Model :
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.details.model}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          />
          {errors.details?.make && (
            <p className="text-red-500">{errors.details?.make}</p>
          )}
        </div>
        <div>
          <label htmlFor="details.transmission" className="block mb-1">
            Transmission:
          </label>
          <select
            id="transmission"
            name="transmission"
            value={formData.details.transmission}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Select Transmission Type</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        <div>
          <label htmlFor="details.year" className="block mb-1">
            Year of Production:
          </label>
          <select
            id="year"
            name="year"
            value={formData.details.year}
            onChange={handleDetailsChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
            required
          >
            <option value="">Production Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-full">
          <ImageUpload onUploadSuccess={handleImageUploadSuccess} />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarlisting;
