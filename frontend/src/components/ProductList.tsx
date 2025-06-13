"use client";

import { Product } from "@/types";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
}
