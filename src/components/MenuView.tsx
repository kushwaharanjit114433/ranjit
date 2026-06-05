import { useState, useMemo } from 'react';
import { Star, Clock, MapPin, Search, ArrowLeft, ArrowRight, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Restaurant, FoodItem, AppView, CartItem } from '../types';

interface MenuViewProps {
  restaurant: Restaurant | null;
  setView: (view: AppView) => void;
  onAddToCart: (item: FoodItem, qty: number) => void;
  cart: CartItem[];
}

export default function MenuView({
  restaurant,
  setView,
  onAddToCart,
  cart,
}: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<'snacks' | 'maincourse' | 'drinks'>('snacks');
  const [menuSearch, setMenuSearch] = useState('');
  const [addingIds, setAddingIds] = useState<{ [id: string]: boolean }>({});
  const [itemQuantities, setItemQuantities] = useState<{ [id: string]: number }>({});

  const filteredItems = useMemo(() => {
    if (!restaurant) return [];
    return restaurant.menu.filter(item => {
      const matchCategory = item.category === activeCategory;
      const matchSearch = itemSearch(item, menuSearch);
      return matchCategory && matchSearch;
    });
  }, [restaurant, activeCategory, menuSearch]);

  function itemSearch(item: FoodItem, query: string): boolean {
    if (!query) return true;
    const q = query.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
  }

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center" id="menu-not-found">
        <span className="text-5xl">🧭</span>
        <h2 className="text-xl font-bold text-gray-800 mt-4">No restaurant selected</h2>
        <p className="text-xs text-gray-500 mt-2">Please go back and select a restaurant from our listing page.</p>
        <button
          onClick={() => setView('restaurants')}
          className="mt-6 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  const handleAddClick = (item: FoodItem) => {
    const qty = itemQuantities[item.id] || 1;
    onAddToCart(item, qty);
    
    // Set adding visual state temporarily
    setAddingIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddingIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);

    // Reset quantity back to 1
    setItemQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const handleQuantityAdjust = (id: string, adjust: number) => {
    const current = itemQuantities[id] || 1;
    const next = Math.max(1, current + adjust);
    setItemQuantities(prev => ({ ...prev, [id]: next }));
  };

  // Calculate restaurant total items added to cart
  const restCartItems = cart.filter(item => item.restaurantId === restaurant.id);
  const totalRestItems = restCartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalRestCost = restCartItems.reduce((acc, curr) => acc + (curr.quantity * curr.foodItem.price), 0);

  return (
    <div className="space-y-8 pb-24" id="menu-view-container">
      {/* 1. Restaurant Header Banner */}
      <section className="relative overflow-hidden bg-gray-900 text-white rounded-3xl py-12 sm:py-16 px-6 sm:px-12 mx-4 sm:mx-6 shadow-md" id="menu-restaurant-banner">
        <div className="absolute inset-0 z-0">
          <img
            src={restaurant.bannerImage}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-35 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <button
            onClick={() => setView('restaurants')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Listings
          </button>

          <div className="space-y-2 pt-4">
            <h1 className="text-3xl sm:text-4xl font-sans font-black tracking-tight">{restaurant.name}</h1>
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">{restaurant.description}</p>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs text-gray-200 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <strong className="text-white">{restaurant.rating} Rating</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-red-400" />
              <span>Prep Time: ~{restaurant.deliveryTime} mins</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-red-400" />
              <span>{restaurant.address}</span>
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest text-[9px]">
              {restaurant.priceType} Pricey
            </span>
          </div>
        </div>
      </section>

      {/* 2. Menu Navigation & Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6" id="menu-items-grid">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          {/* Categories: Snacks, Main course, Drinks */}
          <div className="flex gap-1.5 p-1 bg-gray-50 rounded-2xl w-fit">
            <button
              onClick={() => setActiveCategory('snacks')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'snacks'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              🥟 Snacks & Starters
            </button>
            <button
              onClick={() => setActiveCategory('maincourse')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'maincourse'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              🍛 Main Course
            </button>
            <button
              onClick={() => setActiveCategory('drinks')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === 'drinks'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              🍹 Beverage / Drinks
            </button>
          </div>

          {/* Local Filter search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Search dishes..."
              className="w-full text-xs text-gray-800 bg-gray-50 py-2.5 pl-9 pr-4 rounded-xl border border-gray-255 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500"
            />
            <Search size={14} className="absolute left-3 top-3 text-gray-400" />
            {menuSearch && (
              <button onClick={() => setMenuSearch('')} className="absolute right-3 top-2.5 text-xs text-gray-400 cursor-pointer">×</button>
            )}
          </div>
        </div>

        {/* 3. Listed Foods Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-100">
            <span className="text-3xl">👨‍🍳</span>
            <h3 className="text-sm font-bold text-gray-700 mt-2">No menu-items listed here currently</h3>
            <p className="text-xs text-gray-400 mt-1">Try toggling context category or filter keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid-display">
            {filteredItems.map((item) => {
              const qty = itemQuantities[item.id] || 1;
              const isAdding = addingIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-3xl p-4 flex gap-4 hover:shadow-md transition-shadow relative"
                >
                  {/* Food Thumb */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {item.popular && (
                      <span className="absolute bottom-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md leading-none shadow-xs uppercase">
                        POPULAR
                      </span>
                    )}
                  </div>

                  {/* Food Spec */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight">
                          {item.name}
                        </h4>
                        {item.rating && (
                          <div className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-1 py-0.5 rounded text-[10px] font-bold shrink-0">
                            ★{item.rating}
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 font-mono mt-1 font-bold">NRs. {item.price}</p>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Quantity controls & Add triggers */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-gray-50">
                      <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                        <button
                          onClick={() => handleQuantityAdjust(item.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500 cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-gray-800">{qty}</span>
                        <button
                          onClick={() => handleQuantityAdjust(item.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500 cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleAddClick(item)}
                        disabled={isAdding}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isAdding
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-xs active:scale-95'
                        }`}
                      >
                        {isAdding ? (
                          <>
                            <Check size={12} />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={12} />
                            <span>Add (NRs. {item.price * qty})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Sticky Sticky Cart Footer preview */}
      {totalRestItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 bg-gray-900 border border-gray-800 text-white rounded-2xl p-4 shadow-xl max-w-xl mx-auto flex items-center justify-between animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center animate-pulse">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-xs font-bold">{totalRestItems} Food-items selected from {restaurant.name}</p>
              <p className="text-xs text-red-400 font-mono font-black">Subtotal: NRs. {totalRestCost}</p>
            </div>
          </div>
          <button
            onClick={() => setView('cart')}
            className="flex items-center gap-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Proceed to checkout</span>
            <ArrowRight size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
