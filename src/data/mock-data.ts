import type {
  CustomerRecord,
  FoodCategory,
  MenuItem,
  Order,
  Review,
} from "@/lib/types";

export const CATEGORIES: { id: FoodCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "chicken-biryani", label: "Chicken Biryani" },
  { id: "mutton-biryani", label: "Mutton Biryani" },
  { id: "veg-biryani", label: "Veg Biryani" },
  { id: "starters", label: "Starters" },
  { id: "kebabs", label: "Kebabs" },
  { id: "combos", label: "Combos" },
  { id: "beverages", label: "Beverages" },
];

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${Math.round((w * 4) / 5)}&fit=crop&auto=format&q=70`;

const FULL = { id: "full", label: "Full (Serves 2)", priceDelta: 0 } as const;
const HALF = { id: "half", label: "Half (Serves 1)", priceDelta: -120 } as const;
const REGULAR = { id: "regular", label: "Regular", priceDelta: 0 } as const;
const LARGE = { id: "large", label: "Large", priceDelta: 160 } as const;

const biryaniSpice = ["Mild", "Medium", "Spicy"];

export const MENU_ITEMS: MenuItem[] = [
  // Chicken Biryani
  {
    id: "hyd-chicken-dum",
    name: "Hyderabadi Chicken Dum Biryani",
    description:
      "Tender chicken marinated overnight, layered with fragrant basmati rice and sealed with dough to slow-cook on dum. Finished with saffron, fried onions and mint.",
    price: 349,
    category: "chicken-biryani",
    image: img("1589302168068-964664d93dc0"),
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    portions: [HALF, FULL],
    spiceLevels: biryaniSpice,
  },
  {
    id: "andhra-chicken",
    name: "Andhra Spicy Chicken Biryani",
    description:
      "Fiery Andhra-style biryani with a bold ghee roast masala, curry leaves and hand-pounded red chilli. For those who like their dum with a kick.",
    price: 369,
    category: "chicken-biryani",
    image: img("1631515243349-e0cb75fb8d3a"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
    portions: [HALF, FULL],
    spiceLevels: biryaniSpice,
  },
  {
    id: "boneless-chicken-dum",
    name: "Boneless Chicken Dum Biryani",
    description:
      "All the ceremony of dum cooking with juicy, boneless chicken thigh pieces. Buttery, aromatic and effortless to eat.",
    price: 399,
    category: "chicken-biryani",
    image: img("1596560548464-f010549b84d7"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
    portions: [HALF, FULL],
    spiceLevels: biryaniSpice,
  },
  // Mutton Biryani
  {
    id: "royal-mutton-dum",
    name: "Royal Mutton Dum Biryani",
    description:
      "Slow-cooked mutton on the bone, resting under saffron-kissed basmati until it falls apart at the touch of a spoon. Our house signature.",
    price: 449,
    category: "mutton-biryani",
    image: img("1567337710282-00832b415979"),
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    portions: [HALF, FULL],
    spiceLevels: biryaniSpice,
  },
  {
    id: "mutton-keema",
    name: "Mutton Keema Biryani",
    description:
      "Fine-minced mutton tossed with green peas and whole spices, layered through rice for flavour in every grain.",
    price: 429,
    category: "mutton-biryani",
    image: img("1617093727343-374698b1b08d"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
    spiceLevels: biryaniSpice,
  },
  // Veg Biryani
  {
    id: "paneer-dum",
    name: "Paneer Dum Biryani",
    description:
      "Soft cottage cheese, cashews and mint layered with long-grain basmati and sealed on dum. A vegetarian biryani with no compromises.",
    price: 299,
    category: "veg-biryani",
    image: img("1585032226651-759b368d7246"),
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    portions: [HALF, FULL],
    spiceLevels: biryaniSpice,
  },
  {
    id: "royal-vegetable",
    name: "Royal Vegetable Biryani",
    description:
      "Garden vegetables and paneer, tossed in royal masala and baked under a pastry seal with saffron rice.",
    price: 259,
    category: "veg-biryani",
    image: img("1596797038530-2c107229654b"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    spiceLevels: biryaniSpice,
  },
  {
    id: "mushroom-biryani",
    name: "Mushroom Biryani",
    description:
      "Earthy button mushrooms and shallots cooked with black cardamom and star anise for a deep, woodsy biryani.",
    price: 279,
    category: "veg-biryani",
    image: img("1606491956689-2ea866880c84"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    spiceLevels: biryaniSpice,
  },
  // Starters
  {
    id: "chicken-65",
    name: "Chicken 65",
    description:
      "Crisp-fried chicken tossed in a glossy red chilli-garlic glaze with curry leaves and yogurt. Chennai's favourite starter.",
    price: 249,
    category: "starters",
    image: img("1603360946369-dc9bb6258143"),
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
  },
  {
    id: "chilli-chicken",
    name: "Chilli Chicken",
    description:
      "Wok-tossed chicken with bell peppers, onions and a dark soy-chilli sauce. Semi-dry, smoky, addictive.",
    price: 259,
    category: "starters",
    image: img("1603894584373-5ac82b2ae398"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "apollo-fish",
    name: "Apollo Fish",
    description:
      "Boneless fish fillets in a whisked-egg batter, finished with fried green chillies and coriander. A Hyderabadi bar classic.",
    price: 299,
    category: "starters",
    image: img("1559847844-5315695dadae"),
    isVeg: false,
    isBestseller: false,
    isAvailable: false,
  },
  // Kebabs
  {
    id: "chicken-seekh",
    name: "Chicken Seekh Kebab",
    description:
      "Hand-minced chicken shaped on skewers and char-grilled in the tandoor, served with mint chutney and onion rings.",
    price: 279,
    category: "kebabs",
    image: img("1546833999-b9f581a1996d"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "tangdi-kebab",
    name: "Tangdi Kebab",
    description:
      "Jumbo drumsticks marinated in cream, cheese and mild spices, then tandoor-roasted until golden.",
    price: 319,
    category: "kebabs",
    image: img("1555939594-58d7cb561ad1"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka Kebab",
    description:
      "Charred cubes of paneer with peppers and onion, lacquered in a smoky tandoori marinade.",
    price: 259,
    category: "kebabs",
    image: img("1626074353765-517a681e40be"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  // Combos
  {
    id: "royal-family",
    name: "Royal Family Biryani",
    description:
      "Our grand sharing pot: chicken and mutton dum biryani together, with kebabs, raita and mirchi ka salan. Serves 4–5.",
    price: 1199,
    category: "combos",
    image: img("1607330289024-1535c6b4e1c1"),
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
  },
  {
    id: "dum-duo",
    name: "Dum Duo Combo",
    description:
      "One half Hyderabadi chicken dum biryani and one half paneer dum biryani, with two drinks. Made for two.",
    price: 649,
    category: "combos",
    image: img("1512058564366-18510be2db19"),
    isVeg: false,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "veg-feast",
    name: "Veg Feast Combo",
    description:
      "Paneer tikka kebab, royal vegetable biryani, raita and dessert of the day. A complete vegetarian celebration.",
    price: 549,
    category: "combos",
    image: img("1529692236671-f1f6cf9683ba"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  // Beverages
  {
    id: "royal-lassi",
    name: "Royal Sweet Lassi",
    description:
      "Thick churned yogurt lassi topped with a whisper of kesar and pistachio.",
    price: 99,
    category: "beverages",
    image: img("1571066811602-716837d681de"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    description:
      "Assam leaf tea simmered with ginger, cardamom and a touch of clove.",
    price: 59,
    category: "beverages",
    image: img("1544787219-7f47ccb76574"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "fresh-lime",
    name: "Fresh Lime Soda",
    description:
      "Hand-squeezed lime, sparkling soda and a choice of sweet, salted or mixed.",
    price: 79,
    category: "beverages",
    image: img("1553909489-cd47e0907980"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
  {
    id: "filter-coffee",
    name: "South Indian Filter Coffee",
    description:
      "Dark-chicory blend, frothed with hot milk and poured tall between tumbler and dabara.",
    price: 69,
    category: "beverages",
    image: img("1509042239860-f550ce710b93"),
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
  },
];

/** Editorial images used across the home, story and auth pages. */
export const SITE_IMAGES = {
  hero: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1400&h=1600&fit=crop&auto=format&q=75",
  story: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&h=1200&fit=crop&auto=format&q=75",
  spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&h=700&fit=crop&auto=format&q=70",
  kitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&h=700&fit=crop&auto=format&q=70",
  auth: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=1800&fit=crop&auto=format&q=70",
  contact: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&h=900&fit=crop&auto=format&q=70",
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Ananya Reddy",
    location: "Hyderabad",
    rating: 5,
    text: "The mutton dum biryani tastes exactly like the one my grandmother used to seal with dough. Every grain separate, every piece falling apart.",
  },
  {
    id: "r2",
    name: "Rohit Malhotra",
    location: "Bengaluru",
    rating: 5,
    text: "Ordered the Royal Family pot for a family dinner. Generous, aromatic and beautifully packed. It felt like an occasion, not a takeaway.",
  },
  {
    id: "r3",
    name: "Meera Krishnan",
    location: "Chennai",
    rating: 4,
    text: "The paneer biryani finally gives vegetarians something to be proud of. Gentle spice, real saffron, no shortcuts.",
  },
];

export const CUSTOMERS: CustomerRecord[] = [
  { id: "c1", name: "Ananya Reddy", email: "ananya.reddy@example.com", phone: "9848012345", orders: 12, registeredAt: "2026-02-14" },
  { id: "c2", name: "Rohit Malhotra", email: "rohit.m@example.com", phone: "9811122233", orders: 8, registeredAt: "2026-03-02" },
  { id: "c3", name: "Meera Krishnan", email: "meera.k@example.com", phone: "9900776655", orders: 5, registeredAt: "2026-03-19" },
  { id: "c4", name: "Aditya Sharma", email: "aditya.sharma@example.com", phone: "9765432109", orders: 3, registeredAt: "2026-04-08" },
  { id: "c5", name: "Sana Iqbal", email: "sana.iqbal@example.com", phone: "9650011223", orders: 9, registeredAt: "2026-04-22" },
  { id: "c6", name: "Karthik Nair", email: "karthik.nair@example.com", phone: "9895147258", orders: 6, registeredAt: "2026-05-10" },
  { id: "c7", name: "Priya Desai", email: "priya.desai@example.com", phone: "9820334455", orders: 2, registeredAt: "2026-06-01" },
  { id: "c8", name: "Vikram Singh", email: "vikram.singh@example.com", phone: "9812345678", orders: 11, registeredAt: "2026-06-18" },
  { id: "c9", name: "Lakshmi Rao", email: "lakshmi.rao@example.com", phone: "9440012345", orders: 4, registeredAt: "2026-07-05" },
  { id: "c10", name: "Imran Khan", email: "imran.khan@example.com", phone: "9701122334", orders: 7, registeredAt: "2026-08-12" },
  { id: "c11", name: "Divya Menon", email: "divya.menon@example.com", phone: "9945678123", orders: 5, registeredAt: "2026-09-01" },
  { id: "c12", name: "Arjun Patel", email: "arjun.patel@example.com", phone: "9723456781", orders: 10, registeredAt: "2026-09-20" },
  { id: "c13", name: "Neha Gupta", email: "neha.gupta@example.com", phone: "9871209876", orders: 1, registeredAt: "2026-10-04" },
  { id: "c14", name: "Farhan Ali", email: "farhan.ali@example.com", phone: "9640112233", orders: 6, registeredAt: "2026-10-12" },
];

const daysAgo = (n: number, hour = 13) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 15, 0, 0);
  return d.toISOString();
};

/** Sample orders used across My Orders and the admin dashboard. */
export const SEED_ORDERS: Order[] = [
  {
    id: "RD-2026-1042", customer: { name: "Ananya Reddy", phone: "9848012345", email: "ananya.reddy@example.com" },
    items: [{ menuItemId: "royal-mutton-dum", name: "Royal Mutton Dum Biryani", quantity: 1, unitPrice: 449, portion: "Full (Serves 2)", spiceLevel: "Medium" }, { menuItemId: "royal-lassi", name: "Royal Sweet Lassi", quantity: 2, unitPrice: 99 }],
    subtotal: 647, discount: 0, total: 647, status: "completed", createdAt: daysAgo(1), source: "seed",
  },
  {
    id: "RD-2026-1043", customer: { name: "Rohit Malhotra", phone: "9811122233", email: "rohit.m@example.com", notes: "Extra raita please" },
    items: [{ menuItemId: "royal-family", name: "Royal Family Biryani", quantity: 1, unitPrice: 1199 }, { menuItemId: "chicken-65", name: "Chicken 65", quantity: 2, unitPrice: 249 }],
    subtotal: 1697, discount: 0, total: 1697, status: "confirmed", createdAt: daysAgo(1, 19), source: "seed",
  },
  {
    id: "RD-2026-1044", customer: { name: "Meera Krishnan", phone: "9900776655", email: "meera.k@example.com" },
    items: [{ menuItemId: "paneer-dum", name: "Paneer Dum Biryani", quantity: 1, unitPrice: 299, portion: "Full (Serves 2)", spiceLevel: "Mild" }, { menuItemId: "masala-chai", name: "Masala Chai", quantity: 2, unitPrice: 59 }],
    subtotal: 417, discount: 0, total: 417, status: "preparing", createdAt: daysAgo(0, 11), source: "seed",
  },
  {
    id: "RD-2026-1045", customer: { name: "Vikram Singh", phone: "9812345678", email: "vikram.singh@example.com" },
    items: [{ menuItemId: "hyd-chicken-dum", name: "Hyderabadi Chicken Dum Biryani", quantity: 2, unitPrice: 349, portion: "Full (Serves 2)", spiceLevel: "Spicy" }, { menuItemId: "chicken-seekh", name: "Chicken Seekh Kebab", quantity: 1, unitPrice: 279 }],
    subtotal: 977, discount: 0, total: 977, status: "placed", createdAt: daysAgo(0, 12), source: "seed",
  },
  {
    id: "RD-2026-1046", customer: { name: "Sana Iqbal", phone: "9650011223", email: "sana.iqbal@example.com" },
    items: [{ menuItemId: "veg-feast", name: "Veg Feast Combo", quantity: 1, unitPrice: 549 }, { menuItemId: "fresh-lime", name: "Fresh Lime Soda", quantity: 2, unitPrice: 79 }],
    subtotal: 707, discount: 0, total: 707, status: "ready", createdAt: daysAgo(0, 10), source: "seed",
  },
  {
    id: "RD-2026-1047", customer: { name: "Imran Khan", phone: "9701122334", email: "imran.khan@example.com" },
    items: [{ menuItemId: "tangdi-kebab", name: "Tangdi Kebab", quantity: 2, unitPrice: 319 }, { menuItemId: "royal-lassi", name: "Royal Sweet Lassi", quantity: 1, unitPrice: 99 }],
    subtotal: 737, discount: 0, total: 737, status: "completed", createdAt: daysAgo(2, 20), source: "seed",
  },
  {
    id: "RD-2026-1048", customer: { name: "Karthik Nair", phone: "9895147258", email: "karthik.nair@example.com", notes: "Ring the bell twice" },
    items: [{ menuItemId: "andhra-chicken", name: "Andhra Spicy Chicken Biryani", quantity: 1, unitPrice: 369, portion: "Full (Serves 2)", spiceLevel: "Spicy" }, { menuItemId: "apollo-fish", name: "Apollo Fish", quantity: 1, unitPrice: 299 }],
    subtotal: 668, discount: 0, total: 668, status: "cancelled", createdAt: daysAgo(3, 14), source: "seed",
  },
  {
    id: "RD-2026-1049", customer: { name: "Arjun Patel", phone: "9723456781", email: "arjun.patel@example.com" },
    items: [{ menuItemId: "boneless-chicken-dum", name: "Boneless Chicken Dum Biryani", quantity: 2, unitPrice: 399, portion: "Full (Serves 2)", spiceLevel: "Medium" }, { menuItemId: "filter-coffee", name: "South Indian Filter Coffee", quantity: 2, unitPrice: 69 }],
    subtotal: 936, discount: 0, total: 936, status: "completed", createdAt: daysAgo(4, 13), source: "seed",
  },
  {
    id: "RD-2026-1050", customer: { name: "Lakshmi Rao", phone: "9440012345", email: "lakshmi.rao@example.com" },
    items: [{ menuItemId: "royal-vegetable", name: "Royal Vegetable Biryani", quantity: 1, unitPrice: 259, spiceLevel: "Mild" }, { menuItemId: "paneer-tikka", name: "Paneer Tikka Kebab", quantity: 1, unitPrice: 259 }],
    subtotal: 518, discount: 0, total: 518, status: "completed", createdAt: daysAgo(5, 12), source: "seed",
  },
  {
    id: "RD-2026-1051", customer: { name: "Divya Menon", phone: "9945678123", email: "divya.menon@example.com" },
    items: [{ menuItemId: "mutton-keema", name: "Mutton Keema Biryani", quantity: 1, unitPrice: 429, spiceLevel: "Medium" }, { menuItemId: "masala-chai", name: "Masala Chai", quantity: 1, unitPrice: 59 }],
    subtotal: 488, discount: 0, total: 488, status: "completed", createdAt: daysAgo(6, 19), source: "seed",
  },
  {
    id: "RD-2026-1052", customer: { name: "Priya Desai", phone: "9820334455", email: "priya.desai@example.com" },
    items: [{ menuItemId: "dum-duo", name: "Dum Duo Combo", quantity: 1, unitPrice: 649 }],
    subtotal: 649, discount: 0, total: 649, status: "completed", createdAt: daysAgo(8, 13), source: "seed",
  },
  {
    id: "RD-2026-1053", customer: { name: "Farhan Ali", phone: "9640112233", email: "farhan.ali@example.com" },
    items: [{ menuItemId: "hyd-chicken-dum", name: "Hyderabadi Chicken Dum Biryani", quantity: 1, unitPrice: 349, portion: "Half (Serves 1)", spiceLevel: "Medium" }, { menuItemId: "chilli-chicken", name: "Chilli Chicken", quantity: 1, unitPrice: 259 }],
    subtotal: 608, discount: 0, total: 608, status: "cancelled", createdAt: daysAgo(9, 21), source: "seed",
  },
  {
    id: "RD-2026-1054", customer: { name: "Neha Gupta", phone: "9871209876", email: "neha.gupta@example.com" },
    items: [{ menuItemId: "paneer-dum", name: "Paneer Dum Biryani", quantity: 2, unitPrice: 299, portion: "Full (Serves 2)", spiceLevel: "Medium" }],
    subtotal: 598, discount: 0, total: 598, status: "completed", createdAt: daysAgo(11, 14), source: "seed",
  },
  {
    id: "RD-2026-1055", customer: { name: "Aditya Sharma", phone: "9765432109", email: "aditya.sharma@example.com" },
    items: [{ menuItemId: "royal-family", name: "Royal Family Biryani", quantity: 1, unitPrice: 1199 }, { menuItemId: "fresh-lime", name: "Fresh Lime Soda", quantity: 3, unitPrice: 79 }],
    subtotal: 1436, discount: 0, total: 1436, status: "completed", createdAt: daysAgo(13, 20), source: "seed",
  },
];
