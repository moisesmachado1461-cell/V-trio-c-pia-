import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_SEGMENTS } from '../../data/initialData';
import { ProductService, SegmentType, ItemType, OrderStatus, Coupon } from '../../types';
import {
  Palette,
  Package,
  ClipboardList,
  BarChart3,
  Tag,
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  Store,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Save,
  RotateCcw,
  Check,
  Search,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    toggleCoupon,
    theme,
    updateTheme,
    resetTheme,
    totalRevenue,
    setView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'theme' | 'products' | 'orders' | 'metrics' | 'coupons' | 'payments'
  >('theme');

  // Product modal form state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [prodTitle, setProdTitle] = useState('');
  const [prodType, setProdType] = useState<ItemType>('product');
  const [prodSegment, setProdSegment] = useState<SegmentType>('fashion');
  const [prodPrice, setProdPrice] = useState(150);
  const [prodOriginalPrice, setProdOriginalPrice] = useState<number | undefined>(undefined);
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodStock, setProdStock] = useState(10);
  const [prodDuration, setProdDuration] = useState('1 hora');
  const [prodLocation, setProdLocation] = useState<'presencial' | 'online' | 'domicilio'>('online');
  const [prodSku, setProdSku] = useState('');
  const [prodFeatures, setProdFeatures] = useState('Garantia de qualidade, Atendimento VIP');

  // Coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(100);

  // Theme save notification
  const [themeSaved, setThemeSaved] = useState(false);

  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setProdTitle('');
    setProdType('product');
    setProdSegment('fashion');
    setProdPrice(99.90);
    setProdOriginalPrice(129.90);
    setProdShortDesc('Item artesanal de alta qualidade.');
    setProdDesc('Descrição completa e especificações do item para o catálogo da sua loja.');
    setProdImageUrl('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80');
    setProdStock(20);
    setProdDuration('1h');
    setProdLocation('presencial');
    setProdSku(`VIT-${Math.floor(100 + Math.random() * 900)}`);
    setProdFeatures('Acabamento premium, Entrega ágil, Suporte pós-venda');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = prodFeatures.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        title: prodTitle,
        type: prodType,
        segmentId: prodSegment,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        shortDescription: prodShortDesc,
        description: prodDesc,
        images: [prodImageUrl],
        stock: prodStock,
        duration: prodType === 'service' ? prodDuration : undefined,
        serviceLocation: prodType === 'service' ? prodLocation : undefined,
        sku: prodSku,
        features: featuresList,
      });
    } else {
      addProduct({
        title: prodTitle,
        type: prodType,
        segmentId: prodSegment,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        shortDescription: prodShortDesc,
        description: prodDesc,
        images: [prodImageUrl],
        stock: prodStock,
        duration: prodType === 'service' ? prodDuration : undefined,
        serviceLocation: prodType === 'service' ? prodLocation : undefined,
        sku: prodSku,
        rating: 5.0,
        reviewCount: 1,
        features: featuresList,
        isFeatured: true,
        inStock: true,
      });
    }
    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      value: newCouponValue,
      minPurchase: newCouponMin,
      expiresAt: '2026-12-31',
      active: true,
      description: `Desconto de ${newCouponType === 'percentage' ? `${newCouponValue}%` : `R$ ${newCouponValue}`} em compras acima de R$ ${newCouponMin}`,
    });
    setNewCouponCode('');
  };

  const handleSaveTheme = () => {
    setThemeSaved(true);
    setTimeout(() => setThemeSaved(false), 2500);
  };

  // Color presets for quick selection
  const colorPresets = [
    { name: 'Azul Executivo', primary: '#0F172A', secondary: '#D97706', accent: '#10B981' },
    { name: 'Terracota Elegante', primary: '#9A3412', secondary: '#F59E0B', accent: '#0D9488' },
    { name: 'Esmeralda Sofisticado', primary: '#064E3B', secondary: '#10B981', accent: '#F59E0B' },
    { name: 'Violeta Moderno', primary: '#4C1D95', secondary: '#8B5CF6', accent: '#EC4899' },
    { name: 'Rosa Boutiq', primary: '#831843', secondary: '#DB2777', accent: '#6366F1' },
    { name: 'Grafite Minimalista', primary: '#18181B', secondary: '#71717A', accent: '#10B981' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      
      {/* Top Banner & KPI Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  Painel Administrativo No-Code
                </span>
                <span className="text-xs text-slate-400 font-mono">v1.2.0</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Gestão & Personalização • {theme.storeName}
              </h1>
              <p className="text-xs text-slate-400">
                Altere a identidade visual, controle estoques, gerencie agendamentos e acompanhe vendas em tempo real.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('store')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 flex items-center gap-1.5 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualizar Loja ao Vivo</span>
              </button>

              <button
                onClick={() => setView('tech-spec')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
              >
                <span>Arquitetura da Solução</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Faturamento Total</span>
              <span className="text-lg font-extrabold text-white">
                R$ {totalRevenue.toFixed(2)}
              </span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Total de Pedidos</span>
              <span className="text-lg font-extrabold text-amber-400">
                {orders.length} pedidos
              </span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Itens no Catálogo</span>
              <span className="text-lg font-extrabold text-emerald-400">
                {products.length} ativos
              </span>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Ticket Médio</span>
              <span className="text-lg font-extrabold text-indigo-400">
                R$ {orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 overflow-x-auto gap-2">
          
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'theme'
                ? 'border-amber-600 text-amber-700 bg-amber-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-600" />
            <span>Editor Visual No-Code</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'products'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 text-indigo-600" />
            <span>Catálogo (Produtos & Serviços)</span>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0.2 rounded-full">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'orders'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            <span>Pedidos & Esteira Kanban</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'metrics'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>Métricas & Relatórios</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'coupons'
                ? 'border-rose-600 text-rose-700 bg-rose-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4 text-rose-600" />
            <span>Promoções & Cupons</span>
            <span className="bg-rose-100 text-rose-800 text-[10px] px-1.5 py-0.2 rounded-full">
              {coupons.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all shrink-0 ${
              activeTab === 'payments'
                ? 'border-slate-900 text-slate-900 bg-slate-100 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-slate-700" />
            <span>Configurar Pagamentos</span>
          </button>

        </div>

        {/* Tab Body */}
        <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 p-6 sm:p-8 shadow-sm">
          
          {/* TAB 1: NO-CODE THEME CUSTOMIZER */}
          {activeTab === 'theme' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-amber-600" />
                    <span>Personalizador Visual No-Code</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Todas as alterações são aplicadas e refletidas instantaneamente na vitrine da loja sem necessidade de código!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetTheme}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Redefinir Padrões</span>
                  </button>

                  <button
                    onClick={handleSaveTheme}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    {themeSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                    <span>{themeSaved ? 'Tema Atualizado!' : 'Salvar Alterações'}</span>
                  </button>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Paletas de Cores Prontas (Clique para aplicar):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        updateTheme({
                          primaryColor: preset.primary,
                          secondaryColor: preset.secondary,
                          accentColor: preset.accent,
                        });
                        handleSaveTheme();
                      }}
                      className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 text-left transition-all hover:shadow-xs group"
                    >
                      <div className="flex gap-1.5 mb-2">
                        <span className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: preset.primary }} />
                        <span className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: preset.secondary }} />
                        <span className="w-4 h-4 rounded-full shadow-xs" style={{ backgroundColor: preset.accent }} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 group-hover:text-amber-600 block truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left: Branding & Typography */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Informações da Marca & Tipografia
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nome da Loja:
                    </label>
                    <input
                      type="text"
                      value={theme.storeName}
                      onChange={(e) => updateTheme({ storeName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Slogan da Loja:
                    </label>
                    <input
                      type="text"
                      value={theme.tagline}
                      onChange={(e) => updateTheme({ tagline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Família Tipográfica:
                      </label>
                      <select
                        value={theme.fontFamily}
                        onChange={(e) => updateTheme({ fontFamily: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                      >
                        <option value="Plus Jakarta Sans">Plus Jakarta Sans (Moderna)</option>
                        <option value="Space Grotesk">Space Grotesk (Tech / Criativa)</option>
                        <option value="Playfair Display">Playfair Display (Elegante / Luxo)</option>
                        <option value="Inter">Inter (Clássica / Neutra)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Estilo de Bordas:
                      </label>
                      <select
                        value={theme.borderRadius}
                        onChange={(e) => updateTheme({ borderRadius: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                      >
                        <option value="none">Retas (0px - Brutalista)</option>
                        <option value="sm">Suaves (4px)</option>
                        <option value="md">Padrão Arredondado (8px)</option>
                        <option value="lg">Orgânicas (16px)</option>
                      </select>
                    </div>
                  </div>

                  {/* Colors Custom Hex */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Cor Primária:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={theme.primaryColor}
                          onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0"
                        />
                        <input
                          type="text"
                          value={theme.primaryColor}
                          onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Cor Secundária:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={theme.secondaryColor}
                          onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0"
                        />
                        <input
                          type="text"
                          value={theme.secondaryColor}
                          onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Cor de Destaque:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={theme.accentColor}
                          onChange={(e) => updateTheme({ accentColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0"
                        />
                        <input
                          type="text"
                          value={theme.accentColor}
                          onChange={(e) => updateTheme({ accentColor: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-mono"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right: Banners & Announcement Bar */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Banners Promocionais & Hero
                  </h3>

                  {/* Top Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Barra Superior de Aviso / Promoção:
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={theme.showAnnouncement}
                          onChange={(e) => updateTheme({ showAnnouncement: e.target.checked })}
                          className="rounded text-amber-600 focus:ring-amber-500"
                        />
                        <span>Ativa</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={theme.announcementBar}
                      onChange={(e) => updateTheme({ announcementBar: e.target.value })}
                      placeholder="Ex: Cupom de lançamento BEMVINDO10..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                    />
                  </div>

                  {/* Hero Headline */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Título Principal da Vitrine (Headline):
                    </label>
                    <input
                      type="text"
                      value={theme.heroHeadline}
                      onChange={(e) => updateTheme({ heroHeadline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                    />
                  </div>

                  {/* Hero Subheadline */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subtítulo Explicativo:
                    </label>
                    <textarea
                      rows={2}
                      value={theme.heroSubheadline}
                      onChange={(e) => updateTheme({ heroSubheadline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800"
                    />
                  </div>

                  {/* Hero Image */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      URL da Imagem de Fundo (Hero):
                    </label>
                    <input
                      type="text"
                      value={theme.heroImage}
                      onChange={(e) => updateTheme({ heroImage: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Telefone / WhatsApp:
                      </label>
                      <input
                        type="text"
                        value={theme.contactPhone}
                        onChange={(e) => updateTheme({ contactPhone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        E-mail de Suporte:
                      </label>
                      <input
                        type="email"
                        value={theme.contactEmail}
                        onChange={(e) => updateTheme({ contactEmail: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS & SERVICES CATALOG MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-600" />
                    <span>Gerenciador de Produtos e Serviços</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Cadastre itens de múltiplos segmentos com controle de estoque físico ou disponibilidade de agendamento.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewProduct}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Produto ou Serviço</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Item / Título</th>
                      <th className="p-3">Tipo</th>
                      <th className="p-3">Segmento</th>
                      <th className="p-3">Preço</th>
                      <th className="p-3">Estoque / Duração</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block">{item.title}</span>
                              <span className="text-[10px] font-mono text-slate-400">{item.sku}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.type === 'service'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {item.type === 'service' ? 'Serviço' : 'Produto Físico'}
                          </span>
                        </td>

                        <td className="p-3">
                          <span className="capitalize text-slate-600 font-medium">
                            {INITIAL_SEGMENTS.find((s) => s.id === item.segmentId)?.name || item.segmentId}
                          </span>
                        </td>

                        <td className="p-3 font-extrabold text-slate-900">
                          R$ {item.price.toFixed(2)}
                          {item.originalPrice && (
                            <span className="block text-[10px] text-slate-400 line-through font-normal">
                              R$ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </td>

                        <td className="p-3">
                          {item.type === 'service' ? (
                            <span className="text-slate-600 font-medium">
                              {item.duration || 'Flexível'} ({item.serviceLocation})
                            </span>
                          ) : (
                            <span
                              className={`font-bold ${
                                item.stock > 5 ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {item.stock} un.
                            </span>
                          )}
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProductId(item.id);
                                setProdTitle(item.title);
                                setProdType(item.type);
                                setProdSegment(item.segmentId);
                                setProdPrice(item.price);
                                setProdOriginalPrice(item.originalPrice);
                                setProdShortDesc(item.shortDescription);
                                setProdDesc(item.description);
                                setProdImageUrl(item.images[0]);
                                setProdStock(item.stock);
                                setProdDuration(item.duration || '1h');
                                setProdLocation(item.serviceLocation || 'online');
                                setProdSku(item.sku);
                                setProdFeatures(item.features.join(', '));
                                setIsProductModalOpen(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => deleteProduct(item.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS KANBAN & LIST */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-600" />
                    <span>Esteira Operacional de Pedidos (Kanban)</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Acompanhe o fluxo de aprovação de pagamentos, separação de mercadorias e execução de serviços.
                  </p>
                </div>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Column 1: Pendente */}
                <div className="bg-amber-50/50 rounded-2xl border border-amber-200/80 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Aguardando Pix / Boleto</span>
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {orders.filter((o) => o.status === 'pending').length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {orders
                      .filter((o) => o.status === 'pending')
                      .map((order) => (
                        <div key={order.id} className="bg-white p-3 rounded-xl border border-amber-200/60 shadow-xs space-y-2 text-xs">
                          <div className="flex justify-between items-start">
                            <span className="font-extrabold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-slate-800">R$ {order.total.toFixed(2)}</span>
                          </div>
                          <p className="text-slate-600 truncate">{order.customerName}</p>
                          <div className="pt-2 border-t border-slate-100 flex justify-end gap-1">
                            <button
                              onClick={() => updateOrderStatus(order.id, 'paid')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg"
                            >
                              Baixar Pagamento
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 2: Pago / Confirmado */}
                <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200/80 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pago / Confirmado</span>
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {orders.filter((o) => o.status === 'paid').length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {orders
                      .filter((o) => o.status === 'paid')
                      .map((order) => (
                        <div key={order.id} className="bg-white p-3 rounded-xl border border-emerald-200/60 shadow-xs space-y-2 text-xs">
                          <div className="flex justify-between items-start">
                            <span className="font-extrabold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-slate-800">R$ {order.total.toFixed(2)}</span>
                          </div>
                          <p className="text-slate-600 truncate">{order.customerName}</p>
                          <div className="pt-2 border-t border-slate-100 flex justify-end gap-1">
                            <button
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold rounded-lg"
                            >
                              Iniciar Separação
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 3: Em Separação / Execução */}
                <div className="bg-purple-50/50 rounded-2xl border border-purple-200/80 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <span>Em Separação / Execução</span>
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {orders.filter((o) => o.status === 'processing').length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {orders
                      .filter((o) => o.status === 'processing')
                      .map((order) => (
                        <div key={order.id} className="bg-white p-3 rounded-xl border border-purple-200/60 shadow-xs space-y-2 text-xs">
                          <div className="flex justify-between items-start">
                            <span className="font-extrabold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-slate-800">R$ {order.total.toFixed(2)}</span>
                          </div>
                          <p className="text-slate-600 truncate">{order.customerName}</p>
                          <div className="pt-2 border-t border-slate-100 flex justify-end gap-1">
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg"
                            >
                              Despachar / Concluir
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Column 4: Concluído / Enviado */}
                <div className="bg-blue-50/50 rounded-2xl border border-blue-200/80 p-3.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Enviado / Finalizado</span>
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {orders.filter((o) => o.status === 'shipped' || o.status === 'completed').length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {orders
                      .filter((o) => o.status === 'shipped' || o.status === 'completed')
                      .map((order) => (
                        <div key={order.id} className="bg-white p-3 rounded-xl border border-blue-200/60 shadow-xs space-y-2 text-xs">
                          <div className="flex justify-between items-start">
                            <span className="font-extrabold text-slate-900">#{order.id}</span>
                            <span className="font-bold text-slate-800">R$ {order.total.toFixed(2)}</span>
                          </div>
                          <p className="text-slate-600 truncate">{order.customerName}</p>
                          {order.trackingCode && (
                            <span className="text-[10px] font-mono text-blue-600 block">
                              {order.trackingCode}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: METRICS & REPORTS */}
          {activeTab === 'metrics' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Desempenho Comercial & Analytics</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Visão consolidada de vendas, canais de faturamento e penetração por categoria.
                </p>
              </div>

              {/* Segment Revenue Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Vendas por Segmento da Loja
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Moda & Acessórios</span>
                        <span>42% • R$ 1.890,00</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Serviços & Consultoria</span>
                        <span>28% • R$ 1.260,00</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Beleza & Cuidados</span>
                        <span>18% • R$ 810,00</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-pink-500 h-full rounded-full" style={{ width: '18%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Gastronomia & Casa</span>
                        <span>12% • R$ 540,00</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods Breakdown */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Métodos de Pagamento Utilizados
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-800">Pix Instantâneo</span>
                      </div>
                      <span className="font-extrabold text-slate-900">68% das vendas</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500" />
                        <span className="font-bold text-slate-800">Cartão de Crédito (Parcelado)</span>
                      </div>
                      <span className="font-extrabold text-slate-900">27% das vendas</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-500" />
                        <span className="font-bold text-slate-800">Boleto Bancário</span>
                      </div>
                      <span className="font-extrabold text-slate-900">5% das vendas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COUPONS & PROMOTIONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-rose-600" />
                    <span>Gestor de Cupons & Promoções</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Crie campanhas de desconto percentual ou valor fixo com valor mínimo de pedido.
                  </p>
                </div>
              </div>

              {/* Form to create coupon */}
              <form onSubmit={handleCreateCoupon} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Código do Cupom:</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="EX: BLACK15"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tipo de Desconto:</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium"
                  >
                    <option value="percentage">Percentual (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Valor do Desconto:</label>
                  <input
                    type="number"
                    required
                    value={newCouponValue}
                    onChange={(e) => setNewCouponValue(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Compra Mínima (R$):</label>
                  <input
                    type="number"
                    required
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Criar Cupom</span>
                </button>
              </form>

              {/* Coupons List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                  <div key={coupon.code} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => toggleCoupon(coupon.code)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          coupon.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {coupon.active ? 'Ativo' : 'Pausado'}
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-slate-800">
                      {coupon.discountType === 'percentage' ? `${coupon.value}% de Desconto` : `R$ ${coupon.value.toFixed(2)} OFF`}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {coupon.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PAYMENT GATEWAYS CONFIGURATION */}
          {activeTab === 'payments' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-slate-800" />
                  <span>Configuração de Gateways de Pagamento</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Gerenciamento dos provedores de recebimento Pix, Cartão e Boleto sem intermediários abusivos.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Chave Pix para Recebimento Direto:
                  </label>
                  <input
                    type="text"
                    value={theme.pixKey}
                    onChange={(e) => updateTheme({ pixKey: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-mono text-slate-800"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Utilizada na composição do payload Pix Copia e Cola para QR codes dinâmicos.
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Gateway Recomendado Integrado:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white rounded-xl border-2 border-slate-900 font-bold text-slate-900 text-center">
                      Mercado Pago
                      <span className="text-[10px] text-emerald-600 block font-normal">Ativo (Sandbox / Prod)</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600 text-center">
                      Asaas
                      <span className="text-[10px] text-slate-400 block">Disponível</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-600 text-center">
                      Pagar.me / Stone
                      <span className="text-[10px] text-slate-400 block">Disponível</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                  <b>Dica de Arquitetura:</b> Na VÍTRIO, o lojista recebe 100% do valor diretamente em sua conta bancária vinculada, sem retenção de saldo pela plataforma.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal: New / Edit Product & Service */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingProductId ? 'Editar Item do Catálogo' : 'Cadastrar Novo Item'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* Type Switcher */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setProdType('product')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    prodType === 'product' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Produto Físico
                </button>
                <button
                  type="button"
                  onClick={() => setProdType('service')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    prodType === 'service' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Serviço Agendável
                </button>
              </div>

              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Título:</label>
                <input
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              {/* Segment & SKU */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Segmento:</label>
                  <select
                    value={prodSegment}
                    onChange={(e) => setProdSegment(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    {INITIAL_SEGMENTS.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Código SKU:</label>
                  <input
                    type="text"
                    required
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preço de Venda (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preço Original / De (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={prodOriginalPrice || ''}
                    onChange={(e) => setProdOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Opcional"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Service specific fields */}
              {prodType === 'service' ? (
                <div className="grid grid-cols-2 gap-3 p-3 bg-indigo-50/60 rounded-xl border border-indigo-200">
                  <div>
                    <label className="block font-semibold text-indigo-900 mb-1">Duração estimada:</label>
                    <input
                      type="text"
                      value={prodDuration}
                      onChange={(e) => setProdDuration(e.target.value)}
                      placeholder="Ex: 50 min, 1h30"
                      className="w-full bg-white border border-indigo-200 rounded-xl px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-indigo-900 mb-1">Modalidade:</label>
                    <select
                      value={prodLocation}
                      onChange={(e) => setProdLocation(e.target.value as any)}
                      className="w-full bg-white border border-indigo-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
                    >
                      <option value="online">Online / Remoto</option>
                      <option value="presencial">Presencial no Estabelecimento</option>
                      <option value="domicilio">A Domicílio</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantidade em Estoque:</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
              )}

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL da Imagem:</label>
                <input
                  type="text"
                  required
                  value={prodImageUrl}
                  onChange={(e) => setProdImageUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Breve Resumo:</label>
                <input
                  type="text"
                  required
                  value={prodShortDesc}
                  onChange={(e) => setProdShortDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              {/* Features separated by comma */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Destaques (separados por vírgula):</label>
                <input
                  type="text"
                  value={prodFeatures}
                  onChange={(e) => setProdFeatures(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold"
                >
                  Salvar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
