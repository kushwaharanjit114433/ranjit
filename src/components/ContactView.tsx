import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name || !email || !message) {
      setStatus({ type: 'error', text: 'Please fill name, email and message lines before dispatching.' });
      return;
    }

    setStatus({
      type: 'success',
      text: `Inquiry sent successfully! Thank you, ${name}. Our help desk will email you within 3-4 working hours.`
    });

    // Reset fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn" id="contact-view-container font-sans">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-sans font-black text-gray-900 tracking-tight">Need Assistance? Contact Food Hub</h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          Questions about your delivery, partner restaurant onboarding, or rider careers? Connect with our 24/7 Kathmandu operations room.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-layout">
        
        {/* Left Form: interactive contact form */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
            <MessageSquare size={18} className="text-red-500" />
            <h2 className="font-extrabold text-sm uppercase tracking-wide text-gray-900">Send an Inquiry</h2>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 font-sans">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 block">Your Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Ranjit Kushwaha"
                  className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="space-y-1.5 font-sans">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 block">Email Address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E.g., client@example.com"
                  className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="space-y-1.5 font-sans font-sans">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 block">Subject / Query Topic</span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="E.g., Partnership onboarding, order delay issues"
                className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="space-y-1.5 font-sans font-sans">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 block">Message Content</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Compose your message queries clearly here..."
                className="w-full text-xs text-gray-800 bg-gray-50 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 resize-none"
              ></textarea>
            </div>

            {status && (
              <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
                status.type === 'success' 
                  ? 'bg-green-50 border-green-100 text-green-700' 
                  : 'bg-red-50 border-red-150 text-red-650 text-red-600'
              }`}>
                {status.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                <span>{status.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold font-sans tracking-wide shadow-md flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Send size={12} />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right Info: map location and details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Details card */}
          <div className="bg-gray-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="font-sans font-black text-sm tracking-widest uppercase border-b border-gray-800 pb-3 text-gray-200">
              Operations Headquarters
            </h3>

            <div className="space-y-4 text-xs text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Kathmandu Hub office</h4>
                  <p className="mt-1">New Baneshwor Chowk, Inside Madan Bhandari Marg Road, House No. 44, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Helpline Support Desk</h4>
                  <p className="mt-1">01-4455667 (Landline)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Corporate Cell: +977 9841234567, +977 9801234567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Electronic Correspondence</h4>
                  <p className="mt-1">support@foodhubnepal.com.np</p>
                  <span className="text-[10px] text-gray-500">For onboarding: partner@foodhubnepal.com.np</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 text-[10px] text-gray-500 leading-relaxed">
              🏔️ Operations staffed 24 hours a day, 7 days a week, including dashain, tihar, and national holidays.
            </div>
          </div>

          {/* Map simulation: beautiful interactive styled vector map of Kathmandu */}
          <div className="bg-white border border-gray-255 rounded-3xl overflow-hidden shadow-xs space-y-2">
            <div className="p-4 border-b border-gray-50">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">📍 Live Map Placement</span>
              <p className="text-xs font-black text-gray-900 mt-1">Kathmandu Valley Sector Matrix</p>
            </div>
            
            {/* SVG Visualizing Kathmandu sectors */}
            <div className="relative aspect-video bg-sky-50 flex items-center justify-center relative overflow-hidden" id="google-map-simulation">
              <svg className="w-full h-full" viewBox="0 0 300 150">
                {/* Simulated contour river Bagmati */}
                <path d="M10 135 C 75 120, 150 70, 290 85" fill="none" stroke="#bae6fd" strokeWidth="4" />
                
                {/* Simulated streets girds */}
                <line x1="40" y1="0" x2="60" y2="150" stroke="#f1f5f9" strokeWidth="2" />
                <line x1="140" y1="0" x2="160" y2="150" stroke="#f1f5f9" strokeWidth="2" />
                <line x1="240" y1="0" x2="260" y2="150" stroke="#f1f5f9" strokeWidth="2" />
                
                <line x1="0" y1="40" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="2" />
                <line x1="0" y1="100" x2="300" y2="105" stroke="#f1f5f9" strokeWidth="2" />

                {/* Suburbs nodes */}
                <circle cx="50" cy="42" r="3" fill="#cbd5e1" />
                <text x="56" y="44" className="text-[8px] font-mono fill-gray-400 font-bold">Lazimpat</text>

                <circle cx="210" cy="52" r="3" fill="#cbd5e1" />
                <text x="216" y="54" className="text-[8px] font-mono fill-gray-400 font-bold">Baneshwor</text>

                <circle cx="110" cy="110" r="3" fill="#cbd5e1" />
                <text x="116" y="112" className="text-[8px] font-mono fill-gray-400 font-bold">Patan / Durbar</text>

                {/* Headquarter Pin locator */}
                <g className="animate-bounce">
                  <path d="M150 65 L153 72 L147 72 Z" fill="#dc2626" />
                  <circle cx="150" cy="65" r="4" fill="#dc2626" />
                </g>
                <text x="157" y="68" className="text-[9px] font-sans font-black fill-red-650 fill-red-600">HQ - Food Hub</text>

                <circle cx="150" cy="74" r="5" fill="none" stroke="#dc2626" strokeWidth="1" className="opacity-40 animate-ping" />
              </svg>
              <div className="absolute bottom-2.5 right-2.5 bg-gray-950/80 backdrop-blur-md text-[8px] text-white px-2.5 py-1 rounded-md font-mono font-bold tracking-widest uppercase shadow-sm">
                Coordinates Map (Simulated)
              </div>
            </div>
            <p className="p-3 text-[10px] text-gray-400 text-center">
              Madan Bhandari Highway, Kathmandu. 1.2 KM from Presidential Palace.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
