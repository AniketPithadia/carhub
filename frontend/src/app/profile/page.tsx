import React from "react";
import { auth } from "@/utils/auth";
import { CarProps, UpdateCarProps } from "@/types";
import Link from "next/link";
import { CarCard } from "@/components";
import { revalidatePath } from "next/cache";

const UserProfile = async () => {
  const session = await auth();
  revalidatePath("/profile");

  let userId;
  let allCarsByUser: UpdateCarProps[] = [];

  const emailId = session?.user?.email;
  if (session) {
    const currentUser = await fetch(
      `http://localhost:4000/api/user/getUser/${emailId}`
    );

    await currentUser
      .json()
      .then((data) => {
        userId = data;
      })
      .catch((error) => {
        console.log("error ", error);
      });
  }
  console.log("after fetch userId ", userId);
  const getCars = await fetch(
    `http://localhost:4000/api/user/listings/${userId}`
  );

  await getCars.json().then((cars) => {
    revalidatePath("/profile");

    allCarsByUser = cars;
  });
  console.log("allCarsByUser ", allCarsByUser);
  const isDataEmpty =
    !Array.isArray(allCarsByUser) || allCarsByUser.length < 1 || !allCarsByUser;

  return (
    <div>
      <div className="flex justify-center mt-18 py-12">
        <div className="text-center pt-8">
          <div className="text-center my-4">
            <h1 className="text-5xl font-extrabold mb-2">Your Profile</h1>
            <p>Manage your account and listings</p>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <Link href="/profile/AddNewListing">
              <p className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                Add New Listing
              </p>
            </Link>

            <div className="mt-8">
              <h2 className="text-2xl font-mono font-bold">Listings</h2>
              <hr className="border-b border-6 mt-2 border-gray-300" />
            </div>
            {isDataEmpty ? (
              <div className="py-20 home__error-container ">
                <h2 className="flex justify-center text-black text-center text-3xl font-bold">
                  No cars listed yet🥲
                </h2>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3 p-4 max-w-[1100px]">
                {allCarsByUser?.map((car: UpdateCarProps, key) => (
                  <div
                    className="border border-1 rounded-lg shadow-md p-4 m-1 min-w-[300px]"
                    key={key}
                  >
                    <div>
                      <CarCard key={key} car={car} />
                      <div className="flex items-center justify-center gap-4 mt-4 px-4">
                        <Link
                          href={`/profile/EditListing/${car._id}`}
                          className="w-full"
                        >
                          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>
                        </Link>
                        <Link
                          href={`/profile/DeleteListing/${car._id}`}
                          className="w-full"
                        >
                          <button className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
