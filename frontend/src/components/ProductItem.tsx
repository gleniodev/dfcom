"use client";

import { Product } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductItemProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductItem({ product, onDelete }: ProductItemProps) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.description}</p>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <p>Categoria: {product.category}</p>

      <div className="flex gap-2 mt-4">
        <Link href={`/products/${product._id}`}>
          <Button variant="default">Detalhes</Button>
        </Link>
        <Button variant="outline" onClick={() => onDelete(product._id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
}
