import { Footer, NavBar } from "@/components";
import React from "react";
import { auth } from "@/utils/auth";
import { useSession } from "next-auth/react";
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <>
      <NavBar session={session} />
      {children}
    </>
  );
};

export default Layout;
