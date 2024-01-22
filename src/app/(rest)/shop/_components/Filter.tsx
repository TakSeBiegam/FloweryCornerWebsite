"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Checkbox } from "./Checkbox";
import { AnimatePresence, motion } from "framer-motion";

interface FilterProps {
  header: string;
  options?: string[];
}

export const Filter: React.FC<FilterProps> = ({ header, options }) => {
  const [open, setOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  return (
    <div className="flex flex-col gap-2 overflow-hidden border-b-2 pb-4 ">
      <div className="flex justify-between">
        <span className="font-bold text-lg capitalize">{header}</span>
        {open ? (
          <ChevronUp
            className="cursor-pointer"
            onClick={() => setOpen((p) => !p)}
          />
        ) : (
          <ChevronDown
            className="cursor-pointer"
            onClick={() => setOpen((p) => !p)}
          />
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="flex flex-col gap-4"
          >
            {options ? (
              options.map((option) => (
                <div className="flex justify-between capitalize " key={option}>
                  {option} <Checkbox />
                </div>
              ))
            ) : (
              <div>
                <span className="font-semibold">{`${rangeValue} zł`}</span>
                <input
                  onChange={(e) => setRangeValue(parseInt(e.target.value))}
                  value={rangeValue}
                  id="default-range"
                  type="range"
                  min="0"
                  max="600"
                  className="w-full my-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
