export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}
