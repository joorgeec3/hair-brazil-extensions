import type { ShopProduct } from './shopData';

// Catalog photos provided on 2026-11-07. Names are provisional.
// Prices and availability are intentionally left unset until confirmed.
type Entry = { name: string; category: string; description: string; photos: number };
const entries: Entry[] = [
  {
    "name": "Stainless Steel Salon Pliers",
    "category": "Extension Tools",
    "description": "Silver salon pliers shown in the original product photographs. Model specifications to confirm. Compare the tool's jaw profile against the photos to confirm its intended use.",
    "photos": 2
  },
  {
    "name": "Mundial Professional 777 Cuticle Nipper",
    "category": "Salon Accessories",
    "description": "Mundial Professional cuticle nipper in its original purple retail packaging. For trained nail-care use; sanitize and handle according to the manufacturer's instructions.",
    "photos": 1
  },
  {
    "name": "Wide-Tooth Detangling Comb – Assorted Colors",
    "category": "Salon Accessories",
    "description": "Wide-tooth styling comb pictured in teal, pink, purple and black. Color options to confirm. Check the available colors before ordering.",
    "photos": 4
  },
  {
    "name": "Ceramic Round Styling Brush – Size 53",
    "category": "Styling Tools",
    "description": "Round ceramic and ionic styling brush, with the number 53 printed on its base. Use alongside a blow dryer to create movement or a smooth finish; confirm barrel dimensions.",
    "photos": 1
  },
  {
    "name": "Precision Parting Comb – Black",
    "category": "Salon Accessories",
    "description": "Black fine-tip sectioning comb, shown in single and group views. The pointed tail helps make neat, accurate parts for styling or extension placement.",
    "photos": 2
  },
  {
    "name": "Precision Parting Comb – Pink",
    "category": "Salon Accessories",
    "description": "Pink precision parting and sectioning comb. Suitable for creating clean partings during hair preparation.",
    "photos": 1
  },
  {
    "name": "Black Hair Extension Pliers",
    "category": "Extension Tools",
    "description": "Professional black pliers for salon and hair extension work, shown in the supplied photos. Confirm tip compatibility with the extension installation method.",
    "photos": 2
  },
  {
    "name": "Blonde Hair Topper with Base",
    "category": "Hair Toppers & Systems",
    "description": "Blonde hair topper with a visible attachment base. Dimensions and attachment type to confirm. Confirm attachment type, base measurements and fiber details before purchase.",
    "photos": 2
  },
  {
    "name": "Brown Hair Topper",
    "category": "Hair Toppers & Systems",
    "description": "Brown hair topper as shown in the product photograph. Specifications to confirm. Color, base size and attachment method should be checked before ordering.",
    "photos": 1
  },
  {
    "name": "Brown & Blonde Hair Extension Bundles",
    "category": "Hair Extensions",
    "description": "Hair extension pieces in assorted brown and blonde tones. Length and texture to confirm. Compare the pictured shades; exact length, weight and method require confirmation.",
    "photos": 3
  },
  {
    "name": "Pre-Bonded Dark Hair Extensions",
    "category": "Hair Extensions",
    "description": "Dark hair extension strands with pre-attached tips, as pictured. Length and quantity to confirm. Check length, strand count and tip compatibility prior to installation.",
    "photos": 2
  },
  {
    "name": "Hair Styling Sectioning Tools",
    "category": "Salon Accessories",
    "description": "Set of hair parting and sectioning accessories shown in the product image. Please verify which accessories are included in the set.",
    "photos": 1
  },
  {
    "name": "Silver Extension Pliers",
    "category": "Extension Tools",
    "description": "Metal pliers for salon work and hair extension application. Model specifications to confirm. Check the jaw shape and intended application technique.",
    "photos": 1
  },
  {
    "name": "Red-Handle Hair Extension Pliers",
    "category": "Extension Tools",
    "description": "Hair extension application pliers with red handles, shown from two angles. Review the photographed tips against your extension method.",
    "photos": 2
  },
  {
    "name": "Black Curly Hair Topper",
    "category": "Hair Toppers & Systems",
    "description": "Curly dark hairpiece photographed from multiple angles. Dimensions to confirm. Confirm the hairpiece base size, curl details and attachment type.",
    "photos": 3
  },
  {
    "name": "Brown Hair Replacement Topper",
    "category": "Hair Toppers & Systems",
    "description": "Brown hair topper with an integrated base, shown from multiple angles. Suitable for discussing a custom hairpiece fit; dimensions require confirmation.",
    "photos": 2
  },
  {
    "name": "Black Hair System with Lace Base",
    "category": "Hair Toppers & Systems",
    "description": "Dark hair replacement piece with lace-style base and several detail photographs. The lace-style base is visible in detailed photographs; measurements are not confirmed.",
    "photos": 7
  },
  {
    "name": "Blonde Hair Extension Piece",
    "category": "Hair Extensions",
    "description": "Blonde hair extension piece shown in the supplied product photograph. Check blonde shade, length and attachment method before choosing this piece.",
    "photos": 1
  },
  {
    "name": "Round Styling Brushes – Assorted Sizes",
    "category": "Styling Tools",
    "description": "Round hair styling brushes shown in multiple barrel sizes. Individual sizes to confirm. Multiple brush barrel sizes are pictured; exact sizes are to be confirmed.",
    "photos": 2
  },
  {
    "name": "Long Straight Dark Hair Extensions",
    "category": "Hair Extensions",
    "description": "Long straight dark hair extension strands. Length and attachment method to confirm. Length, fiber type and installation system require confirmation.",
    "photos": 2
  },
  {
    "name": "Rechargeable Handheld Mini Fan – Assorted Colors",
    "category": "Salon Accessories",
    "description": "Compact handheld fan with charging cable, pictured in several color combinations. Supplied with a charging cable in the photos; color and electrical specifications are pending.",
    "photos": 2
  },
  {
    "name": "Professional Salon Hair Scissors",
    "category": "Salon Accessories",
    "description": "Salon scissors shown in original retail packaging. Please verify blade size and model details from the original packaging.",
    "photos": 1
  },
  {
    "name": "Electric Hair Extension Fusion Tool",
    "category": "Extension Tools",
    "description": "Electric tool pictured for professional hair extension application. Model details to confirm. For compatible hair-extension methods; operating settings have not been confirmed.",
    "photos": 1
  },
  {
    "name": "Hair Topper for Scalp Coverage",
    "category": "Hair Toppers & Systems",
    "description": "Hair replacement topper shown on a scalp and as an individual hairpiece. Confirm base dimensions, color and attachment style for the intended coverage area.",
    "photos": 2
  },
  {
    "name": "Hair Weft Extensions – Application Example",
    "category": "Hair Extensions",
    "description": "Hair weft extension shown during installation. Full product details to confirm. Image illustrates a weft application; exact available hair specifications are pending.",
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
