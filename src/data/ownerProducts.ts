import type { ShopProduct } from './shopData';

// Catalog batch supplied by the shop owner on 2026-11-07.
// Photos are kept exactly as supplied (including alternative views).
// Prices are USD. Availability has not been confirmed.
type OwnerEntry = {
  name: string;
  category: string;
  price: number;
  photos: number;
  description?: string;
  options?: { label: string; price: number }[];
};

const ownerEntries: OwnerEntry[] = [
  {
    name: 'Walker Tape Lace Front Double-Sided Tape',
    category: 'Wig Tapes & Adhesives',
    price: 9.99,
    photos: 8,
    description: 'Double-sided Walker Tape Lace Front adhesive tape for compatible lace wigs, hairpieces and extension applications. Available in 3-yard ($9.99), 12-yard ($15.99) and 36-yard ($45.99) rolls. Check the hair-system base and follow the manufacturer\'s application and removal instructions.',
    options: [
      { label: '3 yards', price: 9.99 },
      { label: '12 yards', price: 15.99 },
      { label: '36 yards', price: 45.99 }
    ]
  },
  {
    name: 'Hair Brazil Double-Sided Extension & Wig Tape',
    category: 'Wig Tapes & Adhesives',
    price: 9.99,
    photos: 6,
    description: 'Hair Brazil branded double-sided adhesive tape for compatible wigs and hair-extension applications. Select a 3-yard ($9.99) or 12-yard ($15.99) roll. Confirm tape compatibility with the base and follow proper removal instructions.',
    options: [
      { label: '3 yards', price: 9.99 },
      { label: '12 yards', price: 15.99 }
    ]
  },
  {
    name: 'CHIC Pink Hair Dryer with Diffuser & Attachments',
    category: 'Styling Tools',
    price: 39.99,
    photos: 3,
    description: 'Pink CHIC electric hair dryer shown with a diffuser and styling attachments. Designed for drying and styling hair with the appropriate nozzle or diffuser. Review the photos for the pictured accessories and confirm voltage requirements before use.'
  },
  {
    name: 'SUNAGE Hot Air Styling Brush',
    category: 'Styling Tools',
    price: 31.99,
    photos: 1,
    description: 'SUNAGE black-and-pink hot-air brush with an oval bristle head. An electric styling tool for brushing, shaping and smoothing hair with heated airflow. Follow the manufacturer\'s directions for heat use and hair suitability.'
  },
  {
    name: 'Hair Extension Fusion Connector Tool',
    category: 'Extension Tools',
    price: 29.99,
    photos: 1,
    description: 'Electric hair-extension connector tool with a black handle, illustrated with its power cord. Intended for use with compatible professional extension techniques. Confirm the tip, method and operating instructions before installation.'
  },
  {
    name: 'Hair Extension Iron',
    category: 'Extension Tools',
    price: 19.99,
    photos: 2,
    description: 'Pink extension-application iron pictured with blue Hair Extension Iron packaging. A salon tool intended for compatible professional hair-extension application methods. Confirm operating conditions and technique before use.'
  },
  {
    name: 'Lace Wig Bond & Toupee Tape Remover',
    category: 'Wig Tapes & Adhesives',
    price: 6.99,
    photos: 1,
    description: 'Liquid remover labeled for lace-wig bonding adhesive and toupee tape. The photographed dropper bottle contains 1 fl oz (30 mL). Use according to the label when removing compatible adhesives; avoid contact with eyes.'
  },
  {
    name: 'FOXYBAE Hair Straightening Flat Iron',
    category: 'Styling Tools',
    price: 59.99,
    photos: 2,
    description: 'FOXYBAE electric flat iron pictured with a black straightening body and its branded packaging. A hair-styling tool for straightening and smoothing strands. Confirm electrical specifications and follow the manufacturer\'s temperature guidance.'
  },
  {
    name: 'Bold Hold Extreme Wig Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 19.99,
    photos: 2,
    description: 'Bold Hold Extreme wig and hair-system adhesive, identified by the white bottle with a green label. Intended for compatible hairpiece attachment; read the label for preparation, application, skin compatibility and removal.'
  },
  {
    name: 'Ghost Bond Wig Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 19.99,
    photos: 2,
    description: 'Ghost Bond adhesive in the white bottle with a blue label. Designed for attaching compatible wigs and hair-replacement systems. Follow the manufacturer\'s directions for application, skin testing and adhesive removal.'
  },
  {
    name: 'Bold Hold Active Wig Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 19.99,
    photos: 1,
    description: 'Bold Hold Active adhesive in its white bottle with a pink label. An adhesive option for compatible wig or hair-system installations. Follow the product label for application, skin compatibility and removal.'
  },
  {
    name: 'Walker Tape Mity-Tite Hair System Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 13.99,
    photos: 2,
    description: 'Walker Tape Mity-Tite hair-system adhesive, shown in a clear bottle with a dark label. Used with compatible hairpieces and systems; follow the manufacturer\'s guidance for attachment and safe removal.'
  },
  {
    name: 'Walker Tape Ultra Hold Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 13.99,
    photos: 1,
    description: 'Walker Tape Ultra Hold liquid hair-system adhesive, shown in a clear bottle with a black cap. Intended for compatible wig and hairpiece attachment; follow the label instructions for use and removal.'
  },
  {
    name: 'Hair Extension Micro Ring Beads — 1,000 Pieces',
    category: 'Extension Tools',
    price: 10.99,
    photos: 10,
    description: 'Set of 1,000 micro-ring beads for compatible strand-by-strand hair-extension attachment. The photographs show rings in several shades. Confirm the ring diameter, selected shade and tool compatibility before installing.'
  },
  {
    name: 'Hair Highlighting & Balayage Boards — Set of 3',
    category: 'Salon Accessories',
    price: 8.99,
    photos: 5,
    description: 'Three-piece set of highlighting or balayage boards for supporting hair sections during coloring and foiling work. The photos show different shapes and colors, including boards with comb-like edges. Confirm the exact set contents before purchase.'
  },
  {
    name: 'INGRID Pink Hair Coloring Brush',
    category: 'Salon Accessories',
    price: 5.99,
    photos: 4,
    description: 'Pink INGRID tint brush with a transparent glitter-finish handle and bright pink bristles. Designed for applying hair color or compatible salon products to controlled sections and roots.'
  },
  {
    name: 'Beige Wig Cap — 2 Pieces',
    category: 'Wig Caps & Accessories',
    price: 3.99,
    photos: 2,
    description: 'Beige wig caps supplied as a two-piece pack, as indicated on the photographed packaging. Used for gathering hair beneath a compatible wig or hairpiece. Check size and fit before purchase.'
  },
  {
    name: 'White Mesh Wig Cap',
    category: 'Wig Caps & Accessories',
    price: 13.99,
    photos: 2,
    description: 'White mesh-style wig cap and strap-style component shown in the product photographs. Used as an accessory for compatible wigs and hairpieces; verify the exact contents and sizing before ordering.'
  },
  {
    name: 'Wig Grip Band with Mesh Cap',
    category: 'Wig Caps & Accessories',
    price: 3.99,
    photos: 2,
    description: 'Wig-grip band and mesh-cap accessories pictured in pink and beige. Intended for preparing and positioning compatible wigs; check the photographs to confirm the included components and fit.'
  },
  {
    name: 'Metal Hair Sectioning Clips',
    category: 'Salon Accessories',
    price: 5.99,
    photos: 1,
    description: 'Metal hair-sectioning clips for holding and separating strands during coloring, styling, blow-drying and extension installation. Reusable salon accessories; verify the quantity in the photographed set.'
  }
];

export const OWNER_PRODUCTS: ShopProduct[] = ownerEntries.map((item, index) => {
  const productNumber = String(index + 1).padStart(2, '0');
  const images = Array.from(
    { length: item.photos },
    (_, imageIndex) => '/assets/owner-products/product-' + productNumber + '-' + String(imageIndex + 1).padStart(2, '0') + '.jpg'
  );
  return {
    id: 'owner-' + productNumber,
    name: item.name,
    category: item.category,
    price: item.price,
    priceFrom: Boolean(item.options?.length),
    description: item.description || '',
    image: images[0],
    images,
    options: item.options,
    variants: item.options?.map((option) => option.label) ?? [],
    currency: 'USD',
    available: false
  };
});
