"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-xl">AppLogo</div>
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
