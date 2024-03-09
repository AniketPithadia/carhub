"use client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useState, useEffect } from "react";

const DeleteCarListing = ({ session, id }: { session: any; id: string }) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const emailId = session?.user?.email;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = await fetch(
          `http://localhost:4000/api/user/getUser/${emailId}`
        );
        await currentUser.json().then((data) => {
          setUserId(data);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId();
  }, [emailId, userId]);

  const handleDeleteCarListing = async () => {
    if (!userId) {
      console.error("User ID not available.");
      return;
    }

    try {
      const deleteCar = await fetch(
        `http://localhost:4000/api/listing/delete/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (deleteCar.status === 200) {
        toast.success("Car Listing deleted successfully");

        setTimeout(() => {
          router.push("/profile");
        }, 1000);
        console.log("Car Listing deleted successfully");
      } else {
        console.error("Error deleting car listing");
      }
    } catch (error) {
      console.error("Error deleting car listing:", error);
    }
  };

  const handleDelete = () => {
    handleDeleteCarListing();
  };

  const handleCancel = () => {
    router.push("/profile");
  };
  return (
    <div className="pt-20 h-screen flex justify-center items-center">
      <div className="bg-white border  border-5 p-4 rounded shadow-lg text-center">
        <p className="my-4 text-3xl">
          Are you sure you want to delete this listing?
        </p>
        <div className="py-5 space-x-2 text-xl">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCarListing;
