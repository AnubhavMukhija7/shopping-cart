export interface CartItem {
  kind: string;
  id: number;
  description: string;
  title: string;
  availability: boolean;
  imageLink: string;
  brand: string | null;
  availablePieces: number;
  condition: string;
  color: string[];
  price: Price;
  gender: string;
  sizes: string[];
  sizeSelected: string;
  quantitySelected: number;
  colorSelected: string;
  subTotalPrice?: number;
}

export type CartItems = CartItem[];

interface Price {
  value: number;
  currency: string;
}
