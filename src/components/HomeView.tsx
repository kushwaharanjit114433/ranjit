import React, { useState } from 'react';
import { Search, Star, Clock, MapPin, ArrowRight, ShieldCheck, Soup, Flame } from 'lucide-react';
import { Restaurant, AppView } from '../types';
import { POPULAR_FOOD_CATEGORIES, CAMPAIGN_OFFERS } from '../data';

interface HomeViewProps {
  restaurants: Restaurant[];
  setView: (view: AppView) => void;
  setSearchQuery: (query: string) => void;
  setSelectedRestaurantId: (id: string) => void;
}

export default function HomeView({
  restaurants,
  setView,
  setSearchQuery,
  setSelectedRestaurantId,
}: HomeViewProps) {
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setView('restaurants');
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery(categoryName);
    setView('restaurants');
  };

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurantId(id);
    setView('menu');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  const featuredRestaurants = restaurants.filter(r => r.featured).slice(0, 3);

  return (
    <div className="space-y-16 pb-16" id="home-view-container">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-600 to-amber-500 text-white rounded-3xl py-16 sm:py-20 px-6 sm:px-12 mx-4 sm:mx-6 shadow-xl" id="home-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60"></div>
        <div className="max-w-4xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-amber-100">
            <Flame size={12} className="animate-pulse text-amber-300" />
            <span>Fastest Delivery in Kathmandu Valley</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-tight">
            Craving Local Delights? <br />
            We Deliver <span className="text-amber-300 underline decoration-wavy decoration-3">Happiness</span>.
          </h1>
          <p className="text-lg sm:text-xl text-red-50/90 font-medium max-w-2xl">
            Order delicious Momos, Thakali packages, Wood-fired pizzas, Newari Khaja and much more from Nepal’s highest rated kitchens.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-md w-full flex bg-white rounded-2xl p-1.5 shadow-lg text-gray-800 focus-within:ring-2 focus-within:ring-amber-300 transition-all">
            <div className="flex-1 flex items-center gap-2 pl-3">
              <Search className="text-gray-400 shrink-0" size={18} />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search food, momo, pizza or restaurant..."
                className="w-full text-sm outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 sm:px-7 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Order Now
            </button>
          </form>

          {/* Prompt labels */}
          <div className="flex flex-wrap gap-2 text-xs text-red-50">
            <span className="font-semibold">Popular:</span>
            <button type="button" onClick={() => handleCategoryClick('Momo')} className="underline hover:text-amber-300 cursor-pointer">Steamed Momo</button>
            <span>•</span>
            <button type="button" onClick={() => handleCategoryClick('Thakali')} className="underline hover:text-amber-300 cursor-pointer">Thakali Thali</button>
            <span>•</span>
            <button type="button" onClick={() => handleCategoryClick('Pizza')} className="underline hover:text-amber-300 cursor-pointer">Pizza</button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 top-0 opacity-10 lg:opacity-20 flex items-center justify-center p-8 pointer-events-none">
          <span className="text-[200px] select-none">🥟</span>
        </div>
      </section>

      {/* 2. Popular Food Categories */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home-popular-categories">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-sans font-black text-gray-900 tracking-tight">
              What are you craving today?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select category to filter food partners across the city
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => { setSearchQuery(''); setView('restaurants'); }}
            className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
          >
            <span>Browse All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
          {POPULAR_FOOD_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCategoryClick(cat.searchQuery)}
              className="group flex flex-col items-center p-4 bg-gray-50 hover:bg-red-50/50 rounded-2xl border border-gray-100 hover:border-red-100 transition-all active:scale-95 text-center cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-white group-hover:bg-red-50 flex items-center justify-center text-3xl shadow-sm border border-gray-100 transition-all mb-3 group-hover:scale-110">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Offers & Discounts Campaign Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home-campaign-offers">
        <div className="mb-6">
          <h2 className="text-2xl font-sans font-black text-gray-900 tracking-tight">
            Special Deals For You
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Apply active coupons in your checkout summary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAMPAIGN_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className={`bg-gradient-to-r ${offer.colorClass} text-white p-6 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden`}
            >
              <div className="absolute right-3 top-3 opacity-15">
                <Soup size={100} />
              </div>
              <div className="relative z-10 space-y-2">
                <span className="inline-block bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {offer.discountText}
                </span>
                <h3 className="text-lg font-extrabold">{offer.title}</h3>
                <p className="text-xs text-white/90 leading-relaxed">{offer.description}</p>
              </div>
              <div className="mt-5 flex justify-between items-center bg-black/10 p-2 rounded-xl backdrop-blur-xs">
                <div>
                  <span className="text-[10px] text-white/60 block font-mono font-bold leading-none">CODE</span>
                  <span className="font-mono text-sm font-black text-amber-200">{offer.code}</span>
                </div>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="bg-white hover:bg-gray-50 text-gray-900 font-sans font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Copy Link Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Restaurants Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="home-featured-restaurants">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-sans font-black text-gray-900 tracking-tight">
              Featured Food Partners
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Top kitchen standards & fastest deliverers vetted by Food Hub
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setView('restaurants'); }}
            className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
          >
            <span>All Partners</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((rest) => (
            <div
              key={rest.id}
              onClick={() => handleRestaurantClick(rest.id)}
              className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                  ★ FEATURED ★
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 shadow-xs flex items-center gap-1">
                  <Clock size={12} className="text-red-500" />
                  <span>{rest.deliveryTime} mins</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-extrabold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                    {rest.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-lg">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-700">{rest.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 line-clamp-1">
                  {rest.foodType}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 border-t border-gray-50 pt-3">
                  <MapPin size={12} className="text-red-500 shrink-0" />
                  <span className="line-clamp-1 flex-1">{rest.address}</span>
                  <span className="font-mono text-gray-700 font-bold">{rest.priceType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="bg-gray-50 rounded-3xl py-12 px-6 sm:px-12 mx-4 sm:mx-6 text-center" id="home-how-it-works">
        <div className="max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl font-sans font-black text-gray-900 tracking-tight">
            How Food Hub Works?
          </h2>
          <p className="text-sm text-gray-500">
            Getting premium tastes in Nepal has never been simpler
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shadow-sm font-sans text-2xl font-black">
              1
            </div>
            <h3 className="font-bold text-gray-800 text-base">Select Your Food</h3>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Explore countless menus, apply delicious promotion codes, and add favorites to your single-screen cart.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm font-sans text-2xl font-black">
              2
            </div>
            <h3 className="font-bold text-gray-800 text-base">Kitchen Prepares</h3>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Vetted restaurant chefs immediately begin prepping your items under perfect hygiene standards.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm font-sans text-2xl font-black">
              3
            </div>
            <h3 className="font-bold text-gray-800 text-base">Rider Delivers</h3>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Real-time assigned riders carry hot insulated carrier bags directly to your coordinates in record time!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
