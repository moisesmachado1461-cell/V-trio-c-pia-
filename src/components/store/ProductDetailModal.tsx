import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_REVIEWS } from '../../data/initialData';
import {
  X,
  Star,
  ShoppingBag,
  Calendar,
  Clock,
  MapPin,
  Check,
  ShieldCheck,
  Truck,
  Heart,
  Share2,
  ChevronRight
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, theme } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('Padrão');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-14');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [serviceNotes, setServiceNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'reviews'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedProduct) return null;

  const isService = selectedProduct.type === 'service';
  const reviews = INITIAL_REVIEWS.filter((r) => r.productId === selectedProduct.id);

  // Time slots for services
  const availableSlots = ['09:00', '10:30', '14:00', '15:30', '17:00'];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, {
      selectedVariant: isService ? undefined : selectedVariant,
      selectedDate: isService ? selectedDate : undefined,
      selectedTime: isService ? selectedTime : undefined,
      notes: isService ? serviceNotes : undefined,
    });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProduct(null);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
                <img
                  src={selectedProduct.images[selectedImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-sm ${
                      isService ? 'bg-indigo-600' : 'bg-slate-900'
                    }`}
                  >
                    {isService ? <Calendar className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    {isService ? 'Serviço Agendável' : 'Produto Físico'}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Garantia de Satisfação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{isService ? 'Confirmação Imediata' : 'Envio com Rastreio'}</span>
                </div>
              </div>
            </div>

            {/* Info & Purchase Column */}
            <div className="flex flex-col justify-between">
              <div>
                {/* SKU & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">SKU: {selectedProduct.sku}</span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{selectedProduct.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">
                      ({selectedProduct.reviewCount} avaliações)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 leading-snug">
                  {selectedProduct.title}
                </h2>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    R$ {selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      R$ {selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedProduct.originalPrice && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      Economize R$ {(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  {selectedProduct.shortDescription}
                </p>

                {/* Service Scheduling Options */}
                {isService ? (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                      <span className="flex items-center gap-1.5 text-indigo-700">
                        <Clock className="w-4 h-4" /> Duração: {selectedProduct.duration}
                      </span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3.5 h-3.5" /> Modalidade: <b className="capitalize">{selectedProduct.serviceLocation}</b>
                      </span>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Escolha a data do atendimento:
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Time Slot Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Horários disponíveis:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              selectedTime === slot
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Service Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Observações ou preferências para o profissional:
                      </label>
                      <input
                        type="text"
                        value={serviceNotes}
                        onChange={(e) => setServiceNotes(e.target.value)}
                        placeholder="Ex: Foco no ombro, alergia a fragrância, etc."
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                ) : (
                  /* Physical product options */
                  <div className="mb-6 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Opção / Variação:
                      </label>
                      <div className="flex gap-2">
                        {['Padrão', 'Tamanho P', 'Tamanho M', 'Tamanho G'].map((variant) => (
                          <button
                            key={variant}
                            type="button"
                            onClick={() => setSelectedVariant(variant)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              selectedVariant === variant
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-xs font-bold text-slate-700">Quantidade:</span>
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 text-slate-600 hover:bg-slate-100 text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-slate-900 min-w-[32px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 text-slate-600 hover:bg-slate-100 text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-medium">
                        ✓ {selectedProduct.stock} unidades em estoque
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 ${
                    addedAnimation ? 'bg-emerald-600 scale-95' : 'hover:opacity-95'
                  }`}
                  style={{
                    backgroundColor: addedAnimation
                      ? '#10B981'
                      : isService
                      ? '#4F46E5'
                      : theme.primaryColor,
                  }}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>{isService ? 'Horário Reservado!' : 'Adicionado à Sacola!'}</span>
                    </>
                  ) : (
                    <>
                      {isService ? <Calendar className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      <span>
                        {isService
                          ? `Agendar para ${selectedDate} às ${selectedTime} • R$ ${selectedProduct.price.toFixed(2)}`
                          : `Adicionar à Sacola • R$ ${(selectedProduct.price * quantity).toFixed(2)}`}
                      </span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Tabs: Details, Features, Reviews */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="flex border-b border-slate-200 gap-6 text-xs font-bold mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'details' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Descrição Completa
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'features' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Destaques & Ficha Técnica ({selectedProduct.features.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'reviews' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Avaliações de Clientes ({reviews.length > 0 ? reviews.length : selectedProduct.reviewCount})
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'details' && (
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                <p>{selectedProduct.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                {selectedProduct.features.map((feat, index) => (
                  <li key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-slate-900">{rev.customerName}</span>
                        <span className="text-slate-400 text-[10px]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-slate-600">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Este item possui nota média {selectedProduct.rating} baseada em {selectedProduct.reviewCount} compras verificadas.
                  </p>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
