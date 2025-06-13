"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types";

const reviewSchema = z.object({
  author: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(1),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  initialData?: Pick<Review, "author" | "rating" | "comment">;
  onSubmit: (data: ReviewFormData) => void;
  onCancel?: () => void;
}


export default function ReviewForm({
  initialData,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: initialData || {
      author: "",
      rating: 1,
      comment: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <label>Autor</label>
        <Input {...register("author")} />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label>Nota (1 a 5)</label>
        <Input type="number" min="1" max="5" {...register("rating")} />
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label>Comentário</label>
        <Textarea {...register("comment")} />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          {initialData ? "Atualizar Avaliação" : "Enviar Avaliação"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
