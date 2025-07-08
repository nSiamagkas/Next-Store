"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearch } from "@/context/SearchContext";

function Items({ items, loading, error }) {
  const { search } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  // Dynamically extract unique categories from items
  const categories = Array.from(new Set(items.map((item) => item.category)));

  // Filter items based on search query and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered items by price
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-24">{error}</div>;

  return (
    <div className="mt-25">
      <div className="flex flex-col items-center">
        <select
          className="bg-stone-700 text-white p-2 rounded-lg mt-11 mb-3 hover:bg-stone-600 transition"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-emerald-600 transition"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
        {sortedItems.map((item) => (
          <li key={item.id} className="flex justify-center">
            <div className="w-full flex justify-center">
              <Link
                href={`/products/${item.id}`}
                className="flex flex-col justify-between items-center bg-stone-700 p-6 rounded-lg shadow-lg w-full max-w-sm h-80 cursor-pointer hover:scale-102 transition"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-2">
                  <Image
                    width={128}
                    height={128}
                    src={item.image}
                    alt={item.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <h1 className="text-lg font-semibold mb-2 text-white">
                    {item.price}
                    <span className="ml-1">&#8364;</span>
                  </h1>
                  <p
                    className="text-center text-sm text-gray-200 mt-4 line-clamp-2 overflow-hidden text-ellipsis"
                    title={item.title}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
