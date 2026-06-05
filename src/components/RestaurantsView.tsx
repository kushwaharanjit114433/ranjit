import { useState, useMemo } from 'react';
import { Search, Star, Clock, MapPin, SlidersHorizontal, Check, X } from 'lucide-react';
import { Restaurant, AppView } from '../types';

interface RestaurantsViewProps {
  restaurants: Restaurant[];
  setView: (view: AppView) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedRestaurantId: (id: string) => void;
}

export default function RestaurantsView({
  restaurants,
  setView,
  searchQuery,
  setSearchQuery,
  setSelectedRestaurantId,
}: RestaurantsViewProps) {
  // Filters
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedFoodType, setSelectedFoodType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'time' | 'default'>('default');

  const foodTypes = useMemo(() => {
    const typesSet = new Set<string>();
    restaurants.forEach(r => {
      r.foodType.split(',').forEach(t => typesSet.add(t.trim()));
    });
    return Array.from(typesSet);
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    // Search query query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.foodType.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.menu.some(item => 
          item.name.toLowerCase().includes(q) || 
          item.description.toLowerCase().includes(q)
        )
      );
    }

    // Rating filter
    if (selectedRating) {
      result = result.filter(r => r.rating >= selectedRating);
    }

    // Price tier filter
    if (selectedPrice) {
      result = result.filter(r => r.priceType === selectedPrice);
    }

    // Food Type tag filter
    if (selectedFoodType) {
      result = result.filter(r => r.foodType.toLowerCase().includes(selectedFoodType.toLowerCase()));
    }

    // Sort order
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'time') {
      result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    }

    return result;
  }, [restaurants, searchQuery, selectedRating, selectedPrice, selectedFoodType, sortBy]);

  const handleRestaurantSelect = (id: string) => {
    setSelectedRestaurantId(id);
    setView('menu');
  };

  const handleClearFilters = () => {
    setSelectedRating(null);
    setSelectedPrice(null);
    setSelectedFoodType(null);
    setSortBy('default');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="restaurants-view-container">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-3xl font-sans font-black text-gray-900 tracking-tight">Our Kitchen Network</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse through delicious local spots cooking hot specialties right now
          </p>
        </div>

        {/* Local Search Input within restaurants screen */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search kitchens, menu dishes..."
            className="w-full text-xs text-gray-800 bg-gray-50 py-3 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 p-0.5 rounded-full hover:bg-gray-200 text-gray-500 cursor-pointer"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Grid of filters + Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="restaurants-grid-layout">
        
        {/* Left Side Filters Sidebar - Sticky */}
        <div className="lg:col-span-1 space-y-6 self-start lg:sticky lg:top-24 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs" id="restaurants-filters-sidebar">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="flex items-center gap-1.5 font-extrabold text-sm text-gray-800">
              <SlidersHorizontal size={14} className="text-red-600" />
              <span>Apply Filters</span>
            </h2>
            {(selectedRating || selectedPrice || selectedFoodType || sortBy !== 'default' || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort By option */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Sort By</p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-50">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'default'}
                  onChange={() => setSortBy('default')}
                  className="accent-red-600"
                />
                <span>Relevance</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-50">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'rating'}
                  onChange={() => setSortBy('rating')}
                  className="accent-red-600"
                />
                <span>Top Rated</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-50">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'time'}
                  onChange={() => setSortBy('time')}
                  className="accent-red-600"
                />
                <span>Speediest Delivery</span>
              </label>
            </div>
          </div>

          {/* Quick Cuisine filter */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Cuisine Tag</p>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {foodTypes.map((type, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFoodType(selectedFoodType === type ? null : type)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedFoodType === type
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Minimum Rating</p>
            <div className="flex flex-col gap-1 text-xs text-gray-700">
              {[4.7, 4.5, 4.3].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setSelectedRating(selectedRating === rate ? null : rate)}
                  className={`flex items-center justify-between p-1.5 rounded-lg text-left transition-colors ${
                    selectedRating === rate ? 'bg-red-50 text-red-600 font-bold' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>{rate} & above</span>
                  </span>
                  {selectedRating === rate && <Check size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Budget Tier</p>
            <div className="flex gap-2">
              {['$', '$$', '$$$'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedPrice(selectedPrice === tier ? null : tier)}
                  className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedPrice === tier
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {tier === '$' ? 'Sajilo ($)' : tier === '$$' ? 'Thikko ($$)' : 'Mahango ($$$)'}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Restaurant list */}
        <div className="lg:col-span-3 space-y-6" id="restaurants-grid-display">
          {searchQuery && (
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-600 flex justify-between items-center">
              <span>Found <strong>{filteredRestaurants.length}</strong> matching kitchens for "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="font-bold text-red-600 hover:underline cursor-pointer">Clear Search</button>
            </div>
          )}

          {filteredRestaurants.length === 0 ? (
            <div className="bg-gray-50 text-center py-16 px-4 rounded-3xl border border-dashed border-gray-200" id="restaurants-empty-state">
              <span className="text-5xl">🍲</span>
              <h3 className="text-lg font-extrabold text-gray-800 mt-4">No matching kitchens found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-2 leading-relaxed">
                Try adjusting your search keywords, lowering the rating filter, or changing your cuisine flags.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 px-4 py-2 rounded-xl bg-red-600 text-white font-sans text-xs font-bold shadow-md hover:bg-red-700 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" id="restaurants-display-list">
              {filteredRestaurants.map((rest) => (
                <div
                  key={rest.id}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group h-full"
                >
                  {/* Banner Photo */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {rest.featured && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase shadow-xs">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-bold text-gray-800 shadow-sm flex items-center gap-1">
                      <Clock size={11} className="text-red-500" />
                      <span>{rest.deliveryTime} mins</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-extrabold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                          {rest.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-0.5 rounded-lg">
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-bold text-amber-700">{rest.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{rest.foodType}</p>
                      <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed pt-1">{rest.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-gray-50">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1 line-clamp-1 flex-1">
                          <MapPin size={11} className="text-red-500 shrink-0" />
                          <span className="truncate">{rest.address}</span>
                        </div>
                        <span className="font-mono text-gray-700 font-bold tracking-wider">{rest.priceType}</span>
                      </div>

                      {/* View Menu Trigger button */}
                      <button
                        onClick={() => handleRestaurantSelect(rest.id)}
                        className="w-full text-center py-2.5 rounded-xl bg-gray-50 hover:bg-red-600 text-gray-800 hover:text-white font-sans text-xs font-black transition-colors shadow-xs active:scale-95 cursor-pointer"
                        id={`view-menu-btn-${rest.id}`}
                      >
                        View Menu & Order
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
