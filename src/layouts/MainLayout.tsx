import { Footer, Navbar } from "@/components/molecules";
import { PropsWithChildren } from "react";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="container mx-auto grow px-4">{children}</main>
      <Footer />
    </div>
  );
};
