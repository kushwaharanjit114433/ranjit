import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  setView: (view: AppView) => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white mt-auto pt-16 pb-8" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white font-black text-lg">F</span>
            </div>
            <div>
              <span className="font-sans font-extrabold text-xl tracking-tight text-white block leading-none">
                FOOD<span className="text-red-500">HUB</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mt-0.5">
                NEPAL
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Delivering authentic local tastes, fast foods, and sweet delights right to your doorstep. The ultimate Nepalese multi-role food network.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4 border-l-2 border-red-500 pl-2">
            Quick Navigation
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <button onClick={() => setView('home')} className="hover:text-red-500 transition-colors cursor-pointer">
                Home / Explorer
              </button>
            </li>
            <li>
              <button onClick={() => setView('restaurants')} className="hover:text-red-500 transition-colors cursor-pointer">
                Featured Restaurants
              </button>
            </li>
            <li>
              <button onClick={() => setView('about')} className="hover:text-red-500 transition-colors cursor-pointer">
                Our Mission & Vision
              </button>
            </li>
            <li>
              <button onClick={() => setView('contact')} className="hover:text-red-500 transition-colors cursor-pointer">
                Support & Map Location
              </button>
            </li>
          </ul>
        </div>

        {/* Workplaces / Interfaces */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4 border-l-2 border-red-500 pl-2">
            Workspace Hub
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li>
              <button onClick={() => setView('admin')} className="hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1.5">
                💼 Store Management Portal
              </button>
            </li>
            <li>
              <button onClick={() => setView('rider')} className="hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1.5">
                🛵 Delivery Rider Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setView('login')} className="hover:text-red-500 transition-colors cursor-pointer">
                🔑 Interactive Authenticator
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4 border-l-2 border-red-500 pl-2">
            Official Contact
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>New Baneshwor Triangle, Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-red-500 shrink-0" />
              <span>01-4455667, +977 9841234567</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-red-500 shrink-0" />
              <span>support@foodhubnepal.com.np</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <span>© 2026 Food Hub Nepal Pvt. Ltd. All rights reserved. Registered in Nepal.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
