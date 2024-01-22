import { MainLayout } from "@/layouts/MainLayout";
import { RouterBackHandler } from "./RouterBackHandler";

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <RouterBackHandler />
      {children}
    </MainLayout>
  );
}
