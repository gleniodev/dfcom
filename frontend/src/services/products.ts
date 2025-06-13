import { api } from "@/lib/api";
import { Product } from "@/types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  data: Omit<Product, "_id" | "createdAt">
): Promise<Product> => {
  const response = await api.post("/products", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
