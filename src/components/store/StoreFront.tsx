import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_SEGMENTS } from '../../data/initialData';
import { ProductService, SegmentType } from '../../types';
import {
  Sparkles,
  ShoppingBag,
  Calendar,
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  QrCode,
  ArrowRight,
  Filter,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const StoreFront: React.FC = () => {
  const {
    products,
    theme,
    activeSegment,
    setActiveSegment,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    setSelectedProduct,
    addToCart,
    setView,
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Segment filter
      if (activeSegment !== 'all' && item.segmentId !== activeSegment) {
        return false;
      }
      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSku = item.sku.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSku) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeSegment, typeFilter, searchQuery, sortBy]);

  // Counts for segments
  const getSegmentCount = (segId: SegmentType) => {
    if (segId === 'all') return products.length;
    return products.filter((p) => p.segmentId === segId).length;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Hero Section (Customizable via Admin) */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img
            src={theme.heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}E6 0%, #0F172AE6 100%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-6 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma Multisegmento VÍTRIO</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {theme.heroHeadline}
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 font-normal mb-8 leading-relaxed">
              {theme.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const catalogElement = document.getElementById('vitrio-catalog');
                  catalogElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setView('admin')}
                className="px-5 py-3 rounded-xl font-semibold text-sm text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Personalizar no Admin</span>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Frete Grátis acima de R$ 250</span>
              </div>
              <div className="flex items-center gap-2.5">
                <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pix com Aprovação Instantânea</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Agende Serviços Online com Hora Marcada</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Loja Segura com Proteção LGPD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div id="vitrio-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Segment Filter Carousel / Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Categorias & Segmentos</span>
              <span className="text-xs font-normal text-slate-500">
                ({products.length} itens disponíveis)
              </span>
            </h2>

            {activeSegment !== 'all' && (
              <button
                onClick={() => setActiveSegment('all')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Limpar seleção
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {/* "All" button */}
            <button
              onClick={() => setActiveSegment('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border ${
                activeSegment === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>Todos os Segmentos</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeSegment === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {getSegmentCount('all')}
              </span>
            </button>

            {/* Segment buttons */}
            {INITIAL_SEGMENTS.map((seg) => {
              const count = getSegmentCount(seg.id);
              const isActive = activeSegment === seg.id;
              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{seg.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Type Selector (Product vs Service) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setTypeFilter('all')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setTypeFilter('product')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                typeFilter === 'product' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              <span>Produtos Físicos</span>
            </button>
            <button
              onClick={() => setTypeFilter('service')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                typeFilter === 'service' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>Serviços & Agendamentos</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-500 font-medium">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="featured">Destaques da Loja</option>
              <option value="rating">Mais Bem Avaliados (★)</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>

        </div>

        {/* Products & Services Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Nenhum item encontrado</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Não encontramos produtos ou serviços correspondentes aos filtros selecionados.
            </p>
            <button
              onClick={() => {
                setActiveSegment('all');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((item) => {
              const isService = item.type === 'service';
              const discountPercent = item.originalPrice
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col cursor-pointer"
                  onClick={() => setSelectedProduct(item)}
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge: Product or Service */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${
                          isService
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        {isService ? (
                          <>
                            <Calendar className="w-3 h-3" />
                            <span>Serviço</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3" />
                            <span>Produto Físico</span>
                          </>
                        )}
                      </span>

                      {discountPercent > 0 && (
                        <span className="bg-rose-500 text-white px-2 py-1 rounded-lg text-[11px] font-bold shadow-sm">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Duration / Location for services */}
                    {isService && item.duration && (
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Duração: {item.duration}</span>
                        </span>
                        <span className="capitalize text-slate-600">
                          {item.serviceLocation}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & SKU */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{item.rating.toFixed(1)}</span>
                          <span className="text-slate-400 font-normal">
                            ({item.reviewCount})
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                          {item.sku}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Footer: Price & Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        {item.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through block">
                            R$ {item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <div className="text-lg font-extrabold text-slate-900">
                          R$ {item.price.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isService) {
                            setSelectedProduct(item);
                          } else {
                            addToCart(item, 1);
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                        style={{
                          backgroundColor: isService ? '#4F46E5' : theme.primaryColor,
                        }}
                      >
                        {isService ? (
                          <>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Agendar</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Comprar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Customer Testimonials & Reviews Showcase */}
        <section className="mt-20 pt-12 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
              Depoimentos Reais
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              O que dizem os clientes da VÍTRIO
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Avaliações verificadas de compras e agendamentos realizados na plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">
                "Comprei a camisa de linho e fiquei impressionada com o acabamento artesanal. Chegou muito rápido e o atendimento pelo WhatsApp foi impecável."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                  GP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Guilherme Prado</h4>
                  <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Comprador Verificado
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">
                "A facilidade de agendar a consultoria de estilo e pagar no Pix no mesmo fluxo foi incrível. O relatório entregue agregou muito valor!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  RV
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Renata Vasconcellos</h4>
                  <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Cliente de Serviço
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">
                "O café especial Mogiana tem notas sensacionais. É muito bom ter uma plataforma que valoriza produtores locais e serviços de bairro."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                  AZ
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">André Zanetti</h4>
                  <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Comprador Verificado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="mt-24 bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-xs">
            
            {/* Store Information */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  V
                </div>
                <span className="text-white font-bold text-base tracking-tight">
                  {theme.storeName}
                </span>
              </div>
              <p className="text-slate-400 mb-4 leading-relaxed">
                {theme.tagline}
              </p>
              <p className="text-slate-500 text-[11px]">
                Plataforma de E-commerce & Transformação Digital Multisegmento.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-[11px]">
                Atendimento & Loja
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{theme.contactAddress}</span>
                </li>
                <li>WhatsApp: {theme.contactPhone}</li>
                <li>E-mail: {theme.contactEmail}</li>
                <li>Instagram: {theme.contactInstagram}</li>
              </ul>
            </div>

            {/* Quick Segments */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-[11px]">
                Segmentos Atendidos
              </h4>
              <ul className="space-y-1.5">
                <li>• Moda Autoral & Vestuário</li>
                <li>• Beleza, Estética & Bem-Estar</li>
                <li>• Consultoria & Serviços Especializados</li>
                <li>• Casa, Decoração & Cerâmicas</li>
                <li>• Gastronomia & Microlotes</li>
              </ul>
            </div>

            {/* Security & Tech */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-[11px]">
                Segurança & Arquitetura
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Criptografia SSL TLS 1.3</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Conformidade com a LGPD</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>PCI-DSS Tokenizado</span>
                </div>
                <button
                  onClick={() => setView('tech-spec')}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Ver Especificação Técnica Completa</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} VÍTRIO. Todos os direitos reservados. CNPJ: 45.123.456/0001-78.</p>
            <div className="flex items-center gap-4">
              <span>Termos de Uso</span>
              <span>Privacidade</span>
              <span>Central de Ajuda</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
