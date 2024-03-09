import React from "react";
import AddCarlisting from "@/components/AddCarListing";
import { auth } from "@/utils/auth";
const AddNewListing = async () => {
  const session = await auth();
  console.log("inside AddnewListing", session);
  return (
    <>
      <main className="pt-20">
        <AddCarlisting session={session} />
      </main>
    </>
  );
};

export default AddNewListing;
