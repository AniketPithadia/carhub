import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import CustomButton from "./CustomButton";

import { handleGoogleLogin, handleLogout } from "@/utils/action";

const NavBar = async ({ session }: { session: any }) => {
  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-start sm:items-centersm:px-16 px-6 py-4 bg-transparent">
        <Link
          href="/"
          className="flex justify-center items-center pt-3 sm:pt-0"
        >
          <Image
            src={logo}
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        {session?.user ? (
          <div className="flex flex-col sm:flex-row justify-center items-end sm:items-center gap-2 ">
            <Link
              href="/profile"
              className="flex items-center gap-2 p-1 px-2 border border-1 border-solid border-primary-blue rounded-full"
            >
              <Image
                src={session?.user?.image}
                alt="profile"
                width={40}
                height={40}
                className="object-contain rounded-full"
              />
              <p className="">{session?.user?.name}</p>
            </Link>

            <form action={handleLogout}>
              <CustomButton
                title="Sign Out"
                btnType="submit"
                containerStyles="text-primary-blue border border-1 border-solid rounded-full bg-white border-primary-blue min-w-[130px]"
              />
            </form>
          </div>
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
