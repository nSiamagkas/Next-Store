"use client";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { usePathname } from "next/navigation";

function GlassmorphNavbar() {
  const { cart } = useCart();
  const uniqueCount = cart?.length || 0;
  const pathname = usePathname();

  const shouldShowSearch = pathname === "/";

  const { search, setSearch } = useSearch();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="fixed top-0 flex w-full bg-stone-800/80 backdrop-blur-md p-2 sm:p-3 md:p-4 justify-between items-center font-serif z-50 shadow-lg glassmorph-navbar">
      <Link href="/" className="flex items-center">
        <HomeIcon
          fontSize="large"
          className="text-white hover:text-emerald-400 transition text-2xl sm:text-3xl md:text-4xl"
        />
      </Link>
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-lg select-none text-center">
          The Next Store
        </h1>
        {shouldShowSearch && (
          <input
            type="text"
            placeholder="Search"
            className="w-32 sm:w-48 md:w-64 lg:w-80 bg-stone-700/80 backdrop-blur-md p-1 sm:p-2 rounded-lg text-white text-xs sm:text-sm md:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </div>
      <div className="flex items-center">
        <Link href="/cart" className="flex items-center relative">
          <ShoppingCartIcon
            fontSize="large"
            className="text-white hover:text-emerald-400 transition text-2xl sm:text-3xl md:text-4xl"
          />
          {uniqueCount > 0 && (
            <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-emerald-500 text-white text-xs font-bold rounded-full px-1 sm:px-2 py-0.5 shadow">
              {uniqueCount}
            </span>
          )}
        </Link>
        <button
          onClick={toggleTheme}
          className="ml-2 sm:ml-3 md:ml-4 text-white hover:bg-stone-600 transition text-lg sm:text-xl md:text-2xl"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default GlassmorphNavbar;
