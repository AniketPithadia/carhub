"use client";
import { useRouter } from "next/navigation";
import React from "react";

const EditListing = () => {
  const router = useRouter();
  router.push("/profile");
  return <div>EditListing</div>;
};

export default EditListing;
