import React, { useState } from 'react';
import { Mail, Lock, User, Phone, CheckCircle2, Key, HelpCircle } from 'lucide-react';
import { AppView, User as UserType } from '../types';

interface AuthViewProps {
  setView: (view: AppView) => void;
  setCurrentUser: (user: UserType) => void;
  previousView: AppView;
}

export default function AuthView({
  setView,
  setCurrentUser,
  previousView,
}: AuthViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'customer' | 'admin' | 'rider'>('customer');

  // Forgot password flow
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  // Helper log-in action
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine role based on keywords in email or simple simulation
    let role: 'customer' | 'admin' | 'rider' = 'customer';
    if (loginEmail.includes('admin')) {
      role = 'admin';
    } else if (loginEmail.includes('rider') || loginEmail.includes('delivery')) {
      role = 'rider';
    }

    const newUser: UserType = {
      id: `usr-${Math.floor(100 + Math.random() * 900)}`,
      name: loginEmail.split('@')[0].toUpperCase() || 'Logged User',
      email: loginEmail,
      role: role,
      phone: '9841234567',
    };

    setCurrentUser(newUser);
    alert(`Successfully logged in as ${newUser.name} with role: ${newUser.role.toUpperCase()}`);
    
    // Redirect
    if (role === 'admin') setView('admin');
    else if (role === 'rider') setView('rider');
    else setView('home');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: UserType = {
      id: `usr-${Math.floor(100 + Math.random() * 900)}`,
      name: regName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
    };

    setCurrentUser(newUser);
    alert(`Account created successfully for ${newUser.name}! Set role to ${newUser.role.toUpperCase()}`);
    
    if (regRole === 'admin') setView('admin');
    else if (regRole === 'rider') setView('rider');
    else setView('home');
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(`Success! A simulated password reset link has been dispatched to ${resetEmail}.`);
    setTimeout(() => {
      setForgotPasswordMode(false);
      setResetMessage('');
    }, 4500);
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-16 flex flex-col justify-center min-h-[70vh] animate-fadeIn" id="auth-view-container">
      
      {/* Visual Logo block */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center mx-auto shadow-md shadow-red-200">
          <span className="text-white font-black text-xl">F</span>
        </div>
        <h2 className="text-2xl font-sans font-black tracking-tight text-gray-900">
          Welcome to Food Hub Nepal
        </h2>
        <p className="text-xs text-gray-500">
          Join Nepal’s premium multi-channel delivery network
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md">
        {forgotPasswordMode ? (
          /* Forgot Password Interface */
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4" id="forgot-password-form">
            <div className="border-b border-gray-50 pb-3 flex items-center gap-2 text-gray-900">
              <Key size={18} className="text-red-500" />
              <h3 className="font-extrabold text-sm uppercase tracking-wide">Recover Password</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Input your registered email. We will dispatch a recovery email containing instructions shortly.
            </p>

            <div className="space-y-1.5 font-sans">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 block">Account Email</span>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="E.g., info@foodhub.com"
                  className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                />
                <Mail size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            {resetMessage ? (
              <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-xs text-green-700 flex items-center gap-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{resetMessage}</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full text-center py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold transition-all shadow-md mt-2 cursor-pointer"
              >
                Send Reset Link
              </button>
            )}

            <button
              type="button"
              onClick={() => setForgotPasswordMode(false)}
              className="text-center text-xs text-red-600 hover:underline font-bold block w-full mt-4 cursor-pointer"
            >
              Back to Login screen
            </button>
          </form>
        ) : (
          /* Main Authentication Forms tab-set */
          <div className="space-y-6">
            
            {/* Sliding tab buttons */}
            <div className="flex gap-1.5 p-1 bg-gray-50 rounded-2xl w-full" id="auth-tab-buttons">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 text-center py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Register
              </button>
            </div>

            {/* A: Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-form-submit">
                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Email Address</span>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="E.g., ranjit@example.com"
                      className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                    />
                    <Mail size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Password</span>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                    />
                    <Lock size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Simulated Hints label */}
                <div className="p-2.5 bg-gray-50 rounded-xl text-[10px] text-gray-500 leading-relaxed">
                  💡 <strong>Developer Tip:</strong> You can type any email to simulate logging in. If email contains <code className="bg-white px-1 border border-gray-250 font-bold">admin</code>, you log in with special admin access! If it contains <code className="bg-white px-1 border border-gray-250 font-bold">rider</code>, you simulate rider view!
                </div>

                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer">
                    <input type="checkbox" className="accent-red-600 rounded" />
                    <span>Keep me logged in</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(true)}
                    className="text-red-600 hover:underline font-bold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-extrabold uppercase tracking-wide shadow-md transition-colors block mt-4 cursor-pointer"
                >
                  Log In Securely
                </button>
              </form>
            )}

            {/* B: Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4" id="register-form-submit">
                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Full Name</span>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="E.g., Ranjit Kushwaha"
                      className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                    />
                    <User size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-sans">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Email Address</span>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="E.g., user@example.com"
                        className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                      />
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Mobile Number</span>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. 9841XXXXXX"
                        className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                      />
                      <Phone size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 font-sans">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Password</span>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs text-gray-800 bg-gray-50 p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:border-red-500"
                    />
                    <Lock size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                </div>

                {/* Role selection drop */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Select Your Hub Role</span>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as any)}
                    className="w-full text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-200 outline-none focus:border-red-500"
                  >
                    <option value="customer">Customer (Order delicious food)</option>
                    <option value="rider">Delivery Rider (Assigned packages, track earnings)</option>
                    <option value="admin">Restaurant Admin (Add foods, process dispatcher)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-extrabold uppercase tracking-wide shadow-md transition-colors block mt-4 cursor-pointer"
                >
                  Create New Account
                </button>
              </form>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
