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
    description: 'Double-sided tape for hair extensions and wig holding. Options include 3, 12 and 36 yards; follow the tape manufacturer\'s application and removal instructions.',
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
    description: 'Double-sided tape for hair extensions and wig holding. Choose a 3- or 12-yard length. Confirm compatibility with the wig base or extension method.',
    options: [
      { label: '3 yards', price: 9.99 },
      { label: '12 yards', price: 15.99 }
    ]
  },
  {
    name: 'Professional Hair Dryer with Diffuser & Attachments',
    category: 'Styling Tools',
    price: 39.99,
    photos: 3,
    description: 'Pink hair dryer shown with diffuser and styling attachments. Use the photographed diffuser and attachments to adapt the styling technique to the desired finish.'
  },
  {
    name: 'SUNAGE Hot Air Styling Brush',
    category: 'Styling Tools',
    price: 31.99,
    photos: 1,
    description: 'Black and pink electric hot-air styling brush. The brush head combines combing and heated airflow for everyday blowout styling.'
  },
  {
    name: 'Hair Extension Fusion Connector Tool',
    category: 'Extension Tools',
    price: 29.99,
    photos: 1,
    description: 'Electric tool for hair extension application. Check the connector and heating specifications against the extension technique before use.'
  },
  {
    name: 'Hair Extension Iron',
    category: 'Extension Tools',
    price: 19.99,
    photos: 2,
    description: 'Professional hair extension tool pictured in its blue packaging. Suitable only for compatible extension methods; review the tool and packaging photographs.'
  },
  {
    name: 'Lace Wig Bond & Toupee Tape Remover',
    category: 'Wig Tapes & Adhesives',
    price: 6.99,
    photos: 1,
    description: 'Remover labeled for lace wig bond and toupee tape, 1 fl oz (30 ml). The label indicates a 1 fl oz (30 ml) bottle; carefully follow the product\'s removal directions.'
  },
  {
    name: 'Professional Hair Extension Heating Tool',
    category: 'Extension Tools',
    price: 59.99,
    photos: 2,
    description: 'Black electric hair extension tool. Confirm the model and compatible extension method before ordering or operating the tool.'
  },
  {
    name: 'Bold Hold Wig Adhesive – Green Label',
    category: 'Wig Tapes & Adhesives',
    price: 19.99,
    photos: 2,
    description: 'Wig adhesive shown in white bottle with green label. Follow the adhesive label and perform any recommended skin compatibility check.'
  },
  {
    name: 'Ghost Bond Wig Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 19.99,
    photos: 2,
    description: 'Ghost Bond hair system adhesive shown in white bottle. Follow the manufacturer\'s instructions for preparation, wear time and removal.'
  },
  {
    name: 'Bold Hold Active Wig Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 19.99,
    photos: 1,
    description: 'Bold Hold Active adhesive shown in a white bottle with pink label. Review the label carefully before applying adhesive to a wig or hair-system base.'
  },
  {
    name: 'Walker Tape Mighty-Tite Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 13.99,
    photos: 2,
    description: 'Walker Tape Mighty-Tite hair system adhesive. Check the intended base material and application directions before use.'
  },
  {
    name: 'Walker Tape Ultra Hold Adhesive',
    category: 'Wig Tapes & Adhesives',
    price: 13.99,
    photos: 1,
    description: 'Walker Tape Ultra Hold hair system adhesive. A wig attachment product to use only according to the original manufacturer\'s instructions.'
  },
  {
    name: 'Hair Extension Micro Ring Beads — 1,000 Pieces',
    category: 'Extension Tools',
    price: 10.99,
    photos: 10,
    description: 'Container of micro ring beads for hair extension application. Pack of 1,000. Pack of 1,000; check bead sizing and tool compatibility before installation.'
  },
  {
    name: 'Purple Hair Sectioning Clips — Set of 3',
    category: 'Salon Accessories',
    price: 8.99,
    photos: 5,
    description: 'Set of three purple hair sectioning clips. Useful for separating hair during blowouts, coloring and extension services.'
  },
  {
    name: 'Pink Hair Coloring Brush',
    category: 'Salon Accessories',
    price: 5.99,
    photos: 4,
    description: 'Pink salon coloring brush with decorative handle. Designed for controlled product placement on small or larger sections of hair.'
  },
  {
    name: 'Beige Wig Cap',
    category: 'Wig Caps & Accessories',
    price: 3.99,
    photos: 2,
    description: 'Beige wig cap as shown in its original packaging. An accessory for preparing hair under a wig; verify the cap size before purchase.'
  },
  {
    name: 'White Mesh Wig Cap',
    category: 'Wig Caps & Accessories',
    price: 13.99,
    photos: 2,
    description: 'White mesh-style wig cap shown in product photos. Check the mesh construction and fit in the product photos.'
  },
  {
    name: 'Wig Grip Band with Mesh Cap',
    category: 'Wig Caps & Accessories',
    price: 3.99,
    photos: 2,
    description: 'Wig grip band and mesh cap, shown in pink and beige. Review the photographs to confirm the band and cap pieces included.'
  },
  {
    name: 'Metal Hair Sectioning Clips',
    category: 'Salon Accessories',
    price: 5.99,
    photos: 1,
    description: 'Metal hair sectioning clips shown together. Designed to hold individual hair sections securely during salon styling.'
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
