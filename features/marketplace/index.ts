import {ImageSourcePropType} from "react-native";

export interface ProductCardInterface {
  id: string;
  name: string;
  price: number;
  rating: number;
  images: ImageSourcePropType[];
  reviews?: number;
  stock?: number;
  sizes?: string[];
  description?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  seller?: {
    name: string;
    rating: number;
    sales: string;
  };
}

export const MOCK_ITEMS: ProductCardInterface[] = [
  {
    id: "1",
    name: "iPhone 13 Pro Max",
    price: 329,
    rating: 4.5,
    reviews: 124,
    stock: 1,
    images: [
      require("@/assets/images/marketplace/sales.png"),
      require("@/assets/images/marketplace/phone.png"),
      require("@/assets/images/marketplace/sales.png"),
      require("@/assets/images/marketplace/gadget.png"),
    ],
    sizes: ["128GB", "256GB", "512GB"],
    category: "phones",
    createdAt: "2025-01-04",
    updatedAt: "2025-02-10",
    description:
      "The iPhone 13 Pro Max features a stunning display, A15 Bionic chip, and long-lasting battery. Experience unmatched performance and camera quality.",
    seller: {
      name: "John's Store",
      rating: 4.8,
      sales: "1.2k",

    },
  },
  {
    id: "2",
    name: "Samsung Galaxy S21",
    price: 299,
    rating: 4.2,
    reviews: 96,
    stock: 5,
    category: "phones",
    createdAt: "2025-02-04",
    updatedAt: "2025-04-10",
    images: [
      require("@/assets/images/marketplace/phone.png"),
      require("@/assets/images/marketplace/sales.png"),
      require("@/assets/images/marketplace/gadget.png"),
    ],
    sizes: ["128GB", "256GB"],
    description:
      "Samsung Galaxy S21 delivers smooth performance, dynamic AMOLED display, and powerful camera capabilities for all-day use.",
    seller: {
      name: "Tech World",
      rating: 4.7,
      sales: "980",
    },
  },
  {
    id: "3",
    name: "Wireless Bluetooth Headphones",
    price: 59,
    rating: 4.6,
    reviews: 312,
    category: "phones",
    createdAt: "2025-04-04",
    updatedAt: "2025-04-10",
    stock: 8,
    images: [
      require("@/assets/images/marketplace/gadget.png"),
      require("@/assets/images/marketplace/sales.png"),
    ],
    description:
      "Enjoy immersive sound quality and deep bass with these wireless Bluetooth headphones featuring noise cancellation and 30-hour battery life.",
    seller: {
      name: "AudioHub",
      rating: 4.5,
      sales: "2.3k",
    },
  },
  {
    id: "4",
    name: "Men's Casual Sneakers",
    price: 79,
    rating: 4.4,
    reviews: 67,
    stock: 3,
    category: "phones",
    createdAt: "2025-08-04",
    updatedAt: "2025-09-10",
    images: [
      require("@/assets/images/marketplace/sales.png"),
      require("@/assets/images/marketplace/gadget.png"),
    ],
    sizes: ["40", "41", "42", "43", "44"],
    description:
      "Comfortable and stylish men's sneakers made from breathable materials. Perfect for daily wear and light outdoor activities.",
    seller: {
      name: "UrbanWear",
      rating: 4.3,
      sales: "620",
    },
  },
  {
    id: "5",
    name: "Smart Home Speaker",
    price: 99,
    rating: 4.7,
    reviews: 210,
    stock: 0,
    category: "phones",
    createdAt: "2025-01-04",
    updatedAt: "2025-02-10",
    images: [
      require("@/assets/images/marketplace/gadget.png"),
      require("@/assets/images/marketplace/sales.png"),
    ],
    description:
      "Smart home speaker with integrated voice assistant. Stream music, control devices, and manage your day hands-free.",
    seller: {
      name: "HomeTech",
      rating: 4.9,
      sales: "3.1k",
    },
  },
  {
    id: "6",
    name: "Organic Green Tea (100g)",
    price: 15,
    rating: 4.8,
    reviews: 188,
    category: "phones",
    createdAt: "2025-10-04",
    updatedAt: "2025-09-10",
    stock: 12,
    images: [
      require("@/assets/images/marketplace/sales.png"),
      require("@/assets/images/marketplace/gadget.png"),
    ],
    description:
      "Premium organic green tea leaves for a refreshing and healthy beverage experience. Rich in antioxidants and natural flavor.",
    seller: {
      name: "Nature’s Basket",
      rating: 4.6,
      sales: "540",
    },
  },
];

export interface CategoryInterface {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
}
export const ALL_CATEGORIES: CategoryInterface[] = [
  { id: "phones", name: "Phones", icon: "📱", color: "#FF6B6B", itemCount: 45 },
  { id: "accessories", name: "Accessories", icon: "🎧", color: "#4ECDC4", itemCount: 128 },
  { id: "groceries", name: "Groceries", icon: "🛒", color: "#95E1D3", itemCount: 234 },
  { id: "fashion", name: "Fashion", icon: "👔", color: "#F38181", itemCount: 89 },
  { id: "electronics", name: "Electronics", icon: "💻", color: "#AA96DA", itemCount: 67 },
  { id: "books", name: "Books", icon: "📚", color: "#FCBAD3", itemCount: 156 },
  { id: "sports", name: "Sports", icon: "⚽", color: "#FFD93D", itemCount: 42 },
  { id: "home & garden", name: "Home & Garden", icon: "🏡", color: "#6BCB77", itemCount: 91 },
  { id: "beauty", name: "Beauty", icon: "💄", color: "#FE6B8B", itemCount: 73 },
  { id: "toys", name: "Toys", icon: "🧸", color: "#A8E6CF", itemCount: 54 },
];
