"use client";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, amount) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;
    updateQuantity(id, Math.max(1, item.quantity + amount));
  };

  const memoTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-stone-800 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-gray-300 text-lg text-center">
          Your cart is empty.
        </div>
      ) : (
        <>
          <button
            onClick={clearCart}
            className="mb-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition float-right"
          >
            Clear Cart
          </button>
          <ul className="space-y-6 clear-both">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-6 bg-stone-700 rounded-lg p-4 shadow"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-contain w-16 h-16 bg-white rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="bg-stone-600 text-white px-2 py-1 rounded-l hover:bg-stone-500 text-xl"
                    >
                      -
                    </button>
                    <span className="bg-white text-stone-800 px-4 py-1 rounded text-lg min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-stone-600 text-white px-2 py-1 rounded-r hover:bg-stone-500 text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-emerald-300 font-bold text-lg mb-2">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-8 flex justify-between items-center">
        <span className="text-xl text-white font-bold">Total:</span>
        <span className="text-2xl text-emerald-400 font-bold">
          {memoTotal.toFixed(2)} €
        </span>
      </div>
      <button
        className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded transition text-lg"
        disabled={cart.length === 0}
      >
        Checkout
      </button>
      <button
        onClick={clearCart}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded transition text-lg"
        disabled={cart.length === 0}
      >
        Clear Cart
      </button>
    </div>
  );
}
