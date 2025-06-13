'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { createProduct } from '@/services/products';
import { Product } from '@/types';

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: Omit<Product, '_id' | 'createdAt'>) => {
    try {
      await createProduct(data);
      router.push('/products');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
