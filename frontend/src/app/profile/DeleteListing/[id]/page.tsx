import DeleteCarListing from "@/components/DeleteUserCarListing";

import { auth } from "@/utils/auth";
import React from "react";

const EditUserCarListing = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  return (
    <div className="pt-12">
      <DeleteCarListing session={session} id={params.id} />
    </div>
  );
};

export default EditUserCarListing;
