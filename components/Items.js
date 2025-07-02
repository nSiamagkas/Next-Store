"use client";
import React from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

function Items({ items, loading, error }) {
  if (loading)
    return (
      <div className="flex justify-center mt-24">
        <CircularProgress />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-24">{error}</div>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-25 justify-center">
      {items.map((item) => (
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
  );
}

export default Items;
