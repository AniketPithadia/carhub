"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import magnifyingGlass from "@/public/magnifying-glass.svg";
import SearchMaker from "./SearchMaker";
import modelIcon from "@/public/model-icon.png";
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={magnifyingGlass}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (make.trim() === "" && model.trim() === "") {
      return alert("Please provide a car maker or model");
    }

    updateSearchParams(model, make);
  };

  const updateSearchParams = (model: string, maker: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'maker' search parameter based on the 'maker' value
    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("maker");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchMaker make={make} setMake={setMake} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src={modelIcon}
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
