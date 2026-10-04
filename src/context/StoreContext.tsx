import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductService,
  SegmentType,
  ItemType,
  StoreTheme,
  CartItem,
  Order,
  Coupon,
  OrderStatus,
  ActiveAppView
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_THEME,
  INITIAL_ORDERS,
  INITIAL_COUPONS
} from '../data/initialData';

interface StoreContextType {
  // Navigation & View
  view: ActiveAppView;
  setView: (view: ActiveAppView) => void;
  activeSegment: SegmentType;
  setActiveSegment: (segment: SegmentType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: 'all' | 'product' | 'service';
  setTypeFilter: (filter: 'all' | 'product' | 'service') => void;

  // Products
  products: ProductService[];
  selectedProduct: ProductService | null;
  setSelectedProduct: (product: ProductService | null) => void;
  addProduct: (product: Omit<ProductService, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<ProductService>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: ProductService,
    quantity?: number,
    options?: {
      selectedDate?: string;
      selectedTime?: string;
      selectedVariant?: string;
      notes?: string;
    }
  ) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  // Coupon
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCoupon: (code: string) => void;

  // Checkout & Orders
  orders: Order[];
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastCreatedOrder: Order | null;
  setLastCreatedOrder: (order: Order | null) => void;
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Customer Profile
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;

  // Theme & Personalization
  theme: StoreTheme;
  updateTheme: (updates: Partial<StoreTheme>) => void;
  resetTheme: () => void;
  resetToDefaults: () => void;

  // Quick stats
  totalRevenue: number;
  totalOrdersCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  THEME: 'vitrio_theme_v1',
  PRODUCTS: 'vitrio_products_v1',
  ORDERS: 'vitrio_orders_v1',
  CART: 'vitrio_cart_v1',
  COUPONS: 'vitrio_coupons_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<ActiveAppView>('store');
  const [activeSegment, setActiveSegment] = useState<SegmentType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'product' | 'service'>('all');

  const [selectedProduct, setSelectedProduct] = useState<ProductService | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Initialize theme from storage
  const [theme, setTheme] = useState<StoreTheme>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
      return saved ? JSON.parse(saved) : INITIAL_THEME;
    } catch {
      return INITIAL_THEME;
    }
  });

  // Initialize products from storage
  const [products, setProducts] = useState<ProductService[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Initialize orders from storage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Initialize coupons from storage
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Initialize cart from storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Persist states
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, JSON.stringify(theme));
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Dynamically update document CSS variables for live preview
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--vitrio-primary', theme.primaryColor);
    root.style.setProperty('--vitrio-secondary', theme.secondaryColor);
    root.style.setProperty('--vitrio-accent', theme.accentColor);
    
    // Border radius
    const radiusMap: Record<string, string> = {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
    };
    root.style.setProperty('--vitrio-radius', radiusMap[theme.borderRadius] || '8px');

    // Font family
    root.style.setProperty('--vitrio-font', theme.fontFamily);
  }, [theme]);

  // Cart operations
  const addToCart = (
    product: ProductService,
    quantity = 1,
    options?: {
      selectedDate?: string;
      selectedTime?: string;
      selectedVariant?: string;
      notes?: string;
    }
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === options?.selectedVariant &&
          item.selectedDate === options?.selectedDate &&
          item.selectedTime === options?.selectedTime
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedDate: options?.selectedDate,
            selectedTime: options?.selectedTime,
            selectedVariant: options?.selectedVariant,
            notes: options?.notes,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Calculate discount
  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minPurchase) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.value) / 100;
    } else {
      cartDiscount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }

  // Shipping simulation: free if only services or subtotal > 250
  const hasPhysicalProducts = cart.some((item) => item.product.type === 'product');
  const cartShipping = !hasPhysicalProducts || cartSubtotal >= 250 || cartSubtotal === 0 ? 0 : 18.90;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Apply Coupon
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return { success: false, message: 'Cupom inválido ou expirado.' };
    }

    if (cartSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `Este cupom exige compra mínima de R$ ${found.minPurchase.toFixed(2)}.`,
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Cupom ${found.code} aplicado com sucesso!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  // Orders
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrderId = `VIT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newOrderId,
      customerName: orderData.customerName || 'Cliente Anônimo',
      customerEmail: orderData.customerEmail || 'cliente@email.com',
      customerPhone: orderData.customerPhone || '(11) 99999-0000',
      customerDocument: orderData.customerDocument || '000.000.000-00',
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      status: orderData.paymentMethod === 'pix' ? 'pending' : 'paid',
      paymentMethod: orderData.paymentMethod || 'pix',
      paymentStatus: orderData.paymentMethod === 'pix' ? 'pending' : 'approved',
      installments: orderData.installments || 1,
      pixCode:
        orderData.paymentMethod === 'pix'
          ? `00020126580014br.gov.bcb.pix0136${theme.pixKey || 'pix@vitrio.com.br'}520400005303986540${cartTotal.toFixed(2)}5802BR5916VITRIO EMPORIUM6009SAO PAULO62070503***6304`
          : undefined,
      shippingAddress: orderData.shippingAddress || {
        street: 'Rua das Flores',
        number: '100',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01001-000',
      },
      createdAt: new Date().toISOString(),
      trackingCode: hasPhysicalProducts ? `BR${Math.floor(100000000 + Math.random() * 900000000)}SP` : undefined,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              paymentStatus: status === 'cancelled' ? 'failed' : status === 'pending' ? 'pending' : 'approved',
            }
          : order
      )
    );
  };

  // Products CRUD
  const addProduct = (product: Omit<ProductService, 'id'>) => {
    const newId = `${product.type === 'service' ? 'serv' : 'prod'}-${Date.now()}`;
    const newItem: ProductService = {
      ...product,
      id: newId,
    };
    setProducts((prev) => [newItem, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<ProductService>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Theme
  const updateTheme = (updates: Partial<StoreTheme>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(INITIAL_THEME);
  };

  const resetToDefaults = () => {
    setTheme(INITIAL_THEME);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    setCart([]);
    setAppliedCoupon(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.THEME);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ORDERS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.COUPONS);
  };

  // Stats calculation
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.total, 0);
  const totalOrdersCount = orders.length;

  return (
    <StoreContext.Provider
      value={{
        view,
        setView,
        activeSegment,
        setActiveSegment,
        searchQuery,
        setSearchQuery,
        typeFilter,
        setTypeFilter,
        products,
        selectedProduct,
        setSelectedProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCoupon,
        orders,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastCreatedOrder,
        setLastCreatedOrder,
        createOrder,
        updateOrderStatus,
        isProfileOpen,
        setIsProfileOpen,
        theme,
        updateTheme,
        resetTheme,
        resetToDefaults,
        totalRevenue,
        totalOrdersCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
