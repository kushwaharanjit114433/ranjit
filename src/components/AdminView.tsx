import React, { useState, useMemo } from 'react';
import { Restaurant, FoodItem, Order, DeliveryStatus, PaymentStatus } from '../types';
import { ShieldCheck, Plus, Trash2, Edit3, ShoppingCart, Truck, Utensils, Coins, Check, AlertCircle } from 'lucide-react';

interface AdminViewProps {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

export default function AdminView({
  restaurants,
  setRestaurants,
  orders,
  setOrders,
}: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'menu' | 'orders'>('orders');

  // Restaurant Form State
  const [newRestName, setNewRestName] = useState('');
  const [newRestType, setNewRestType] = useState('');
  const [newRestAddress, setNewRestAddress] = useState('');
  const [newRestTime, setNewRestTime] = useState<number>(30);
  const [newRestPrice, setNewRestPrice] = useState<'$$' | '$$$' | '$'>('$$');

  // Selected Restaurant ID for Menu Modification
  const [selectedRestId, setSelectedRestId] = useState<string>(restaurants[0]?.id || '');
  
  // Menu Item Form State
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(200);
  const [newItemCategory, setNewItemCategory] = useState<'snacks' | 'maincourse' | 'drinks'>('snacks');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Rider list for assignment
  const ridersList = ['Rider Madan Shrestha', 'Rider Rita Tamang', 'Rider Binod Khadka', 'Rider Ram Thapa'];

  // 1. Add Restaurant Action
  const handleAddRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRestName || !newRestType || !newRestAddress) return;

    const newRest: Restaurant = {
      id: `rest-${Date.now()}`,
      name: newRestName,
      rating: 4.5,
      deliveryTime: Number(newRestTime),
      foodType: newRestType,
      priceType: newRestPrice,
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400',
      bannerImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
      description: 'Newly added store partner on Food Hub Nepal.',
      address: newRestAddress,
      menu: [],
    };

    const updated = [...restaurants, newRest];
    setRestaurants(updated);
    
    // Reset fields
    setNewRestName('');
    setNewRestType('');
    setNewRestAddress('');
    alert(`Success: Restaurant "${newRest.name}" registered successfully!`);
  };

  // 2. Remove Restaurant Action
  const handleRemoveRestaurant = (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return;
    const updated = restaurants.filter(r => r.id !== id);
    setRestaurants(updated);
    if (selectedRestId === id && updated.length > 0) {
      setSelectedRestId(updated[0].id);
    }
  };

  // 3. Add Dishes to selected Restaurant
  const handleAddItemToMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice || !selectedRestId) return;

    const newItem: FoodItem = {
      id: `food-${Date.now()}`,
      name: newItemName,
      price: Number(newItemPrice),
      category: newItemCategory,
      description: newItemDesc || 'Fresh, dynamic and hygienic specialty cooked to order.',
      image: newItemCategory === 'drinks' 
        ? 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400'
        : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      rating: 4.5,
    };

    const updated = restaurants.map(r => {
      if (r.id === selectedRestId) {
        return {
          ...r,
          menu: [...r.menu, newItem]
        };
      }
      return r;
    });

    setRestaurants(updated);
    
    // Reset Form
    setNewItemName('');
    setNewItemPrice(200);
    setNewItemDesc('');
    alert(`Added "${newItem.name}" to menu list successfully!`);
  };

  // 4. Delete item from Restaurant Menu
  const handleRemoveItemFromMenu = (restId: string, itemId: string) => {
    const updated = restaurants.map(r => {
      if (r.id === restId) {
        return {
          ...r,
          menu: r.menu.filter(item => item.id !== itemId)
        };
      }
      return r;
    });
    setRestaurants(updated);
  };

  // 5. Update active order dispatchers
  const handleUpdateOrderStatus = (orderId: string, status: DeliveryStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          deliveryStatus: status,
          // Automate payment status if delivered and cash
          paymentStatus: (status === 'delivered') ? 'completed' as PaymentStatus : o.paymentStatus
        };
      }
      return o;
    });
    setOrders(updated);
    alert(`Updated order #${orderId} status to: ${status.toUpperCase()}`);
  };

  const handleAssignRider = (orderId: string, riderName: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          riderId: `rider-${Math.floor(10 + Math.random() * 90)}`,
          riderName: riderName,
        };
      }
      return o;
    });
    setOrders(updated);
    alert(`Assigned order #${orderId} to rider: ${riderName}`);
  };

  const currentRestForMenu = restaurants.find(r => r.id === selectedRestId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn" id="admin-view-container">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-sans text-xl font-bold">
            ⚔️
          </div>
          <div>
            <h1 className="text-2xl font-sans font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>Admin Control Room</span>
              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-sans font-bold">Store Director</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Edit store directory partners, dishes, list menus, and process real-time customer deliveries</p>
          </div>
        </div>

        {/* Multi-role tip banner */}
        <div className="bg-gray-100 p-2.5 rounded-xl text-[10px] text-gray-500 max-w-sm font-sans line-clamp-2">
          💡 <strong>Centralized Local DB:</strong> Placed orders instantly show up under "Active Orders Queue". Updating status or assigning riders here changes the live state in the <strong>Rider Dashboard</strong> as well!
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex gap-2 border-b border-gray-250 pb-0.5 max-w-md" id="admin-subtabs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 text-center py-2.5 text-xs font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-red-600 text-red-600 font-extrabold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Active Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex-1 text-center py-2.5 text-xs font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
            activeTab === 'restaurants'
              ? 'border-red-600 text-red-600 font-extrabold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Manage Outlets
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 text-center py-2.5 text-xs font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
            activeTab === 'menu'
              ? 'border-red-600 text-red-600 font-extrabold'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Menu Modifiers
        </button>
      </div>

      {/* A. ACTIVE ORDERS QUEUE VIEW */}
      {activeTab === 'orders' && (
        <div className="space-y-6" id="admin-orders-tab">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-100 rounded-3xl">
              <ShoppingCart className="mx-auto text-gray-300" size={32} />
              <h3 className="text-sm font-bold text-gray-700 mt-3">No active orders available currently</h3>
              <p className="text-xs text-gray-400 mt-1">When customers submit checkout orders, they list here in real-time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6" id="admin-orders-grid">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs flex flex-col lg:flex-row gap-6 justify-between">
                  {/* Customer info & items */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black font-mono bg-gray-900 text-white px-2.5 py-1 rounded-lg">
                        #{ord.id}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        {new Date(ord.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        ord.paymentStatus === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Payment: {ord.paymentStatus.toUpperCase()} ({ord.paymentMethod})
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-black text-gray-900 flex items-center gap-1">
                        👤 Customer: {ord.customerName} <span className="text-gray-400">({ord.customerPhone})</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        📍 Destination: {ord.customerAddress}
                      </p>
                      {ord.notes && <p className="text-[10px] italic text-amber-700">📝 Notes: "{ord.notes}"</p>}
                    </div>

                    {/* Food Items array */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1 text-xs">
                      <span className="text-[10px] uppercase font-black tracking-wider text-gray-400 block pb-1 border-b border-gray-200/50">Dishes Ordered</span>
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between font-medium">
                          <span>{item.foodItem.name} × {item.quantity}</span>
                          <span className="font-mono text-gray-400">NRs. {item.foodItem.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200/50 pt-1 flex justify-between font-bold text-red-600">
                        <span>Grand Total Charged</span>
                        <span>NRs. {ord.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational States side */}
                  <div className="lg:w-80 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 space-y-4">
                    
                    {/* Delivery Status Selector */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 pl-0.5 block">Delivery Status</span>
                      <div className="grid grid-cols-2 gap-1 text-[10px] font-bold uppercase">
                        <button
                          onClick={() => handleUpdateOrderStatus(ord.id, 'pending')}
                          className={`p-1.5 rounded-lg border text-center transition-colors ${
                            ord.deliveryStatus === 'pending'
                              ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(ord.id, 'preparing')}
                          className={`p-1.5 rounded-lg border text-center transition-colors ${
                            ord.deliveryStatus === 'preparing'
                              ? 'bg-orange-50 border-orange-500 text-orange-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          Preparing
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(ord.id, 'out_for_delivery')}
                          className={`p-1.5 rounded-lg border text-center transition-colors ${
                            ord.deliveryStatus === 'out_for_delivery'
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          On Delivery
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(ord.id, 'delivered')}
                          className={`p-1.5 rounded-lg border text-center transition-colors ${
                            ord.deliveryStatus === 'delivered'
                              ? 'bg-green-50 border-green-500 text-green-700 font-black'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          Delivered ✓
                        </button>
                      </div>
                    </div>

                    {/* Rider Assign select */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 pl-0.5 block">Assign Dispatcher Rider</span>
                      {ord.riderName ? (
                        <div className="bg-green-55/40 bg-green-50 border border-green-600/10 p-2 rounded-xl flex justify-between items-center text-xs">
                          <span className="font-bold text-green-700">🛵 {ord.riderName}</span>
                          <select
                            onChange={(e) => handleAssignRider(ord.id, e.target.value)}
                            className="bg-white text-[10px] p-1 border rounded"
                            defaultValue=""
                          >
                            <option value="" disabled>Reassign...</option>
                            {ridersList.map((r, i) => (
                              <option key={i} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <select
                          onChange={(e) => handleAssignRider(ord.id, e.target.value)}
                          className="w-full text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                          defaultValue=""
                        >
                          <option value="" disabled>-- Assign Delivery Rider --</option>
                          {ridersList.map((r, idx) => (
                            <option key={idx} value={r}>{r}</option>
                          ))}
                        </select>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* B. OUTLETS / RESTAURANTS MANAGER */}
      {activeTab === 'restaurants' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="admin-restaurants-tab">
          {/* Add Restaurant Form */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4 self-start">
            <h3 className="font-extrabold text-sm text-gray-900 uppercase border-b border-gray-50 pb-2 tracking-wide">
              Partner Hub Registration
            </h3>

            <form onSubmit={handleAddRestaurant} className="space-y-4 block">
              <div className="space-y-1 font-sans">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">Outlet Brand Name</span>
                <input
                  type="text"
                  required
                  value={newRestName}
                  onChange={(e) => setNewRestName(e.target.value)}
                  placeholder="E.g., Momo Station Lalitpur"
                  className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1 font-sans">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">Cuisine Specialties</span>
                <input
                  type="text"
                  required
                  value={newRestType}
                  onChange={(e) => setNewRestType(e.target.value)}
                  placeholder="E.g., Fast Food, Momo, Nepalese"
                  className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1 font-sans">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">Specific City Address</span>
                <input
                  type="text"
                  required
                  value={newRestAddress}
                  onChange={(e) => setNewRestAddress(e.target.value)}
                  placeholder="E.g., Kupondole, Lalitpur"
                  className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prep Time (Min)</span>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newRestTime}
                    onChange={(e) => setNewRestTime(Number(e.target.value))}
                    className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none"
                  />
                </div>
                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Budget tier</span>
                  <select
                    value={newRestPrice}
                    onChange={(e) => setNewRestPrice(e.target.value as any)}
                    className="w-full text-xs text-gray-750 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none"
                  >
                    <option value="$">$ (Budgets)</option>
                    <option value="$$">$$ (Standard)</option>
                    <option value="$$$">$$$ (Premium)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold font-sans tracking-wide shadow-md cursor-pointer"
              >
                Register Partner Brand
              </button>
            </form>
          </div>

          {/* Existing Store Listings */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 uppercase border-b border-gray-50 pb-2">
              Active Registered Partners ({restaurants.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="admin-outlets-list font-sans">
              {restaurants.map((rest) => (
                <div key={rest.id} className="bg-white border border-gray-250 p-4 rounded-2xl flex justify-between items-center shadow-xs">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900">{rest.name}</h4>
                    <span className="text-[11px] text-gray-400 block line-clamp-1">{rest.foodType}</span>
                    <span className="text-[10px] text-gray-500 font-mono block mt-1">📍 {rest.address}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveRestaurant(rest.id, rest.name)}
                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-gray-50 border rounded-xl"
                    title="Remove Outlet"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* C. FOOD MENU MODIFIERS */}
      {activeTab === 'menu' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs text-gray-700" id="admin-menu-tab">
          {/* Outlet picker & Food creation */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4 self-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">1. Select Partner Outlet</span>
              <select
                value={selectedRestId}
                onChange={(e) => setSelectedRestId(e.target.value)}
                className="w-full text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none"
              >
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-50 pt-3">
              <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-widest pb-3">2. Insert Food Item</h3>
              
              <form onSubmit={handleAddItemToMenu} className="space-y-4 font-sans block">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">Dish Name</span>
                  <input
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="E.g., Tangy Schezwan Momo"
                    className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-201 outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Price (NRs.)</span>
                    <input
                      type="number"
                      required
                      min={10}
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(Number(e.target.value))}
                      className="w-full text-xs text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Category</span>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as any)}
                      className="w-full text-xs text-gray-750 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none"
                    >
                      <option value="snacks">Snacks</option>
                      <option value="maincourse">Main Course</option>
                      <option value="drinks">Drinks</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Short Description</span>
                  <textarea
                    rows={3}
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Taste details, ingredients, vegetarian guidelines..."
                    className="w-full text-xs text-gray-850 bg-gray-50 p-2.5 rounded-xl border border-gray-200 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-center py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold font-sans tracking-wide shadow-md cursor-pointer"
                >
                  Insert Food Dish Listing
                </button>
              </form>
            </div>
          </div>

          {/* Current menu listing */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold text-sm text-gray-900 uppercase border-b border-gray-50 pb-2">
              Listed Menu Items for: <strong className="text-red-600">{currentRestForMenu?.name || 'Selected Brand'}</strong>
            </h3>

            {currentRestForMenu && currentRestForMenu.menu.length === 0 ? (
              <div className="py-12 bg-gray-50 text-center border border-dashed rounded-2xl text-gray-400">
                <span>👨‍🍳</span>
                <p className="text-xs font-bold mt-2">This outlet has no items listed yet. Use form on the left!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentRestForMenu?.menu.map((dish) => (
                  <div key={dish.id} className="bg-white border border-gray-255 p-3.5 rounded-2xl flex justify-between gap-3 shadow-xs">
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs text-gray-900">{dish.name}</h4>
                      <span className="text-[10px] uppercase font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                        {dish.category}
                      </span>
                      <p className="text-[10px] text-gray-400 font-mono font-bold mt-1">Cost: NRs. {dish.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItemFromMenu(selectedRestId, dish.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 border border-transparent hover:border-gray-100 hover:bg-gray-50 rounded-xl max-h-fit"
                      title="Remove dish"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
