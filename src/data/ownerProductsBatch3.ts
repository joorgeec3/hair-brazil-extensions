import type { ShopProduct } from './shopData';

// Catalog photos provided on 2026-11-07. Names are provisional.
// Prices and availability are intentionally left unset until confirmed.
type Entry = { name: string; category: string; description: string; photos: number };
const entries: Entry[] = [
  {
    "name": "Stainless Steel Salon Pliers",
    "category": "Extension Tools",
    "description": "Stainless-steel salon pliers pictured from two angles. Exact jaw specifications and compatible extension systems have not yet been confirmed.",
    "photos": 2
  },
  {
    "name": "Mundial Professional 777 Cuticle Nipper",
    "category": "Salon Accessories",
    "description": "Mundial Professional 777 cuticle nipper in the original purple packaging. For trained nail-care use with proper cleaning and handling.",
    "photos": 1
  },
  {
    "name": "Wide-Tooth Detangling Comb – Assorted Colors",
    "category": "Salon Accessories",
    "description": "Wide-tooth detangling comb shown in assorted colors. Designed to separate strands; confirm the color available before purchase.",
    "photos": 4
  },
  {
    "name": "Ceramic Round Styling Brush – Size 53",
    "category": "Styling Tools",
    "description": "Ceramic round brush with the number 53 on its base. Used to guide hair during blow-drying; confirm the barrel diameter if a specific size is needed.",
    "photos": 1
  },
  {
    "name": "Precision Parting Comb – Black",
    "category": "Salon Accessories",
    "description": "Black precision parting comb with a fine-tooth edge and pointed tail. Useful for sectioning hair during styling, braiding and extension preparation.",
    "photos": 2
  },
  {
    "name": "Precision Parting Comb – Pink",
    "category": "Salon Accessories",
    "description": "Pink precision-tail comb for creating neat parts and separating smaller hair sections during styling.",
    "photos": 1
  },
  {
    "name": "Black Hair Extension Pliers",
    "category": "Extension Tools",
    "description": "Black-handled salon pliers pictured for hair-extension work. Check the jaw profile and compatible attachment system before purchasing.",
    "photos": 2
  },
  {
    "name": "Blonde Hair Topper with Base",
    "category": "Hair Toppers & Systems",
    "description": "Blonde topper hairpiece with a visible base. Confirm fiber type, shade, base size and attachment method before ordering.",
    "photos": 2
  },
  {
    "name": "Brown Hair Topper",
    "category": "Hair Toppers & Systems",
    "description": "Brown hair topper pictured for color comparison. Base dimensions, fiber composition and attachment details are not yet confirmed.",
    "photos": 1
  },
  {
    "name": "Brown & Blonde Hair Extension Bundles",
    "category": "Hair Extensions",
    "description": "Hair-extension bundles in brown and blonde shades. Confirm the exact tone, length, weight, texture and installation system before ordering.",
    "photos": 3
  },
  {
    "name": "Pre-Bonded Dark Hair Extensions",
    "category": "Hair Extensions",
    "description": "Dark pre-bonded hair-extension strands with visible attachment tips. Confirm strand count, length, hair type and tip compatibility before installation.",
    "photos": 2
  },
  {
    "name": "Hair Styling Sectioning Tools",
    "category": "Salon Accessories",
    "description": "Hair sectioning accessories grouped in the original photograph. Verify the included pieces and quantities before purchase.",
    "photos": 1
  },
  {
    "name": "Silver Extension Pliers",
    "category": "Extension Tools",
    "description": "Silver-colored salon pliers for compatible hair-extension work. Check jaw shape and fitting method before ordering.",
    "photos": 1
  },
  {
    "name": "Red-Handle Hair Extension Pliers",
    "category": "Extension Tools",
    "description": "Red-handled pliers pictured for hair-extension installation or maintenance. Confirm the tip style and compatible system.",
    "photos": 2
  },
  {
    "name": "Black Curly Hair Topper",
    "category": "Hair Toppers & Systems",
    "description": "Dark curly topper with a visible base, photographed from multiple angles. Base size, fiber and attachment type require confirmation.",
    "photos": 3
  },
  {
    "name": "Brown Hair Replacement Topper",
    "category": "Hair Toppers & Systems",
    "description": "Brown hairpiece or topper with a visible base. Please confirm the available color, dimensions, fiber and fitting method.",
    "photos": 2
  },
  {
    "name": "Black Hair System with Lace Base",
    "category": "Hair Toppers & Systems",
    "description": "Dark hair system featuring a lace-style base, shown in detail. Confirm base dimensions, hair composition and attachment options.",
    "photos": 7
  },
  {
    "name": "Blonde Hair Extension Piece",
    "category": "Hair Extensions",
    "description": "Blonde hair-extension piece pictured separately. Confirm shade, length, weight, fiber and attachment technique before buying.",
    "photos": 1
  },
  {
    "name": "Round Styling Brushes – Assorted Sizes",
    "category": "Styling Tools",
    "description": "Round styling brushes shown with multiple barrel sizes. Used for blow-drying and shaping hair; check which sizes are available.",
    "photos": 2
  },
  {
    "name": "Long Straight Dark Hair Extensions",
    "category": "Hair Extensions",
    "description": "Long, straight dark hair-extension strands. Confirm hair type, length, weight, color and installation method.",
    "photos": 2
  },
  {
    "name": "Rechargeable Handheld Mini Fan – Assorted Colors",
    "category": "Salon Accessories",
    "description": "Compact rechargeable handheld mini fan shown with a charging cable. Available colors and electrical specifications are pending confirmation.",
    "photos": 2
  },
  {
    "name": "Professional Salon Hair Scissors",
    "category": "Salon Accessories",
    "description": "Professional hair-cutting scissors shown in their packaging. Confirm blade dimensions and model before ordering.",
    "photos": 1
  },
  {
    "name": "Electric Hair Extension Fusion Tool",
    "category": "Extension Tools",
    "description": "Electric hair-extension fusion tool pictured for heat-assisted applications. Confirm model, safe operating instructions and compatible technique.",
    "photos": 1
  },
  {
    "name": "Hair Topper for Scalp Coverage",
    "category": "Hair Toppers & Systems",
    "description": "Hair topper photographed separately and in a scalp-coverage example. Confirm base size, fiber type, color and attachment method.",
    "photos": 2
  },
  {
    "name": "Hair Weft Extensions – Application Example",
    "category": "Hair Extensions",
    "description": "Hair weft photographed during installation. Confirm available color, length, weight and compatible installation technique.",
    "photos": 1
  }
];

export const OWNER_PRODUCTS_BATCH_3: ShopProduct[] = entries.map((item, index) => {
  const number = String(index + 1).padStart(2, '0');
  const images = Array.from({ length: item.photos }, (_, photoIndex) =>
    '/assets/owner-products-batch-3/product-' + number + '-' + String(photoIndex + 1).padStart(2, '0') + '.jpg'
  );
  return {
    id: 'batch3-' + number,
    name: item.name,
    description: item.description,
    category: item.category,
    currency: 'USD',
    image: images[0],
    images,
    available: false,
    variants: []
  };
});
