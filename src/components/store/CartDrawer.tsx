import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  CheckCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    theme,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Free shipping progress calculation
  const freeShippingThreshold = 250;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              <h2 className="text-base font-bold text-slate-900">
                Sua Sacola de Compras
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {cart.length > 0 && (
            <div className="bg-amber-50/70 p-3.5 border-b border-amber-200/60">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-amber-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  {remainingForFreeShipping > 0 ? (
                    <>Faltam <b>R$ {remainingForFreeShipping.toFixed(2)}</b> para Frete Grátis!</>
                  ) : (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Parabéns! Você ganhou Frete Grátis!
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-amber-700 font-bold">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Sua sacola está vazia</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Navegue pelo nosso catálogo multisegmento e adicione produtos artesanais ou serviços especializados.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const isService = item.product.type === 'service';
                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-3 relative"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Service or variant tags */}
                      {isService ? (
                        <div className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 inline-flex items-center gap-1 my-1 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {item.selectedDate || 'Data a definir'} às {item.selectedTime || 'Horário flexível'}
                          </span>
                        </div>
                      ) : (
                        item.selectedVariant && (
                          <div className="text-[10px] text-slate-500 my-0.5">
                            Opção: {item.selectedVariant}
                          </div>
                        )
                      )}

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                        <span className="text-xs font-extrabold text-slate-900">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 font-bold text-slate-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with totals & checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Coupon Form */}
              <div className="space-y-1.5">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Cupom de desconto (ex: BEMVINDO10)"
                      className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs uppercase font-medium text-slate-800 placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Aplicar
                  </button>
                </form>

                {couponFeedback && (
                  <p
                    className={`text-[11px] ${
                      couponFeedback.success ? 'text-emerald-600 font-medium' : 'text-rose-500'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}

                {/* Applied Coupon Pill */}
                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedCoupon.code} aplicado</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:text-rose-800 text-[11px] font-bold underline"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    R$ {cartSubtotal.toFixed(2)}
                  </span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Desconto ({appliedCoupon?.code})</span>
                    <span>- R$ {cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete / Deslocamento</span>
                  <span className="font-semibold text-slate-800">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">GRÁTIS</span>
                    ) : (
                      `R$ ${cartShipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>Finalizar Pedido com Segurança</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Ambiente criptografado TLS 1.3 • Pix Instantâneo & Cartão 12x
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
