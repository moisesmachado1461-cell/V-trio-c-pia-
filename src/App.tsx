import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { StoreFront } from './components/store/StoreFront';
import { ProductDetailModal } from './components/store/ProductDetailModal';
import { CartDrawer } from './components/store/CartDrawer';
import { CheckoutModal } from './components/store/CheckoutModal';
import { CustomerProfileModal } from './components/store/CustomerProfileModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TechSpecHub } from './components/techspec/TechSpecHub';

const MainApp: React.FC = () => {
  const { view, theme } = useStore();

  return (
    <div
      className="min-h-screen text-slate-900 bg-white selection:bg-indigo-500 selection:text-white"
      style={{
        fontFamily: `"${theme.fontFamily}", system-ui, -apple-system, sans-serif`,
      }}
    >
      {/* Global Header */}
      <Header />

      {/* Main View Router */}
      <main>
        {view === 'store' && <StoreFront />}
        {view === 'admin' && <AdminDashboard />}
        {view === 'tech-spec' && <TechSpecHub />}
      </main>

      {/* Overlays and Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <CustomerProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
