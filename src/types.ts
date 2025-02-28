export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}