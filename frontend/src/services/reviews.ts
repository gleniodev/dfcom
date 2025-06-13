import { api } from "@/lib/api";
import { Review } from "@/types";

// Listar reviews de um produto
export async function getReviews(productId: string): Promise<Review[]> {
  const response = await api.get(`/products/${productId}/reviews`);
  return response.data;
}

// Obter média das avaliações
export async function getReviewAverage(productId: string): Promise<number> {
  const response = await api.get(`/products/${productId}/reviews/average`);
  return response.data.averageRating;
}

// Criar nova review
export async function createReview(
  productId: string,
  data: Omit<Review, "_id" | "createdAt" | "productId">
) {
  await api.post(`/products/${productId}/reviews`, data);
}

// Atualizar review existente → agora com productId na URL
export async function updateReview(
  productId: string,
  reviewId: string,
  data: Omit<Review, "_id" | "createdAt" | "productId">
) {
  await api.put(`/products/${productId}/reviews/${reviewId}`, data);
}

// Deletar review → agora com productId na URL
export async function deleteReview(productId: string, reviewId: string) {
  await api.delete(`/products/${productId}/reviews/${reviewId}`);
}
