import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import CustomButton from "./CustomButton";

import { handleGoogleLogin, handleLogout } from "@/utils/action";
import { signIn } from "next-auth/react";
import { auth } from "@/utils/auth";
const NavBar = async ({ session }: { session: any }) => {
  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        {session?.user ? (
          <form action={handleLogout}>
            <CustomButton
              title="Sign Out"
              btnType="submit"
              containerStyles="text-primary-blue border border-1 border-solid rounded-full bg-white border-primary-blue min-w-[130px]"
            />
          </form>
        ) : (
          <form action={handleGoogleLogin}>
            <CustomButton
              title="Sign In With Google"
              btnType="submit"
              containerStyles="text-primary-blue border border-1 border-solid rounded-full bg-white border-primary-blue min-w-[130px]"
            />
          </form>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
