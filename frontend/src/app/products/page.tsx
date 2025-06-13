"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { getProducts, deleteProduct } from "@/services/products";
import ProductList from "@/components/ProductList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente excluir este produto?")) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col justfy-center p-8">
      <div className="flex justify-between p-8">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex justify-end items-center mb-6 gap-4">
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/products/new">
            <Button>Novo Produto</Button>
          </Link>
        </div>
      </div>

      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
}
