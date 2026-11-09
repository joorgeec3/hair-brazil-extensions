import type { ShopProduct } from './shopData';

type Entry = { name: string; category: string; price: number; photos: number; description: string };
const entries: Entry[] = [
  {
    "name": "Salon Sectioning Clips – Professional Set",
    "category": "Salon Accessories",
    "price": 6.99,
    "photos": 2,
    "description": "Salon hair clips for holding and sectioning hair while styling. Keep sections separated while coloring, blow-drying or fitting extensions."310
  },
  {
    "name": "Supertape Double-Sided Hair Extension Tape Tabs",
    "category": "Wig Tapes & Adhesives",
    "price": 9.99,
    "photos": 1,
    "description": "Supertape by True Tape, shown in the original packaging. Use according to the packaging instructions on compatible hair-extension surfaces."544
  },
  {
    "name": "Professional Hair Coloring Brush",
    "category": "Salon Accessories",
    "price": 4.99,
    "photos": 5,
    "description": "Black coloring and tint application brush. A useful accessory for applying color or treatment products to selected strands."752
  },
  {
    "name": "Silicone Micro Rings for Hair Extensions",
    "category": "Extension Tools",
    "price": 3.99,
    "photos": 3,
    "description": "Small clear rings for hair extension application. Confirm ring diameter and the suitable installation method before purchase."952
  },
  {
    "name": "Hair Extension Protective Pads",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 2,
    "description": "Protective pads for hair extension installation, as pictured. Designed to isolate hair around an application point during compatible extension work."1149
  },
  {
    "name": "U-Shape Snap Clips – 5 Pieces",
    "category": "Salon Accessories",
    "price": 2.99,
    "photos": 5,
    "description": "Set of five U-shape snap clips for hair styling and extensions. Five clips can help secure sections or suitable extension pieces."1359
  },
  {
    "name": "Hair Extension Heat Shield Guards",
    "category": "Extension Tools",
    "price": 3.99,
    "photos": 6,
    "description": "Protective heat shield guards for hair extension application. Used to help separate adjacent strands during compatible heat-based extension applications."1573
  },
  {
    "name": "Dreadlock Beads – Silver and Gold",
    "category": "Salon Accessories",
    "price": 6.99,
    "photos": 2,
    "description": "Decorative dreadlock beads in metallic finishes. Check bead diameter and quantity when planning a braid or dreadlock style."1787
  },
  {
    "name": "Adjustable Wig Grip Band",
    "category": "Wig Caps & Accessories",
    "price": 12.99,
    "photos": 1,
    "description": "Adjustable black wig grip band as pictured. Adjust the band to fit beneath a compatible wig."1985
  },
  {
    "name": "Bio Ionic GoldPro Curling Iron – 1 Inch",
    "category": "Styling Tools",
    "price": 120,
    "photos": 1,
    "description": "Bio Ionic GoldPro 1-inch curling iron in its original box. Features a one-inch barrel for curls and waves; follow the manufacturer's heat guidance."2182
  },
  {
    "name": "Italian Keratin Glue – 50 g",
    "category": "Extension Tools",
    "price": 12.99,
    "photos": 3,
    "description": "Italian keratin glue for professional hair extensions, 50 grams. Supplied as 50 grams for compatible professional keratin methods."2386
  },
  {
    "name": "Elastic Thread for Brazilian Knots",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 3,
    "description": "Elastic thread used for Brazilian knot hair extension techniques. Used for tying compatible Brazilian knot extensions; the price is per item."2602
  },
  {
    "name": "Keratin Bond Cutting Tool for Hair Extensions",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 2,
    "description": "Professional tool for cutting keratin hair-extension bonds. Use carefully during professional maintenance to avoid damaging natural hair."2830
  },
  {
    "name": "Hair Extension Tool Kit with 100 Micro Rings",
    "category": "Extension Tools",
    "price": 12.99,
    "photos": 3,
    "description": "Includes pliers, pulling hook, bead tool and 100 silicone-lined 5 mm micro rings. Includes the listed hook, pliers, bead tool and 100 silicone-lined 5 mm rings."3052
  },
  {
    "name": "Stainless Steel Tape-In Hair Extension Sealing Pliers",
    "category": "Extension Tools",
    "price": 19.99,
    "photos": 1,
    "description": "Flat-surface stainless steel pliers for sealing tape-in extensions. Flat contact surfaces are designed for pressing compatible tape-in attachments."3305
  },
  {
    "name": "Needle and Thread for Hair Extensions",
    "category": "Extension Tools",
    "price": 4.99,
    "photos": 3,
    "description": "Needle and thread set for hair-extension application. Useful for sewn-weft techniques with a compatible needle and thread."3527
  },
  {
    "name": "Double-Sided Tape Tabs for Hair Extensions – 60 Pieces",
    "category": "Wig Tapes & Adhesives",
    "price": 6.99,
    "photos": 2,
    "description": "Replacement blue tape tabs for extensions. 60 pieces; 4 cm × 0.8 cm. Contains 60 blue adhesive tabs measuring 4 cm × 0.8 cm."3758
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
