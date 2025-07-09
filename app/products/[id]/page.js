"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useItems } from "@/context/ItemsContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { items } = useItems();
  const { addToCart } = useCart();

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
      (async () => {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          setProduct(null);
        } finally {
          setLoading(false);
        }
      })();
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
    <div className="flex flex-col lg:flex-row items-center bg-stone-700 rounded-xl shadow-2xl max-w-full mx-auto mt-16 p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8">
      {showAdded && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 flex flex-col items-center shadow-2xl max-w-sm w-full">
            <span className="text-xl md:text-2xl font-bold text-emerald-600 mb-2 text-center">
              Added to cart!
            </span>
            <span className="text-base md:text-lg mb-4 text-stone-700 text-center">
              Redirecting to cart in{" "}
              <span className="font-mono">{countdown}</span>...
            </span>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 w-full">
              <button
                className="bg-stone-700 text-white px-3 md:px-4 py-2 rounded hover:bg-stone-800 text-sm md:text-base"
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </button>
              <button
                className="bg-emerald-500 text-white px-3 md:px-4 py-2 rounded hover:bg-emerald-600 text-sm md:text-base"
                onClick={() => router.push("/cart")}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center bg-white rounded-lg p-2 md:p-4 shadow-md w-full lg:w-auto">
        <Image
          src={product.image}
          alt={product.title}
          width={256}
          height={256}
          className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
        />
      </div>
      <div className="flex flex-col justify-between h-full w-full">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white text-center lg:text-left">
          {product.title}
        </h1>
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-emerald-300 text-center lg:text-left">
          {product.price}
          <span className="ml-1 text-sm md:text-base text-gray-300">
            &#8364;
          </span>
        </h2>
        <p className="text-gray-200 mb-3 md:mb-4 text-sm md:text-base text-center lg:text-left">
          {product.description}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 mb-3 md:mb-4 justify-center lg:justify-start">
          <span className="bg-stone-700 text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm text-center">
            Category:{" "}
            <span className="font-semibold text-white">{product.category}</span>
          </span>
          <span className="bg-stone-700 text-gray-300 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm text-center">
            Rating:{" "}
            <span className="font-semibold text-white">
              {product.rating?.rate}
            </span>{" "}
            ({product.rating?.count} reviews)
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-4 md:mt-6">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={handleDecrease}
              className="bg-stone-600 text-white px-2 md:px-3 py-1 rounded-l hover:bg-stone-500 text-lg md:text-xl"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="bg-white text-stone-800 px-3 md:px-4 py-1 rounded text-base md:text-lg min-w-[2rem] md:min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="bg-stone-600 text-white px-2 md:px-3 py-1 rounded-r hover:bg-stone-500 text-lg md:text-xl"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 md:px-6 py-2 rounded transition text-sm md:text-base"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
