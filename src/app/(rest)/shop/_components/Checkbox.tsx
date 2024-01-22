import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, { useState } from "react";

export const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      onClick={() => setChecked((p) => !p)}
      className={cn(
        "h-6 w-6 rounded-md bg-slate-50 cursor-pointer flex items-center justify-center",
        checked && "bg-primary-button"
      )}
    >
      {checked ? <Check size={16} color="white" /> : null}
    </div>
  );
};
