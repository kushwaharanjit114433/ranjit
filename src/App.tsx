import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import RestaurantsView from './components/RestaurantsView';
import MenuView from './components/MenuView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import AuthView from './components/AuthView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import AdminView from './components/AdminView';
import RiderView from './components/RiderView';

import { AppView, Restaurant, FoodItem, CartItem, Order, User } from './types';
import { getRestaurants, saveRestaurants, getOrders, saveOrders } from './data';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [previousView, setPreviousView] = useState<AppView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>('rest-1');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // States backed by LocalStorage persistent cache
  const [restaurants, setRestaurantsState] = useState<Restaurant[]>([]);
  const [orders, setOrdersState] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Initial hydration from simulated DB
  useEffect(() => {
    setRestaurantsState(getRestaurants());
    setOrdersState(getOrders());

    // Hydrate guest customer user state if needed
    const defaultUser: User = {
      id: 'usr-12',
      name: 'Ranjit Kushwaha',
      email: 'guest@foodhub.com.np',
      phone: '9841234567',
      role: 'customer'
    };
    setCurrentUser(defaultUser);
  }, []);

  // Update methods that sync with localStorage
  const handleSetRestaurants = (newRests: Restaurant[]) => {
    setRestaurantsState(newRests);
    saveRestaurants(newRests);
  };

  const handleSetOrders = (newOrders: Order[]) => {
    setOrdersState(newOrders);
    saveOrders(newOrders);
  };

  // 2. Shopping Cart Operations
  const handleAddToCart = (food: FoodItem, qty: number) => {
    if (!selectedRestaurantId) return;
    const preparingPartner = restaurants.find(r => r.id === selectedRestaurantId);
    if (!preparingPartner) return;

    setCart(prev => {
      // Find index
      const existingIdx = prev.findIndex(item => item.foodItem.id === food.id);
      
      // If order is from a different restaurant - reset and add fresh
      if (prev.length > 0 && prev[0].restaurantId !== selectedRestaurantId) {
        alert(`Your cart had items from "${prev[0].restaurantName}". Starting fresh order with "${preparingPartner.name}"!`);
        return [{
          foodItem: food,
          quantity: qty,
          restaurantId: selectedRestaurantId,
          restaurantName: preparingPartner.name,
        }];
      }

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      } else {
        return [...prev, {
          foodItem: food,
          quantity: qty,
          restaurantId: selectedRestaurantId,
          restaurantName: preparingPartner.name,
        }];
      }
    });
  };

  const handleUpdateCartQuantity = (index: number, qty: number) => {
    setCart(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index].quantity = qty;
      }
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 3. New Order Placement
  const handlePlaceOrder = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    handleSetOrders(updated);
  };

  // Find the selected restaurant instance for MenuView
  const selectedRestaurant = restaurants.find(r => r.id === selectedRestaurantId) || null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-800" id="app-root-container">
      {/* Header component */}
      <Header
        currentView={view}
        setView={setView}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setPreviousView={setPreviousView}
      />

      {/* Main viewport area */}
      <main className="flex-1" id="main-view-outlet">
        {view === 'home' && (
          <HomeView
            restaurants={restaurants}
            setView={setView}
            setSearchQuery={setSearchQuery}
            setSelectedRestaurantId={setSelectedRestaurantId}
          />
        )}

        {view === 'restaurants' && (
          <RestaurantsView
            restaurants={restaurants}
            setView={setView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedRestaurantId={setSelectedRestaurantId}
          />
        )}

        {view === 'menu' && (
          <MenuView
            restaurant={selectedRestaurant}
            setView={setView}
            onAddToCart={handleAddToCart}
            cart={cart}
          />
        )}

        {view === 'cart' && (
          <CartView
            cart={cart}
            setView={setView}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
          />
        )}

        {view === 'checkout' && (
          <CheckoutView
            cart={cart}
            setView={setView}
            onClearCart={handleClearCart}
            currentUser={currentUser}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === 'login' && (
          <AuthView
            setView={setView}
            setCurrentUser={setCurrentUser}
            previousView={previousView}
          />
        )}

        {view === 'about' && (
          <AboutView
            setView={setView}
          />
        )}

        {view === 'contact' && (
          <ContactView />
        )}

        {view === 'admin' && (
          <AdminView
            restaurants={restaurants}
            setRestaurants={handleSetRestaurants}
            orders={orders}
            setOrders={handleSetOrders}
          />
        )}

        {view === 'rider' && (
          <RiderView
            orders={orders}
            setOrders={handleSetOrders}
            setView={setView}
          />
        )}
      </main>

      {/* Footer component */}
      <Footer setView={setView} />
    </div>
  );
}
