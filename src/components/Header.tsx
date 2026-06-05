import { ShoppingBag, User, Shield, Truck, Info, Phone, LogOut, Grid } from 'lucide-react';
import { AppView, User as UserType } from '../types';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  cartCount: number;
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  setPreviousView: (view: AppView) => void;
}

export default function Header({
  currentView,
  setView,
  cartCount,
  currentUser,
  setCurrentUser,
  setPreviousView,
}: HeaderProps) {
  const handleNavClick = (view: AppView) => {
    setPreviousView(currentView);
    setView(view);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm" id="main-header">
      {/* Top Banner - Simulating Nepalese Food Hub Accents */}
      <div className="bg-red-600 text-white text-xs py-1.5 px-4 font-sans flex justify-between items-center">
        <span className="font-medium">🏔️ Food Hub Nepal - Delivering happiness across Kathmandu, Patan & Lalitpur!</span>
        <div className="hidden md:flex gap-4">
          <span className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => handleNavClick('about')}>
            <Info size={12} /> About
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => handleNavClick('contact')}>
            <Phone size={12} /> Contact Us: 01-4455667
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')} id="header-logo">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center shadow-md shadow-red-200">
              <span className="text-white font-black text-lg tracking-tight">F</span>
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-gray-900 block leading-none">
                FOOD<span className="text-red-600">HUB</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mt-0.5 font-bold">
                NEPAL
              </span>
            </div>
          </div>

          {/* Center Navigation - Standard Customer Page Routes */}
          <nav className="hidden lg:flex space-x-1" id="nav-desktop">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' 
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('restaurants')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'restaurants' || currentView === 'menu'
                  ? 'bg-red-50 text-red-600' 
                  : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'about'
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'contact'
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
              }`}
            >
              Support
            </button>
          </nav>

          {/* Right Area - Cart, Portals, and Auth */}
          <div className="flex items-center gap-2" id="header-right-interactions">
            {/* Quick Portal Switchers to easily find requested panels */}
            <div className="flex gap-1 mr-2 p-1 bg-gray-100 rounded-full text-xs">
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                  currentView === 'admin' 
                    ? 'bg-gray-800 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Admin Panel"
              >
                <Shield size={13} />
                <span className="hidden md:inline">Admin</span>
              </button>
              <button
                onClick={() => handleNavClick('rider')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-medium transition-all ${
                  currentView === 'rider'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Rider Dashboard"
              >
                <Truck size={13} />
                <span className="hidden md:inline">Rider</span>
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className={`relative p-2 rounded-full border transition-all duration-200 ${
                currentView === 'cart'
                  ? 'border-red-500 bg-red-50 text-red-600 shadow-sm'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              id="cart-trigger-btn"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-semibold text-gray-800 line-clamp-1">{currentUser.name}</span>
                  <span className="text-[9px] uppercase tracking-wider font-mono text-gray-500 font-bold">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all shadow-md shadow-red-200 cursor-pointer"
                id="login-trigger-btn"
              >
                <User size={14} />
                <span>Join Us</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
