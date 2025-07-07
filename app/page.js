"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Items from "@/components/Items";
import { useItems } from "@/context/ItemsContext";

export default function Home() {
  const { items, setItems } = useItems();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://fakestoreapi.com/products/");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (data) setItems(data);
  }, [data, setItems]);

  return <Items items={items} loading={isLoading} error={error?.message} />;
}
