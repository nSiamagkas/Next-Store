"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useItems } from "@/context/ItemsContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { items } = useItems();
  const { addToCart } = useCart();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const found = items.find((item) => String(item.id) === id);
    if (found) {
      setProduct(found);
      setLoading(false);
    } else {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id, items]);

  useEffect(() => {
    let timer;
    if (showAdded && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    if (showAdded && countdown === 0) {
      router.push("/cart");
    }
    return () => clearTimeout(timer);
  }, [showAdded, countdown, router]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAdded(true);
    setCountdown(5);
  };

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-lg">Loading...</span>
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        Product not found or not loaded.
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row items-center bg-stone-700 rounded-xl shadow-2xl max-w-full mx-auto mt-16 p-8 gap-8">
      {showAdded && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-2xl">
            <span className="text-2xl font-bold text-emerald-600 mb-2">
              Added to cart!
            </span>
            <span className="text-lg mb-4 text-stone-700">
              Redirecting to cart in{" "}
              <span className="font-mono ">{countdown}</span>...
            </span>
            <div className="flex gap-4">
              <button
                className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800"
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </button>
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                onClick={() => router.push("/cart")}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center bg-white rounded-lg p-4 shadow-md">
        <Image
          src={product.image}
          alt={product.title}
          width={256}
          height={256}
          className="w-64 h-64 object-contain"
        />
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        <h1 className="text-3xl font-bold mb-4 text-white">{product.title}</h1>
        <h2 className="text-2xl font-bold mb-4 text-emerald-300">
          {product.price}
          <span className="ml-1 text-base text-gray-300">&#8364;</span>
        </h2>
        <p className="text-gray-200 mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="bg-stone-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            Category:{" "}
            <span className="font-semibold text-white">{product.category}</span>
          </span>
          <span className="bg-stone-700 text-gray-300 px-3 py-1 rounded-full text-sm">
            Rating:{" "}
            <span className="font-semibold text-white">
              {product.rating?.rate}
            </span>{" "}
            ({product.rating?.count} reviews)
          </span>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleDecrease}
            className="bg-stone-600 text-white px-3 py-1 rounded-l hover:bg-stone-500 text-xl"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="bg-white text-stone-800 px-4 py-1 rounded text-lg min-w-[2.5rem] text-center">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="bg-stone-600 text-white px-3 py-1 rounded-r hover:bg-stone-500 text-xl"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button
            onClick={handleAddToCart}
            className="ml-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
