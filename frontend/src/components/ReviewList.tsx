"use client";

import { Review } from "@/types";
import { Button } from "@/components/ui/button";

interface ReviewListProps {
  reviews: Review[];
  onDelete: (id: string) => void;
  onEdit: (review: Review) => void;
}

export default function ReviewList({
  reviews,
  onDelete,
  onEdit,
}: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="border p-3 rounded space-y-2">
          <p>
            <strong>Autor:</strong> {review.author}
          </p>
          <p>
            <strong>Nota:</strong> {review.rating}
          </p>
          <p>{review.comment}</p>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => onEdit(review)}>
              Editar
            </Button>
            <Button variant="destructive" onClick={() => onDelete(review._id)}>
              Excluir
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
