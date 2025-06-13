"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link"; 

const productSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  price: z.coerce.number().positive("O preço deve ser positivo"),
  category: z.string().min(1, "A categoria é obrigatória"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
}

export default function ProductForm({
  initialData,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {initialData ? "Editar Produto" : "Novo Produto"}
      </h2>

      <div className="space-y-2">
        <label className="block font-medium">Nome</label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Descrição</label>
        <Textarea {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Preço</label>
        <Input type="number" step="0.01" {...register("price")} />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Categoria</label>
        <Input {...register("category")} />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <Button type="submit">Salvar</Button>
        <Link href="/products">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </Link>
      </div>
    </form>
  );
}
