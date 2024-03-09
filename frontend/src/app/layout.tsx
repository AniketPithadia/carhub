import "./globals.css";

import { Footer, NavBar } from "@/components";
import { Toaster, toast } from "sonner";
export const metadata = {
  title: "Car Hub",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <>
          {children}
          <Toaster richColors expand={true} />
          <Footer />
        </>
      </body>
    </html>
  );
}
