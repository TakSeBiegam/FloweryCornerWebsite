import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
interface PaperProps extends PropsWithChildren {
  className?: string;
}
export const Paper: React.FC<PaperProps> = ({ children, className }) => {
  return (
    <div className={cn("p-4 bg-slate-50 rounded-md shadow-md", className)}>
      {children}
    </div>
  );
};
