import { MouseEventHandler } from "react";

export interface CarProps {
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrls: string[];
  userRef: string;
  details: {
    city_mpg: number;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
  };
}
export interface UpdateCarProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrls: string[];
  userRef: string;
  details: {
    city_mpg: number;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
  };
}

export interface validationCarProps {
  title: string;
  description: string;
  price: string;
  location: string;
  imageUrls: string[];
  userRef: string;
  details: {
    city_mpg: string;
    combination_mpg: string;
    cylinders: string;
    displacement: string;
    drive: string;
    fuel_type: string;
    highway_mpg: string;
    make: string;
    model: string;
    transmission: string;
    year: string;
  };
}

export interface FilterProps {
  make?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel_type?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchMakerProps {
  make: string;
  setMake: (make: string) => void;
}
export interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  carDetails: CarProps;
}
