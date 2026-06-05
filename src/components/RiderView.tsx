import { useState, useMemo } from 'react';
import { Order, DeliveryStatus, AppView } from '../types';
import { Truck, MapPin, Phone, Coins, Star, Map, ShieldCheck, CheckSquare, Compass } from 'lucide-react';

interface RiderViewProps {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  setView: (view: AppView) => void;
}

export default function RiderView({
  orders,
  setOrders,
  setView,
}: RiderViewProps) {
  const [selectedRiderName] = useState('Rider Madan Shrestha');

  // Filter orders specifically assigned to this rider or unassigned so rider can "Self-Claim" them!
  const riderOrders = useMemo(() => {
    return orders.filter(o => o.riderName === selectedRiderName || !o.riderName);
  }, [orders, selectedRiderName]);

  const stats = useMemo(() => {
    const assigned = orders.filter(o => o.riderName === selectedRiderName);
    const completed = assigned.filter(o => o.deliveryStatus === 'delivered');
    const earnings = completed.length * 150; // Each delivery commissions NRs. 150 in Nepal!
    return {
      totalAssigned: assigned.length,
      totalCompleted: completed.length,
      earnings: earnings,
      rating: 4.9,
    };
  }, [orders, selectedRiderName]);

  const handleUpdateStatus = (orderId: string, nextStatus: DeliveryStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          deliveryStatus: nextStatus,
          paymentStatus: nextStatus === 'delivered' ? 'completed' : o.paymentStatus
        };
      }
      return o;
    });
    setOrders(updated);
    alert(`Success: Order #${orderId} marked as ${nextStatus.replace(/_/g, ' ').toUpperCase()}`);
  };

  const handleSelfClaim = (orderId: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          riderId: 'rider-madan-101',
          riderName: selectedRiderName,
          deliveryStatus: 'preparing' as DeliveryStatus // moves to preparing immediately
        };
      }
      return o;
    });
    setOrders(updated);
    alert(`Success: You claimed order #${orderId}! Prepare to pick up`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn" id="rider-view-container text-xs text-gray-700">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-sans text-xl font-bold">
            🛵
          </div>
          <div>
            <h1 className="text-2xl font-sans font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>Rider Courier Dashboard</span>
              <span className="text-[10px] bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full font-bold">Active Driver Team</span>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Assigned delivery routes, pickup triggers, and professional earnings log</p>
          </div>
        </div>

        <div className="bg-gray-100 p-2 border border-gray-200 rounded-xl text-[10px] text-gray-500 max-w-sm line-clamp-2">
          🧑‍✈️ logged in as: <strong>{selectedRiderName}</strong> (Vetted Zone: Lalitpur, Baneshwor, Kathmandu sector).
        </div>
      </div>

      {/* 1. Rider Earnings and Statistics Card widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
        
        {/* Earnings */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 text-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-100">Carrier Earnings</span>
            <span className="text-2xl font-black block font-mono">NRs. {stats.earnings}</span>
            <span className="text-[10px] text-emerald-55 font-semibold text-emerald-100">NRs. 150 per delivered box</span>
          </div>
          <Coins size={32} className="opacity-25" />
        </div>

        {/* Deliveries Count */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Box Delivered</span>
            <span className="text-2xl font-black block text-gray-900 font-mono">{stats.totalCompleted} Completed</span>
            <span className="text-[10px] text-gray-400 block font-semibold">Active target list: {stats.totalAssigned - stats.totalCompleted} ongoing</span>
          </div>
          <CheckSquare size={32} className="text-gray-200" />
        </div>

        {/* Driver Rating */}
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Vetted Rating</span>
            <span className="text-2xl font-black block text-gray-900 font-mono">{stats.rating} / 5.0</span>
            <span className="text-[10px] text-green-600 block font-bold">✓ Platinum Delivery Medal</span>
          </div>
          <Star size={32} className="text-amber-400 fill-amber-100" />
        </div>

        {/* Fast Action portals */}
        <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-md space-y-2">
          <h4 className="font-bold text-[11px] uppercase tracking-wider text-gray-300">Carrier Checklist</h4>
          <p className="text-[10px] text-gray-400 leading-snug">Keep customer food heated in insulated courier box. Ring bell safely at landmarks.</p>
          <button
            onClick={() => setView('restaurants')}
            className="text-[10px] font-bold text-orange-400 underline block cursor-pointer"
          >
            Explore client customer view
          </button>
        </div>

      </section>

      {/* 2. Main list layout split: assigned orders list vs optimized street map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: designated orders queue */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-gray-100 pb-3 flex justify-between items-center bg-orange-50/50 p-2 rounded-xl">
            <span className="text-xs font-extrabold text-orange-800 flex items-center gap-1.5 uppercase">
              <Truck size={14} /> Assigned Duty Operations
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-xs">
              Madan's Carrier Route
            </span>
          </div>

          {riderOrders.length === 0 ? (
            <div className="py-16 text-center bg-gray-50 border border-dashed rounded-3xl" id="rider-empty-queue">
              <span className="text-4xl block">🏍️</span>
              <h3 className="text-sm font-bold text-gray-700 mt-3">You completed all duties today!</h3>
              <p className="text-xs text-gray-400 mt-1">Great job, Madan. Grab a sweet hot masala tea and check back later for new shipments.</p>
            </div>
          ) : (
            <div className="space-y-6" id="rider-assigned-duty-list">
              {riderOrders.map((ord) => {
                const isClaimedByMe = ord.riderName === selectedRiderName;
                return (
                  <div key={ord.id} className="bg-white border border-gray-255 rounded-2xl p-5 space-y-4 shadow-xs relative">
                    
                    {/* Header tags */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black font-mono bg-orange-600 text-white px-2 py-0.5 rounded">
                          Order #{ord.id}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          ord.deliveryStatus === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-105 bg-yellow-100 text-yellow-750'
                        }`}>
                          Status: {ord.deliveryStatus.toUpperCase()}
                        </span>
                      </div>
                      
                      {!isClaimedByMe ? (
                        <button
                          onClick={() => handleSelfClaim(ord.id)}
                          className="bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-xs transition-transform tracking-wider active:scale-95 cursor-pointer"
                        >
                          Self-Claim Order Duty
                        </button>
                      ) : (
                        <span className="text-[10px] text-green-600 font-extrabold flex items-center gap-1">
                          <ShieldCheck size={11} /> ASSIGNED TO YOU (Madan)
                        </span>
                      )}
                    </div>

                    {/* Customer & Address Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">Destination Client</span>
                        <p className="font-bold text-gray-900">{ord.customerName}</p>
                        <p className="text-[11px] text-gray-500 font-medium">📍 {ord.customerAddress}</p>
                        <p className="text-[11px] text-red-500 font-semibold">{ord.customerPhone}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-0.5">Package Details</span>
                        <div className="bg-gray-50 p-2 rounded-xl text-[11px] leading-tight text-gray-600 max-h-24 overflow-y-auto font-sans">
                          {ord.items.map((item, i) => (
                            <p key={i} className="truncate">✓ {item.foodItem.name} ({item.quantity} portions)</p>
                          ))}
                        </div>
                        <p className="text-xs font-black text-gray-900 mt-1">To Collect: <span className="font-mono text-red-650 text-red-600">NRs. {ord.totalPrice}</span></p>
                      </div>
                    </div>

                    {/* Duty Action Toggles - ONLY show if claimed */}
                    {isClaimedByMe && ord.deliveryStatus !== 'delivered' && (
                      <div className="flex gap-2.5 pt-3 border-t border-gray-150">
                        {ord.deliveryStatus === 'pending' || ord.deliveryStatus === 'preparing' ? (
                          <button
                            onClick={() => handleUpdateStatus(ord.id, 'out_for_delivery')}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold py-2.5 rounded-xl shadow-xs transition-all text-center cursor-pointer"
                          >
                            Mark "Picked Up from Kitchen"
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(ord.id, 'delivered')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-sans text-xs font-black py-2.5 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck size={13} />
                            <span>Confirm Delivery to Customer</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column: optimal route simulation map */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-gray-255 rounded-3xl p-5 space-y-4 shadow-xs" id="rider-route-map">
            <h3 className="font-extrabold text-xs uppercase tracking-widest text-gray-400 pl-0.5 block flex items-center gap-1">
              <Compass size={14} className="text-orange-600 shrink-0" />
              <span>Simulated Optimal Route Navigator</span>
            </h3>

            {/* Simulated Vector Route Graphic */}
            <div className="relative aspect-video bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center border">
              <svg className="w-full h-full" viewBox="0 0 240 120">
                {/* Streets contour background patterns */}
                <line x1="30" y1="0" x2="30" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="120" y1="0" x2="120" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="210" y1="0" x2="210" y2="120" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="0" y1="60" x2="240" y2="60" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />

                {/* Simulated delivery path */}
                <path d="M40 30 L110 30 L110 82" fill="none" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />

                {/* Kitchen Node */}
                <circle cx="40" cy="30" r="5" fill="#ef4444" />
                <text x="50" y="33" className="text-[7px] font-black fill-red-600">Dalle Restaurant</text>

                {/* Rider cycle */}
                <g className="animate-bounce">
                  <circle cx="85" cy="30" r="3" fill="#ea580c" />
                </g>
                <text x="75" y="22" className="text-[6px] font-sans font-bold fill-orange-700">Madan's Scooter</text>

                {/* Client Node */}
                <g>
                  <circle cx="110" cy="82" r="5" fill="#22c55e" />
                  <text x="118" y="85" className="text-[7px] font-black fill-green-700">Customer Location</text>
                </g>
              </svg>
              <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-md text-[8px] text-white px-2 py-0.5 rounded font-mono uppercase">
                Active Tracking: Lazimpat sector
              </div>
            </div>

            <div className="space-y-2 text-xs text-xs text-gray-500">
              <div className="flex justify-between font-bold border-b pb-1.5 text-gray-900">
                <span>Optimized Transit ETA</span>
                <span>12 Minutes (8.4 km total)</span>
              </div>
              <p className="leading-relaxed text-[11px] text-gray-400">
                ℹ️ Automated path avoids Baneshwor triangle traffic jam, cutting down delivery response threshold. Hold food warm tags.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
