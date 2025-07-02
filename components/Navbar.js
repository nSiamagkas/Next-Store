"use client";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";

function GlassmorphNavbar() {
  const { cart } = useCart();
  const uniqueCount = cart.length;

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="fixed top-0 flex w-full bg-stone-800/80 backdrop-blur-md p-4 justify-between items-center font-serif z-50 shadow-lg glassmorph-navbar">
      <Link href="/" className="flex items-center">
        <HomeIcon
          fontSize="large"
          className="text-white hover:text-emerald-400 transition"
        />
      </Link>
      <h1 className="text-4xl text-white drop-shadow-lg select-none">
        The Next Store
      </h1>
      <div className="flex items-center">
        <Link href="/cart" className="flex items-center relative">
          <ShoppingCartIcon
            fontSize="large"
            className="text-white hover:text-emerald-400 transition"
          />
          {uniqueCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
              {uniqueCount}
            </span>
          )}
        </Link>
        <button
          onClick={toggleTheme}
          className="ml-4 text-white hover:bg-stone-600 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default GlassmorphNavbar;
