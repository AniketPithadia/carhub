import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import {
  CarCard,
  ShowMore,
  SearchBar,
  CustomFilter,
  Hero,
  NavBar,
  Footer,
} from "@/components";
import { auth } from "@/utils/auth";
import { Toaster } from "sonner";

export default async function Home({ searchParams }: HomeProps) {
  const session = await auth();
  console.log("session user ", session);
  const allCars = await fetchCars({
    make: searchParams.make || "",
    year: searchParams.year,
    fuel_type: searchParams.fuel_type || "",
    limit: searchParams.limit || 6,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <>
      <Toaster />
      <NavBar session={session} />
      <main className="overflow-hidden">
        <Hero />

        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
            <p>Explore out cars you might like</p>
          </div>

          <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="fuel_type" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div>

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>

              <ShowMore
                pageNumber={(searchParams.limit || 5) / 10}
                isNext={(searchParams.limit || 5) > allCars.length}
              />
            </section>
          ) : (
            <div className="py-20 home__error-container ">
              <h2 className="text-black text-xl font-bold">
                🥲 Oops, No results. <br />
                Maybe Try Different Year or Model🤔
              </h2>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
