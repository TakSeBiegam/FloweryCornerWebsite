export interface Order {
  id: number;
  firstName: string;
  lastName: string;
  products: {
    name: string;
    quantity: number;
  }[];
  createdAt: Date;
  totalPrice: number;
  completed?: boolean | null;
}

export const orders: Order[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    products: [
      { name: "Roses Bouquet", quantity: 1 },
      { name: "Lily Arrangement", quantity: 2 },
    ],
    createdAt: new Date("2024-01-29T10:30:00"),
    totalPrice: 75.5,
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    products: [
      { name: "Sunflower Bouquet", quantity: 1 },
      { name: "Tulip Bouquet", quantity: 1 },
      { name: "Daisy Basket", quantity: 3 },
    ],
    createdAt: new Date("2024-01-30T15:45:00"),
    totalPrice: 110.25,
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    products: [
      { name: "Orchid Pot", quantity: 2 },
      { name: "Mixed Spring Flowers", quantity: 1 },
    ],
    createdAt: new Date("2024-02-01T09:15:00"),
    totalPrice: 90.75,
    completed: true,
  },
];
