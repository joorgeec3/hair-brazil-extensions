import type { ShopProduct } from './shopData';

type Entry = { name: string; category: string; price: number; photos: number; description: string };
const entries: Entry[] = [
  {
    "name": "Salon Sectioning Clips – Professional Set",
    "category": "Salon Accessories",
    "price": 6.99,
    "photos": 2,
    "description": "Salon hair clips for holding and sectioning hair while styling."
  },
  {
    "name": "Supertape Double-Sided Hair Extension Tape Tabs",
    "category": "Wig Tapes & Adhesives",
    "price": 9.99,
    "photos": 1,
    "description": "Supertape by True Tape, shown in the original packaging."
  },
  {
    "name": "Professional Hair Coloring Brush",
    "category": "Salon Accessories",
    "price": 4.99,
    "photos": 5,
    "description": "Black coloring and tint application brush."
  },
  {
    "name": "Silicone Micro Rings for Hair Extensions",
    "category": "Extension Tools",
    "price": 3.99,
    "photos": 3,
    "description": "Small clear rings for hair extension application."
  },
  {
    "name": "Hair Extension Protective Pads",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 2,
    "description": "Protective pads for hair extension installation, as pictured."
  },
  {
    "name": "U-Shape Snap Clips – 5 Pieces",
    "category": "Salon Accessories",
    "price": 2.99,
    "photos": 5,
    "description": "Set of five U-shape snap clips for hair styling and extensions."
  },
  {
    "name": "Hair Extension Heat Shield Guards",
    "category": "Extension Tools",
    "price": 3.99,
    "photos": 6,
    "description": "Protective heat shield guards for hair extension application."
  },
  {
    "name": "Dreadlock Beads – Silver and Gold",
    "category": "Salon Accessories",
    "price": 6.99,
    "photos": 2,
    "description": "Decorative dreadlock beads in metallic finishes."
  },
  {
    "name": "Adjustable Wig Grip Band",
    "category": "Wig Caps & Accessories",
    "price": 12.99,
    "photos": 1,
    "description": "Adjustable black wig grip band as pictured."
  },
  {
    "name": "Bio Ionic GoldPro Curling Iron – 1 Inch",
    "category": "Styling Tools",
    "price": 120,
    "photos": 1,
    "description": "Bio Ionic GoldPro 1-inch curling iron in its original box."
  },
  {
    "name": "Italian Keratin Glue – 50 g",
    "category": "Extension Tools",
    "price": 12.99,
    "photos": 3,
    "description": "Italian keratin glue for professional hair extensions, 50 grams."
  },
  {
    "name": "Elastic Thread for Brazilian Knots",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 3,
    "description": "Elastic thread used for Brazilian knot hair extension techniques."
  },
  {
    "name": "Keratin Bond Cutting Tool for Hair Extensions",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 2,
    "description": "Professional tool for cutting keratin hair-extension bonds."
  },
  {
    "name": "Hair Extension Tool Kit with 100 Micro Rings",
    "category": "Extension Tools",
    "price": 12.99,
    "photos": 3,
    "description": "Includes pliers, pulling hook, bead tool and 100 silicone-lined 5 mm micro rings."
  },
  {
    "name": "Stainless Steel Tape-In Hair Extension Sealing Pliers",
    "category": "Extension Tools",
    "price": 19.99,
    "photos": 1,
    "description": "Flat-surface stainless steel pliers for sealing tape-in extensions."
  },
  {
    "name": "Needle and Thread for Hair Extensions",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 3,
    "description": "Needle and thread set for hair-extension application."
  },
  {
    "name": "Double-Sided Tape Tabs for Hair Extensions – 60 Pieces",
    "category": "Wig Tapes & Adhesives",
    "price": 6.99,
    "photos": 2,
    "description": "Replacement blue tape tabs for extensions. 60 pieces; 4 cm × 0.8 cm."
  }
];

// Second collection supplied by the shop owner on 2026-11-07.
// Original images are preserved; stock and payment availability are pending confirmation.
export const OWNER_PRODUCTS_BATCH_2: ShopProduct[] = entries.map((item, index) => {
  const number = String(index + 1).padStart(2, '0');
  const images = Array.from({ length: item.photos }, (_, photo) =>
    '/assets/owner-products-batch-2/product-' + number + '-' + String(photo + 1).padStart(2, '0') + '.jpg'
  );
  return {
    id: 'owner-b2-' + number,
    name: item.name,
    category: item.category,
    price: item.price,
    priceFrom: false,
    description: item.description,
    image: images[0],
    images,
    variants: [],
    currency: 'USD',
    available: false
  };
});
