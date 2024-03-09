"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteListing = () => {
  const router = useRouter();
  router.push("/profile");
  return <div>DeleteListing</div>;
};

export default DeleteListing;
