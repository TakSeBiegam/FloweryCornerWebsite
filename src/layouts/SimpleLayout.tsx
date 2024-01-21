import { PropsWithChildren } from "react";

export const SimpleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <main className="container mx-auto grow px-4">{children}</main>
    </div>
  );
};
