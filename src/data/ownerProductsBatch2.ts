import type { ShopProduct } from './shopData';

type Entry = { name: string; category: string; price: number; photos: number; description: string };
const entries: Entry[] = [
  {
    "name": "Salon Sectioning Clips – Professional Set",
    "category": "Salon Accessories",
    "price": 6.99,
    "photos": 2,
    "description": "Professional salon clips for separating hair during coloring, blow-drying and hair-extension work. Review the photos to confirm the clip style and number of pieces."
  },
  {
    "name": "Supertape Double-Sided Hair Extension Tape Tabs",
    "category": "Wig Tapes & Adhesives",
    "price": 9.99,
    "photos": 1,
    "description": "Supertape by True Tape, supplied as double-sided adhesive tabs for suitable hair extensions and hairpieces. Apply and remove according to the manufacturer's directions."
  },
  {
    "name": "Professional Hair Coloring Brush",
    "category": "Salon Accessories",
    "price": 4.99,
    "photos": 5,
    "description": "Application brush for placing hair color or compatible salon treatments on roots and individual sections with control."
  },
  {
    "name": "Silicone Micro Rings for Hair Extensions",
    "category": "Extension Tools",
    "price": 3.99,
    "photos": 3,
    "description": "Silicone-lined micro rings for compatible hair-extension techniques. Confirm ring size and color before choosing a fitting tool."
  },
  {
    "name": "Hair Extension Protective Pads",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 2,
    "description": "Protective pads for isolating surrounding strands during compatible extension-application techniques. Check the photos for shape and quantity."
  },
  {
    "name": "U-Shape Snap Clips – 5 Pieces",
    "category": "Salon Accessories",
    "price": 2.99,
    "photos": 5,
    "description": "Set of five U-shaped snap clips for holding hair sections or securing compatible extension pieces. Check the size and attachment method."
  },
  {
    "name": "Hair Extension Heat Shield Guards",
    "category": "Extension Tools",
    "price": 3.99,
    "photos": 6,
    "description": "Heat-shield guards for isolating surrounding hair during compatible heat-assisted hair-extension work. Use with appropriate tools and training."
  },
  {
    "name": "Dreadlock Beads – Silver and Gold",
    "category": "Salon Accessories",
    "price": 6.99,
    "photos": 2,
    "description": "Silver- and gold-tone decorative beads for dreadlocks, braids and compatible hairstyles. Confirm the bead diameter and quantity before purchasing."
  },
  {
    "name": "Adjustable Wig Grip Band",
    "category": "Wig Caps & Accessories",
    "price": 12.99,
    "photos": 1,
    "description": "Adjustable black wig-grip band for wearing beneath a compatible wig. Confirm fit and closure details in the original photo."
  },
  {
    "name": "Bio Ionic GoldPro Curling Iron – 1 Inch",
    "category": "Styling Tools",
    "price": 120,
    "photos": 1,
    "description": "Bio Ionic GoldPro curling iron with a one-inch barrel, pictured in the original retail box. For creating curls and waves; follow the manufacturer's heat guidance."
  },
  {
    "name": "Italian Keratin Glue – 50 g",
    "category": "Extension Tools",
    "price": 12.99,
    "photos": 3,
    "description": "50 grams of Italian keratin glue for compatible professional keratin-bond hair-extension techniques. Use with the appropriate tools and application method."
  },
  {
    "name": "Elastic Thread for Brazilian Knots",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 3,
    "description": "Elastic thread for Brazilian-knot hair-extension installation, priced individually. Intended to wrap and secure compatible extension attachment points."
  },
  {
    "name": "Keratin Bond Cutting Tool for Hair Extensions",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 2,
    "description": "Tool for separating or trimming compatible keratin bonds during extension maintenance. Handle carefully to protect natural hair."
  },
  {
    "name": "Hair Extension Tool Kit with 100 Micro Rings",
    "category": "Extension Tools",
    "price": 12.99,
    "photos": 3,
    "description": "Kit containing extension pliers, a pulling hook, a bead-placement tool and 100 silicone-lined 5 mm micro rings, as listed."
  },
  {
    "name": "Stainless Steel Tape-In Hair Extension Sealing Pliers",
    "category": "Extension Tools",
    "price": 19.99,
    "photos": 1,
    "description": "Flat-surface stainless-steel pliers used to press compatible tape-in hair-extension attachments. Intended for professional installation or maintenance."
  },
  {
    "name": "Needle and Thread for Hair Extensions",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 3,
    "description": "Needle and thread used for sewn hair-extension wefts and compatible sewing methods. Check needle design and thread color in the product photo."
  },
  {
    "name": "Double-Sided Tape Tabs for Hair Extensions – 60 Pieces",
    "category": "Wig Tapes & Adhesives",
    "price": 6.99,
    "photos": 2,
    "description": "Pack of 60 blue replacement double-sided adhesive tabs for compatible tape-in extensions. Each tab is listed at 4 cm × 0.8 cm."
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
