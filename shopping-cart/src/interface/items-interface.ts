export interface Item {
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
}

export type Items = Item[];

interface Price {
  value: number;
  currency: string;
}
