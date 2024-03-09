"use client";
import React, { ChangeEvent, useState } from "react";
import { storage } from "@/firebase";

import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  getDownloadURL,
} from "firebase/storage";
import { error } from "console";
import { toast } from "sonner";
interface ImageUploadProps {
  onUploadSuccess: (imageUrl: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
  const [image, setImage] = useState<File | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            setPercentage(progress);
          }
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading image", error);
        },
        () => {
          getDownloadURL(storageRef).then((url) => {
            onUploadSuccess(url);
            toast.success("Image uploaded successfully");
          });
        }
      );
    }
  };
  return (
    <div>
      <label htmlFor="image" className="block mb-1">
        Upload Image:
      </label>
      <input
        type="file"
        id="image"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
      />
      {image && (
        <div className="mt-2">
          <p className="text-sm">{image.name}</p>
        </div>
      )}
      <button
        onClick={handleUpload}
        className={
          percentage !== 100
            ? "mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            : "mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        }
      >
        {percentage !== 100 ? "Upload" : "Uploaded"}
      </button>
    </div>
  );
};
export default ImageUpload;
