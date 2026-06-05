import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, KeyRound, TicketPercent, Lock } from 'lucide-react';
import { CartItem, AppView } from '../types';
import { useState } from 'react';

interface CartViewProps {
  cart: CartItem[];
  setView: (view: AppView) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export default function CartView({
  cart,
  setView,
  onUpdateQuantity,
  onRemoveItem,
}: CartViewProps) {
  const [promoInput, setPromoInput] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Calculate prices
  const itemsSubtotal = (cart || []).reduce((acc, curr) => acc + (curr.foodItem.price * curr.quantity), 0);
  const deliveryFee = itemsSubtotal > 500 ? 0 : 80; // FREE above 500 NRs
  const tax = Math.round(itemsSubtotal * 0.13); // 13% standard VAT in Nepal
  const discountAmount = activeCoupon ? Math.round(itemsSubtotal * activeCoupon.discount) : 0;
  const grandTotal = itemsSubtotal - discountAmount + deliveryFee + tax;

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = promoInput.trim().toUpperCase();
    
    if (code === 'FREEPATAN') {
      if (itemsSubtotal >= 500) {
        setActiveCoupon({ code: 'FREEPATAN', discount: 0.05 }); // 5% additional off
        alert('Coupon Success: FREEPATAN applied. 5% off + Free Delivery!');
      } else {
        setCouponError('Minimum order NRs. 500 is required for this coupon.');
      }
    } else if (code === 'ESEWA10') {
      setActiveCoupon({ code: 'ESEWA10', discount: 0.10 }); // 10% off
      alert('Coupon Success: ESEWA10 applied. 10% discount subtracted!');
    } else if (code === 'KHALTIPIZZA') {
      setActiveCoupon({ code: 'KHALTIPIZZA', discount: 0.12 }); // 12% off
      alert('Coupon Success: KHALTIPIZZA applied!');
    } else {
      setCouponError('Invalid coupon code. Try FREEPATAN or ESEWA10.');
    }
    setPromoInput('');
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center" id="cart-empty-state">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={36} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-sans font-black text-gray-800 tracking-tight">Your food cart is completely empty</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          Add fresh Newari bara, steamed momos, or sizzling sekuwas to kickstart your stomach!
        </p>
        <button
          onClick={() => setView('restaurants')}
          className="mt-8 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-black transition-colors shadow-md shadow-red-200 cursor-pointer"
        >
          Browse Menus Now
        </button>
      </div>
    );
  }

  // Group items by restaurant to present elegantly
  const restaurantName = cart[0]?.restaurantName || 'Selected Kitchen';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn" id="cart-view-container">
      {/* Title */}
      <div>
        <button
          onClick={() => setView('restaurants')}
          className="inline-flex items-center gap-1.5 text-xs text-red-600 font-bold hover:underline mb-2 cursor-pointer"
        >
          <ArrowLeft size={13} /> Add more food
        </button>
        <h1 className="text-3xl font-sans font-black text-gray-900 tracking-tight">Food Bag Summary</h1>
        <p className="text-xs text-gray-500 mt-1">Review your selections below before proceeding to payment checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="cart-content-layout">
        {/* Left Side: Cart items - Grouped by restaurant */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="border-b border-gray-50 pb-3 flex justify-between items-center bg-red-50/50 p-2 rounded-xl">
              <span className="text-xs text-red-700 font-extrabold font-sans">
                🏪 Preparing Partner: {restaurantName}
              </span>
              <span className="text-[10px] font-mono font-bold bg-white text-gray-500 px-2.5 py-1 border border-gray-100 rounded-lg">
                City Delivery Vetted
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {cart.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 first:pt-2 last:pb-2">
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.foodItem.image}
                      alt={item.foodItem.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">{item.foodItem.name}</h4>
                        <p className="text-[10px] text-gray-400 capitalize">{item.foodItem.category}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-700 shrink-0">
                        NRs. {item.foodItem.price * item.quantity}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Plus/minus updating quantity */}
                      <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500 cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500 cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Remove trash trigger */}
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt banner for Loyalty */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-xs text-amber-800 leading-relaxed">
            🌿 <strong>Did you know?</strong> We use biodegradable bowls & banana leaf wraps for Newari Bara! Help preserve beautiful Kathmandu valley environment with sustainable delivery.
          </div>
        </div>

        {/* Right Side: Order Bill & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-md space-y-5">
            <h3 className="font-extrabold font-sans text-sm tracking-wide text-gray-200 uppercase border-b border-gray-800 pb-3">
              Order Bill Card
            </h3>

            {/* Calculations lines */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Food Items Cost</span>
                <span className="font-mono font-bold">NRs. {itemsSubtotal}</span>
              </div>
              
              {activeCoupon && (
                <div className="flex justify-between text-green-400">
                  <span className="flex items-center gap-1">
                    <TicketPercent size={13} /> Promo ({activeCoupon.code})
                  </span>
                  <span className="font-mono font-bold">- NRs. {discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400">
                <span>Rider Delivery Fee</span>
                <span className="font-mono font-bold">
                  {deliveryFee === 0 ? <span className="text-green-400 uppercase font-sans font-extrabold">FREE</span> : `NRs. ${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>13% Government VAT</span>
                <span className="font-mono font-bold">NRs. {tax}</span>
              </div>

              <div className="border-t border-gray-800 pt-4 flex justify-between items-end font-sans">
                <span className="text-sm font-semibold tracking-wide">Grand Total</span>
                <span className="text-lg font-black text-amber-300 font-mono">NRs. {grandTotal}</span>
              </div>
            </div>

            {/* Promo Code Input section inside summary card */}
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">Promo Voucher Code</span>
              
              {activeCoupon ? (
                <div className="bg-gray-800 p-2.5 rounded-xl flex items-center justify-between text-xs text-green-400 border border-green-500/25">
                  <span className="font-semibold">{activeCoupon.code} Applied</span>
                  <button onClick={handleRemoveCoupon} className="text-white hover:text-red-400 font-extrabold cursor-pointer">×</button>
                </div>
              ) : (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Try FREEPATAN"
                    className="flex-1 bg-gray-800 text-xs px-2.5 py-2 rounded-xl text-white outline-none border border-transparent focus:border-gray-700"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-xs text-white px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-[10px] text-red-400 font-medium">{couponError}</p>}
            </div>

            {/* Proceed to checkout trigger button */}
            <button
              onClick={() => setView('checkout')}
              className="w-full text-center py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-black tracking-wide shadow-md hover:shadow-red-500/15 uppercase transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer"
              id="proceed-checkout-btn"
            >
              <Lock size={12} />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
