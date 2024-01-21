import { Footer, Navbar } from "@/components/molecules";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-primary-bg flex flex-col ">
      <Navbar />
      <main className="container mx-auto grow px-4">{children}</main>
      <Footer />
    </div>
  );
}
