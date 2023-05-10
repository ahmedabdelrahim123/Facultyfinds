export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  details: string;
  college: string;
}
export interface ProductsData {
  products: Product[];
}
