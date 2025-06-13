"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct, updateProduct } from "@/services/products";
import {
  getReviews,
  getReviewAverage,
  createReview,
  deleteReview,
  updateReview,
} from "@/services/reviews";
import { Product, Review } from "@/types";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isEditReviewModalOpen, setIsEditReviewModalOpen] = useState(false);

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);

        const reviewsData = await getReviews(productId);
        setReviews(reviewsData);

        const average = await getReviewAverage(productId);
        setAverageRating(average);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [productId]);

  const refreshReviews = async () => {
    if (!productId) return;

    const updatedReviews = await getReviews(productId);
    setReviews(updatedReviews);

    const updatedAverage = await getReviewAverage(productId);
    setAverageRating(updatedAverage);
  };

  const refreshProduct = async () => {
    if (!productId) return;

    const updatedProduct = await getProduct(productId);
    setProduct(updatedProduct);
  };

  const handleCreateReview = async (
    data: Omit<Review, "_id" | "createdAt" | "productId">
  ) => {
    try {
      await createReview(productId, data);
      await refreshReviews();
    } catch (error) {
      console.error("Erro ao criar avaliação:", error);
    }
  };

  const handleUpdateReview = async (
    data: Omit<Review, "_id" | "createdAt" | "productId">
  ) => {
    if (!editingReview || !productId) return;

    try {
      await updateReview(productId, editingReview._id, data);
      await refreshReviews();
      setEditingReview(null);
      setIsEditReviewModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!productId) return;

    if (confirm("Deseja realmente excluir esta avaliação?")) {
      try {
        await deleteReview(productId, reviewId);
        await refreshReviews();
      } catch (error) {
        console.error("Erro ao excluir avaliação:", error);
      }
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsEditReviewModalOpen(true);
  };

  const handleCancelEditReview = () => {
    setEditingReview(null);
    setIsEditReviewModalOpen(false);
  };

  const handleUpdateProduct = async (
    data: Omit<Product, "_id" | "createdAt">
  ) => {
    if (!productId) return;

    try {
      await updateProduct(productId, data);
      await refreshProduct();
      setIsEditProductModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const handleCancelEditProduct = () => {
    setIsEditProductModalOpen(false);
  };

  if (!product) {
    return <p className="p-8">Carregando produto...</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <Link href="/products">
        <Button variant="default" className="mb-8">
          ← Voltar
        </Button>
      </Link>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-3xl">{product.name}</CardTitle>
          <Button onClick={() => setIsEditProductModalOpen(true)}>
            Editar Produto
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700">{product.description}</p>
          <p>
            <strong>Preço:</strong> R$ {product.price.toFixed(2)}
          </p>
          <p>
            <strong>Categoria:</strong> {product.category}
          </p>
          <p>
            <strong>Média das Avaliações:</strong> {averageRating.toFixed(1)}
          </p>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Avaliações</h2>
        <ReviewList
          reviews={reviews}
          onDelete={handleDeleteReview}
          onEdit={handleEditReview}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Nova Avaliação</h2>
        <ReviewForm onSubmit={handleCreateReview} />
      </div>

      {/* Modal de Edição de Review */}
      <Dialog
        open={isEditReviewModalOpen}
        onOpenChange={setIsEditReviewModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Avaliação</DialogTitle>
            <DialogDescription>
              Atualize os dados da avaliação selecionada.
            </DialogDescription>
          </DialogHeader>
          {editingReview && (
            <ReviewForm
              initialData={{
                author: editingReview.author,
                rating: editingReview.rating,
                comment: editingReview.comment,
              }}
              onSubmit={handleUpdateReview}
              onCancel={handleCancelEditReview}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Produto */}
      <Dialog
        open={isEditProductModalOpen}
        onOpenChange={setIsEditProductModalOpen}
      >
        <DialogContent>
          <DialogHeader></DialogHeader>
          <DialogTitle></DialogTitle>
          {product && (
            <ProductForm
              initialData={{
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
              }}
              onSubmit={handleUpdateProduct}
              onCancel={handleCancelEditProduct}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
