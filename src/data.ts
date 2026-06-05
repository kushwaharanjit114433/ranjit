import { Restaurant, FoodItem, Order } from './types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Dalle Restaurant & Momo',
    rating: 4.8,
    deliveryTime: 25,
    foodType: 'Momo, Fast Food, Nepalese',
    priceType: '$$',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400',
    bannerImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
    description: 'Home of the spiciest and most delicious momos in Kathmandu. Famous for our signature red chilli dip and crispy pan-fried momos.',
    address: 'Kamaladi, Kathmandu',
    featured: true,
    menu: [
      {
        id: 'food-m-01',
        name: 'Steam Chicken Momo',
        price: 250,
        category: 'snacks',
        description: 'Juicy minced chicken steamed in flour wrappers, served with special roasted tomato and sesame chutney.',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.9,
      },
      {
        id: 'food-m-02',
        name: 'Spicy Chicken C-Momo',
        price: 290,
        category: 'snacks',
        description: 'Fried momos tossed in a hot and stinging sweet & sour chili sauce with bell peppers and onions.',
        image: 'https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.8,
      },
      {
        id: 'food-m-03',
        name: 'Crispy Buff Kothey Momo',
        price: 270,
        category: 'snacks',
        description: 'Half-steamed, half-fried elongated crescent-shaped buff momos, crispy on one side and juicy on the other.',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400',
        rating: 4.7,
      },
      {
        id: 'food-m-04',
        name: 'Dalle Special Chicken Burger',
        price: 320,
        category: 'maincourse',
        description: 'Crispy fried chicken breast, pickled onions, melted cheese, and our home-made secret spicy mayonnaise.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
        rating: 4.6,
      },
      {
        id: 'food-m-05',
        name: 'Buff Jhol Momo',
        price: 260,
        category: 'snacks',
        description: 'Traditional Nepalese steamed buff momos served inside a bowl of cold, tangy, and nutty sesame-soy broth.',
        image: 'https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.9,
      },
      {
        id: 'food-m-06',
        name: 'Thick Masala Chiya',
        price: 80,
        category: 'drinks',
        description: 'Chiya infused with organic ginger, green cardamom, cloves, and bay leaves brewed with rich whole milk.',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
      },
      {
        id: 'food-m-07',
        name: 'Sweet Lassi',
        price: 150,
        category: 'drinks',
        description: 'Creamy yogurt drink blended with sugar, garnished with active dried nuts and fresh saffron strands.',
        image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400',
        rating: 4.5,
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Dilmaya Thakali Kitchen',
    rating: 4.7,
    deliveryTime: 35,
    foodType: 'Thakali, Local, Nepalese',
    priceType: '$$',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    bannerImage: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=1200',
    description: 'Savour the finest mustard-oil cooked authentic Thakali Khana set in town with organic ghee, handpicked kanchhemba, and black lentil dhal.',
    address: 'Jhamsikhel, Lalitpur',
    featured: true,
    menu: [
      {
        id: 'food-t-01',
        name: 'Special Chicken Thakali Thali',
        price: 450,
        category: 'maincourse',
        description: 'Includes premium Marpha Marsi rice, local country chicken curry, black hillside lentils (Kalo Dal), gundruk achar, fermented spinach, spicy potatoes, crispy papad, and hand-churned fresh ghee.',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.9,
      },
      {
        id: 'food-t-02',
        name: 'Local Mutton Thakali Thali',
        price: 580,
        category: 'maincourse',
        description: 'The ultimate Thakali meal containing tender country mutton curry, black daal, timur salad, radish pickle (mula ko achar), and seasonal stir-fried greens in mustard oil.',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.9,
      },
      {
        id: 'food-t-03',
        name: 'Spicy Buff Choila',
        price: 280,
        category: 'snacks',
        description: 'Spicily boiled and char-grilled buff small cubes marinated heavily in roasted mustard oil, raw garlic, ginger, and toasted fenugreek seeds.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.7,
      },
      {
        id: 'food-t-04',
        name: 'Kanchhemba (Buckwheat Fries)',
        price: 200,
        category: 'snacks',
        description: 'Traditional Thakalis snack. Deep-fried fingers made from buckwheat dough, crispy on the outer shell, served with hot Sichuan pepper pickle containing timur.',
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=400',
        rating: 4.5,
      },
      {
        id: 'food-t-05',
        name: 'Fresh Mint & Timur Lemonade',
        price: 120,
        category: 'drinks',
        description: 'Tangy and vibrating refreshing lemonade spiked with Himalayan salt, fresh crushed mint leaves, and a fragrant dash of timur powder.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
        rating: 4.6,
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'The Pizza Cutter',
    rating: 4.5,
    deliveryTime: 20,
    foodType: 'Pizza, Italian, Continental',
    priceType: '$$$',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
    bannerImage: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=1200',
    description: 'Gourmet wood-fired pizzas with slow-fermented crusts, fresh mozzarella, imported olives, and highly aromatic local herbs.',
    address: 'Durbar Marg, Kathmandu',
    featured: false,
    menu: [
      {
        id: 'food-p-01',
        name: 'Himalayan Hot Spicy Pizza',
        price: 550,
        category: 'maincourse',
        description: 'Thin crust with buffalo cheese, hot chicken chunks, green chillies, onions, tomatoes, and dynamic Himalayan timur flakes.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.8,
      },
      {
        id: 'food-p-02',
        name: 'Cheese Burst Margherita',
        price: 490,
        category: 'maincourse',
        description: 'Classic rich tomato sauce layered with heaps of local fresh milk mozzarella, freshly plucked basil leaves, and cold-pressed extra virgin olive oil drizzle.',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400',
        rating: 4.5,
      },
      {
        id: 'food-p-03',
        name: 'Garlic Crust Bread with Cheese',
        price: 210,
        category: 'snacks',
        description: 'Stone-baked baguette slathered heavily in roasted garlic butter and dynamic mozzarella cheese blend, baked till golden brown.',
        image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=400',
        rating: 4.4,
      },
      {
        id: 'food-p-04',
        name: 'Iced Peach Lemon Tea',
        price: 140,
        category: 'drinks',
        description: 'Chilled black tea base infused with sweet juicy peach nectar and freshly squeezed lemon wedges.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400',
        rating: 4.3,
      }
    ]
  },
  {
    id: 'rest-4',
    name: 'Newari Khaja Ghar',
    rating: 4.6,
    deliveryTime: 30,
    foodType: 'Newari, Traditional, Snacks',
    priceType: '$',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=400',
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
    description: 'Authentic taste of Newari lifestyle. Serving fresh hot Bara, Samaybaji feast sets, and delicious chicken choila made on wood charcoal.',
    address: 'Patan Durbar Square, Lalitpur',
    featured: false,
    menu: [
      {
        id: 'food-n-01',
        name: 'Samay Baji Standard Set',
        price: 320,
        category: 'maincourse',
        description: 'Traditional platter with Beaten Rice (Chiura), spicy buff choila, seasoned black soybeans (Bhatmas), ginger-garlic paste, potato bamboo shoot gravy (Aloo Tama), and boiled egg.',
        image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.8,
      },
      {
        id: 'food-n-02',
        name: 'Mixed Egg & Buff Bara',
        price: 180,
        category: 'snacks',
        description: 'Lentil flour pancake cooked on flat griddle topped with seasoned minced buffalo meat and a crispy fried egg.',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.7,
      },
      {
        id: 'food-n-03',
        name: 'Aloo Tama Bodi Soups',
        price: 150,
        category: 'snacks',
        description: 'Distinctively sour and spicy curry representing the perfect blend of potatoes, bamboo shoots (Tama), and black-eyed peas (Bodi).',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400',
        rating: 4.5,
      },
      {
        id: 'food-n-04',
        name: 'Local Badam Sandheko',
        price: 140,
        category: 'snacks',
        description: 'Crunchy toasted peanuts tossed beautifully with raw red onions, green chillies, ginger, fresh lemon, mustard oil, and coriander leaves.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        rating: 4.6,
      },
      {
        id: 'food-n-05',
        name: 'Chilled Mango Shake',
        price: 160,
        category: 'drinks',
        description: 'Dense milkshake blended with pure ripe Nepali mango pulp and vanilla ice cream, topped with almonds.',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=400',
        rating: 4.4,
      }
    ]
  },
  {
    id: 'rest-5',
    name: 'Burger & Shake Station',
    rating: 4.4,
    deliveryTime: 18,
    foodType: 'Burgers, American, Drinks',
    priceType: '$$',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    bannerImage: 'https://images.unsplash.com/photo-1484755560695-a4c73004ffd0?auto=format&fit=crop&q=80&w=1200',
    description: 'Juicy customizable gourmet burgers, waffle fires, and delicious hand-spun extreme loaded milkshakes.',
    address: 'Baneshwor, Kathmandu',
    featured: false,
    menu: [
      {
        id: 'food-b-01',
        name: 'Mighty Buff Tower Burger',
        price: 380,
        category: 'maincourse',
        description: 'Double stacked buff patties, double cheddar cheese, rings of crispy hand-battered onions, crisp lettuce, topped with hickory smoke BBQ glaze.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.7,
      },
      {
        id: 'food-b-02',
        name: 'Spicy Paneer Tikka Wrap',
        price: 260,
        category: 'snacks',
        description: 'Griddle paneer cubes seasoned in spicy yoghurt tandoori marination, rolled in flat bread with mint mayonnaise and onions.',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',
        rating: 4.3,
      },
      {
        id: 'food-b-03',
        name: 'Salted Oreo Caramel Shake',
        price: 240,
        category: 'drinks',
        description: 'Creamy milk, chocolate biscuits, butterscotch sauce, loaded and topped with whipped cream and butter cookie crumbs.',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400',
        popular: true,
        rating: 4.8,
      }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    customerName: 'Samir Shrestha',
    customerEmail: 'samir@gmail.com',
    customerAddress: 'Lazimpat, Near British Embassy, Kathmandu',
    customerPhone: '9841234567',
    items: [
      {
        foodItem: {
          id: 'food-m-01',
          name: 'Steam Chicken Momo',
          price: 250,
          category: 'snacks',
          description: 'Juicy minced chicken steamed in flour wrappers.',
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400',
        },
        quantity: 2,
        restaurantId: 'rest-1',
        restaurantName: 'Dalle Restaurant & Momo'
      },
      {
        foodItem: {
          id: 'food-m-06',
          name: 'Thick Masala Chiya',
          price: 80,
          category: 'drinks',
          description: 'Chiya infused with organic ginger and whole milk.',
          image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
        },
        quantity: 2,
        restaurantId: 'rest-1',
        restaurantName: 'Dalle Restaurant & Momo'
      }
    ],
    totalPrice: 660,
    paymentMethod: 'esewa',
    paymentStatus: 'completed',
    deliveryStatus: 'preparing',
    date: '2026-06-05T01:10:00Z',
  },
  {
    id: 'ord-102',
    customerName: 'Pooja Pandey',
    customerEmail: 'pooja@gmail.com',
    customerAddress: 'Pulchowk, Lalitpur',
    customerPhone: '9851098765',
    items: [
      {
        foodItem: {
          id: 'food-t-01',
          name: 'Special Chicken Thakali Thali',
          price: 450,
          category: 'maincourse',
          description: 'Includes premium Marpha Marsi rice, local country chicken curry...',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400',
        },
        quantity: 1,
        restaurantId: 'rest-2',
        restaurantName: 'Dilmaya Thakali Kitchen'
      }
    ],
    totalPrice: 450,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    deliveryStatus: 'pending',
    date: '2026-06-05T01:25:00Z',
  }
];

export const POPULAR_FOOD_CATEGORIES = [
  { name: 'Momo', icon: '🥟', searchQuery: 'Momo' },
  { name: 'Pizza', icon: '🍕', searchQuery: 'Pizza' },
  { name: 'Burger', icon: '🍔', searchQuery: 'Burger' },
  { name: 'Traditional', icon: '🍛', searchQuery: 'Thali' },
  { name: 'Snacks', icon: '🍟', searchQuery: 'Bara' },
  { name: 'Drinks', icon: '🍹', searchQuery: 'Shake' }
];

export const CAMPAIGN_OFFERS = [
  {
    id: 'off-1',
    title: 'Free Delivery to Patan!',
    description: 'Get free delivery on orders above NRs. 500 in Patan area.',
    code: 'FREEPATAN',
    discountText: 'Free Delivery',
    colorClass: 'from-orange-500 to-red-600',
  },
  {
    id: 'off-2',
    title: 'eSewa Cash Back Offer',
    description: 'Pay using eSewa and get flat 10% instant discount up to NRs. 200.',
    code: 'ESEWA10',
    discountText: '10% OFF',
    colorClass: 'from-green-500 to-teal-600',
  },
  {
    id: 'off-3',
    title: 'Khalti Khushi Deal',
    description: 'Get flat NRs. 150 cashback on your first pizza order using Khalti.',
    code: 'KHALTIPIZZA',
    discountText: 'NRs. 150 Cashback',
    colorClass: 'from-purple-600 to-indigo-700',
  }
];

export function getRestaurants(): Restaurant[] {
  const store = localStorage.getItem('foodhub_restaurants');
  if (!store) {
    localStorage.setItem('foodhub_restaurants', JSON.stringify(INITIAL_RESTAURANTS));
    return INITIAL_RESTAURANTS;
  }
  return JSON.parse(store);
}

export function saveRestaurants(restaurants: Restaurant[]) {
  localStorage.setItem('foodhub_restaurants', JSON.stringify(restaurants));
}

export function getOrders(): Order[] {
  const store = localStorage.getItem('foodhub_orders');
  if (!store) {
    localStorage.setItem('foodhub_orders', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  return JSON.parse(store);
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem('foodhub_orders', JSON.stringify(orders));
}
