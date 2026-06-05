import { HeartHandshake, ShieldCheck, Target, Award, Eye, Truck } from 'lucide-react';
import { AppView } from '../types';

interface AboutViewProps {
  setView: (view: AppView) => void;
}

export default function AboutView({ setView }: AboutViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn font-sans" id="about-view-container">
      
      {/* 1. Header Hero block */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase font-bold tracking-widest text-red-650 bg-red-100/60 px-3 py-1 rounded-full text-red-600 font-sans">
          Who We Are
        </span>
        <h1 className="text-4xl font-sans font-black text-gray-900 tracking-tight leading-tight">
          Pioneering Authentic Culinary Delivery Across Nepal
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Founded in Kathmandu with a simple dream: to bring Nepal's rich culinary inheritance—from local wood-fried sekuwas to crispy kothay momos—directly into the comfort of modern working offices and homes.
        </p>
      </section>

      {/* 2. Visual Collage or Stats Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-red-600 text-white p-8 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none select-none text-[300px] leading-none">
          🏔️
        </div>
        <div className="text-center space-y-2 relative z-10 p-4 border-b md:border-b-0 md:border-r border-white/10">
          <span className="text-4xl font-black font-sans tracking-tight block">50+</span>
          <span className="text-xs font-semibold text-red-50 uppercase tracking-wider block">Prepped Partners</span>
        </div>
        <div className="text-center space-y-2 relative z-10 p-4 border-b md:border-b-0 md:border-r border-white/10">
          <span className="text-4xl font-black font-sans tracking-tight block">15 min</span>
          <span className="text-xs font-semibold text-red-50 uppercase tracking-wider block">Average Delivery Target</span>
        </div>
        <div className="text-center space-y-2 relative z-10 p-4">
          <span className="text-4xl font-black font-sans tracking-tight block">NRs. 0</span>
          <span className="text-xs font-semibold text-red-50 uppercase tracking-wider block">Hidden Charges Applied</span>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission card */}
        <div className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shadow-xs">
            <Target size={24} />
          </div>
          <h3 className="font-sans font-black text-lg text-gray-900">Our Shared Mission</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            To empower local restaurant chains and boutique home-grown bakers in Kathmandu by offering them state-of-the-art virtual kitchens, professional delivery rider management tools, and access to hundreds of culinary searchers daily.
          </p>
        </div>

        {/* Vision card */}
        <div className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
            <Eye size={24} />
          </div>
          <h3 className="font-sans font-black text-lg text-gray-900">The Vision</h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Building Nepal’s safest, most environment-respecting, and most efficient food technology platform. We envision expanding beyond Kathmandu Valley to include Pokhara, Chitwan, Biratnagar, and beyond by 2028.
          </p>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-sans font-black text-gray-900 tracking-tight">
            Why Choose Food Hub Nepal?
          </h2>
          <p className="text-xs text-text-gray-500">
            We go several miles extra to guarantee your meals arrive pure and piping hot
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Award size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Vetted Hygienic Standard</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every restaurant receives regular unannounced health inspections by our expert culinary auditors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <HeartHandshake size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Supporting organic</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              We prioritizes partners utilizing organic Marpha valley potatoes and local mustard oils.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <Truck size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Pulsating deliver speed</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Self-correcting automatic driver dispatch route coordinates allow saving up to 10 minutes on transit time!
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Safe wallet refund</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Immediate refund triggers to your selected eSewa or Khalti details in case order is cancelled.
            </p>
          </div>
        </div>
      </section>

      {/* Footer action */}
      <section className="bg-gray-900 text-white text-center rounded-3xl p-10 space-y-4">
        <h3 className="font-sans font-black text-xl">Ready to taste authentic Nepalese food?</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">We are ready to deliver deliciousness right to your coordinates instantly.</p>
        <button
          onClick={() => setView('restaurants')}
          className="px-6 py-3 rounded-xl bg-red-650 bg-red-600 hover:bg-red-700 text-xs font-bold font-sans tracking-wide shadow-md cursor-pointer"
        >
          View Live Restaurants List
        </button>
      </section>

    </div>
  );
}
