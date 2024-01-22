import { Instagram, Facebook, Twitter, Copyright } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="container mx-auto p-16">
      <div className="flex flex-col justify-center p-2 gap-1 text-sm">
        <span className="text-3xl font-semibold">Kwiecisty Zakątek</span>
        <div className="flex gap-2">
          <Instagram />
          <Facebook />
          <Twitter />
        </div>
        <div className="justify-between flex">
          <div>
            <span>Contact us:</span>
            <span className="font-semibold"> ak84682@student.uwb.edu.pl</span>
          </div>
          <div className="flex gap-1">
            <Copyright className="size-5" /> Arkadiusz Oskar Kuryło, 2024
          </div>
        </div>
      </div>
    </footer>
  );
};
