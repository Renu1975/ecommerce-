const API_URLS = [
  "https://dummyjson.com/products/category/mens-shirts",
  "https://dummyjson.com/products/category/womens-dresses",
  "https://dummyjson.com/products/category/tops",
];
const BRANDS = ["Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's"];
const COLORS = [
  ["Black", "White", "Yellow"],
  ["Navy", "Gray", "Red"],
  ["Pink", "Blue", "Cream"],
  ["Green", "Brown", "Black"],
];

const getProductExtras = (index) => ({
  description:
    "A comfortable everyday fashion pick with soft fabric, clean finishing, and a versatile fit for modern wardrobes.",
  rating: Number((4.2 + (index % 7) * 0.1).toFixed(1)),
  stock: index % 6 === 0 ? 0 : 8 + index,
  sizes: ["S", "M", "L", "XL"],
  colors: COLORS[index % COLORS.length],
});

const fallbackProducts = [
  {
    id: "fallback-1",
    name: "Classic Red Pullover Hoodie",
    price: 850,
    category: "Men",
    brand: "Zara",
    img: "https://i.imgur.com/1twoaDy.jpeg",
    images: [
      "https://i.imgur.com/1twoaDy.jpeg",
      "https://i.imgur.com/FDwQgLy.jpeg",
      "https://i.imgur.com/kg1ZhhH.jpeg",
    ],
    ...getProductExtras(1),
  },
  {
    id: "fallback-2",
    name: "Classic Comfort Fit Joggers",
    price: 2125,
    category: "Men",
    brand: "Nike",
    img: "https://i.imgur.com/ZKGofuB.jpeg",
    images: [
      "https://i.imgur.com/ZKGofuB.jpeg",
      "https://i.imgur.com/9LFjwpI.jpeg",
      "https://i.imgur.com/R3iobJA.jpeg",
    ],
    ...getProductExtras(2),
  },
  {
    id: "fallback-3",
    name: "Classic High-Waisted Athletic Shorts",
    price: 3655,
    category: "Women",
    brand: "Puma",
    img: "https://i.imgur.com/eGOUveI.jpeg",
    images: [
      "https://i.imgur.com/eGOUveI.jpeg",
      "https://i.imgur.com/UcsGO7E.jpeg",
      "https://i.imgur.com/NLn4e7S.jpeg",
    ],
    ...getProductExtras(3),
  },
  {
    id: "fallback-4",
    name: "Classic White Crew Neck T-Shirt",
    price: 3315,
    category: "Women",
    brand: "H&M",
    img: "https://i.imgur.com/axsyGpD.jpeg",
    images: [
      "https://i.imgur.com/axsyGpD.jpeg",
      "https://i.imgur.com/yb9UQKL.jpeg",
      "https://i.imgur.com/mCqjBvN.jpeg",
    ],
    ...getProductExtras(4),
  },
  {
    id: "fallback-5",
    name: "Kids Everyday Cotton Outfit",
    price: 1299,
    category: "Kids",
    brand: "StyLoria",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6",
    ],
    ...getProductExtras(5),
  },
  {
    id: "fallback-6",
    name: "Kids Printed Dress Set",
    price: 1599,
    category: "Kids",
    brand: "StyLoria",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
      "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb",
      "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9",
    ],
    ...getProductExtras(6),
  },
];

const kidsProducts = fallbackProducts.filter(
  (product) => product.category === "Kids"
);

const getImages = (product) => {
  const images = Array.isArray(product.images) ? product.images : [];
  const allImages = [product.thumbnail, ...images].filter(Boolean);
  return [...new Set(allImages)];
};

const getImage = (product) => {
  return getImages(product)[0] || "https://i.imgur.com/QkIa5tT.jpeg";
};

const getCategory = (product, index) => {
  const value = `${product.title || ""} ${product.category || ""}`.toLowerCase();

  if (value.includes("women") || value.includes("dress") || value.includes("skirt") || value.includes("high-waisted")) {
    return "Women";
  }

  if (value.includes("baby") || value.includes("kids") || value.includes("child")) {
    return "Kids";
  }

  return index % 5 === 0 ? "Women" : "Men";
};

const mapProduct = (product, index) => {
  const extras = getProductExtras(index);

  return {
  id: `${product.category || "clothing"}-${product.id}`,
    name: product.title,
    price: Math.max(499, Math.round(Number(product.price || 10) * 85)),
    category: getCategory(product, index),
    brand: product.brand || BRANDS[index % BRANDS.length],
    img: getImage(product),
    images: getImages(product),
    ...extras,
    description: product.description || extras.description,
    rating: Number(product.rating || extras.rating),
    stock: Number(product.stock || extras.stock),
  };
};

export const fetchClothingProducts = async () => {
  const responses = await Promise.all(
    API_URLS.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch clothing products");
      }

      return response.json();
    })
  );

  const apiProducts = responses
    .flatMap((data) => data.products || [])
    .map(mapProduct)
    .filter((product) => ["Men", "Women", "Kids"].includes(product.category))
    .slice(0, 48);

  return [...apiProducts, ...kidsProducts];
};

export const getFallbackProducts = () => fallbackProducts;
