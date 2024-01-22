"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const RouterBackHandler = () => {
  const { back } = useRouter();
  return (
    <div className="pb-5 cursor-pointer" onClick={back}>
      <ArrowLeft size={36} />
    </div>
  );
};
