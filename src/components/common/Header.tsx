import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Sliders,
  FileCode2,
  Search,
  User,
  RotateCcw,
  Sparkles,
  Store,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    view,
    setView,
    theme,
    cartCount,
    setIsCartOpen,
    setIsProfileOpen,
    searchQuery,
    setSearchQuery,
    resetToDefaults,
    totalOrdersCount,
  } = useStore();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    setResetFeedback(true);
    setTimeout(() => setResetFeedback(false), 3000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Announcement Bar (Configurable in Admin) */}
      {theme.showAnnouncement && theme.announcementBar && (
        <div
          className="text-xs md:text-sm font-medium py-1.5 px-4 text-center text-white flex items-center justify-center gap-2 transition-all shadow-inner"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span className="truncate">{theme.announcementBar}</span>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo / Store Name with live dynamic style */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setView('store')}>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: theme.primaryColor }}
            >
              V
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  {theme.storeName}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block truncate max-w-xs">
                {theme.tagline}
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs (Customer Store vs Admin vs Tech Specs) */}
          <div className="hidden lg:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setView('store')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === 'store'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>Loja do Cliente</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            <button
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === 'admin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span>Painel Admin No-Code</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-800 font-mono">
                Editor
              </span>
            </button>

            <button
              onClick={() => setView('tech-spec')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                view === 'tech-spec'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Especificação Técnica & Arquitetura</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-100 text-indigo-800 font-mono">
                Blueprint
              </span>
            </button>
          </div>

          {/* Search bar (active in store mode) */}
          {view === 'store' && (
            <div className="flex-1 max-w-xs md:max-w-sm hidden sm:block relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos ou serviços..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100 focus:bg-white text-xs sm:text-sm text-slate-800 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Customer Profile / Orders Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border border-transparent hover:border-slate-200"
              title="Meus Pedidos & Perfil"
            >
              <User className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline">Meus Pedidos</span>
              {totalOrdersCount > 0 && (
                <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalOrdersCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Sacola</span>
              {cartCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce"
                  style={{ backgroundColor: theme.secondaryColor }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Demo Reset Data button */}
            <div className="relative">
              <button
                onClick={() => setShowResetConfirm(!showResetConfirm)}
                title="Reiniciar dados da demonstração"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {showResetConfirm && (
                <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-left">
                  <p className="text-xs font-semibold text-slate-800 mb-1">Restaurar dados originais?</p>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Isso reinicializará o catálogo, tema e pedidos de demonstração aos padrões de fábrica.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium rounded-lg"
                    >
                      Restaurar
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Mobile Sub-Navigation Bar for Views */}
        <div className="flex lg:hidden items-center justify-between pb-3 pt-1 border-t border-slate-100 gap-2 overflow-x-auto">
          <button
            onClick={() => setView('store')}
            className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium ${
              view === 'store'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Loja</span>
          </button>

          <button
            onClick={() => setView('admin')}
            className={`flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium ${
              view === 'admin'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Admin No-Code</span>
          </button>

          <button
            onClick={() => setView('tech-spec')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium ${
              view === 'tech-spec'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Especificação</span>
          </button>
        </div>

        {/* Feedback alert after reset */}
        {resetFeedback && (
          <div className="py-1.5 px-3 mb-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dados da plataforma VÍTRIO restaurados aos padrões com sucesso!</span>
          </div>
        )}

      </div>
    </header>
  );
};
