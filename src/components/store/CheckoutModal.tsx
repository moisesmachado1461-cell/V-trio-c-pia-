import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethodType, Order } from '../../types';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Barcode,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Truck,
  Lock,
  ExternalLink
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    createOrder,
    theme,
    setView,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('Mariana Silveira');
  const [customerEmail, setCustomerEmail] = useState('mariana.silveira@email.com');
  const [customerPhone, setCustomerPhone] = useState('(11) 99123-4567');
  const [customerDocument, setCustomerDocument] = useState('341.892.418-89');

  // Address
  const [zipCode, setZipCode] = useState('01401-000');
  const [street, setStreet] = useState('Av. Brigadeiro Luis Antonio');
  const [number, setNumber] = useState('2345');
  const [complement, setComplement] = useState('Apto 102');
  const [neighborhood, setNeighborhood] = useState('Jardins');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pix');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('MARIANA SILVEIRA');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('888');
  const [installments, setInstallments] = useState(1);

  if (!isCheckoutOpen) return null;

  const handleFinishOrder = () => {
    const order = createOrder({
      customerName,
      customerEmail,
      customerPhone,
      customerDocument,
      paymentMethod,
      installments: paymentMethod === 'credit_card' ? installments : 1,
      shippingAddress: {
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
      },
    });

    setCreatedOrder(order);
    setStep(4);
  };

  const handleCopyPix = () => {
    if (createdOrder?.pixCode) {
      navigator.clipboard.writeText(createdOrder.pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Checkout Seguro • {theme.storeName}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 3) */}
        {step < 4 && (
          <div className="bg-slate-100/70 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-slate-900' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                1
              </span>
              <span>Identificação</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-slate-900' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 2 ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                2
              </span>
              <span>Entrega</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-slate-900' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 3 ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                3
              </span>
              <span>Pagamento</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: CUSTOMER INFO */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Dados do Cliente</h3>
              <p className="text-xs text-slate-500">
                Utilizados para emissão da nota fiscal eletrônica e envio das atualizações do pedido.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-mail:
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp / Celular:
                    </label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CPF (obrigatório para NF-e):
                  </label>
                  <input
                    type="text"
                    value={customerDocument}
                    onChange={(e) => setCustomerDocument(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Seus dados são protegidos conforme as diretrizes da LGPD (Lei 13.709/18).</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Endereço de Entrega ou Localização</h3>
              <p className="text-xs text-slate-500">
                Endereço para despacho de produtos físicos ou referência geográfica para serviços.
              </p>

              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CEP:</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bairro:</label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Logradouro / Rua:</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Número:</label>
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Complemento:</label>
                    <input
                      type="text"
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      placeholder="Apto, Bloco..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade:</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estado:</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 uppercase"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Envio Padrão com Rastreamento dos Correios / Loggi</span>
                  </span>
                  <span className="font-bold">
                    {cartShipping === 0 ? 'GRÁTIS' : `R$ ${cartShipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900">Escolha a Forma de Pagamento</h3>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'pix'
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <QrCode className={`w-5 h-5 ${paymentMethod === 'pix' ? 'text-emerald-600' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold text-slate-900">Pix Instantâneo</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                    Aprovação Imediata
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'credit_card'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'credit_card' ? 'text-indigo-600' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold text-slate-900">Cartão de Crédito</span>
                  <span className="text-[10px] text-slate-500">Até 12x</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('boleto')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'boleto'
                      ? 'border-slate-800 bg-slate-100 ring-2 ring-slate-800/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Barcode className={`w-5 h-5 ${paymentMethod === 'boleto' ? 'text-slate-900' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold text-slate-900">Boleto Bancário</span>
                  <span className="text-[10px] text-slate-500">Vence em 3 dias</span>
                </button>
              </div>

              {/* Method Specific Form */}
              {paymentMethod === 'pix' && (
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Como funciona o pagamento via Pix:</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Ao confirmar o pedido, geramos o QR Code dinâmico e o código Copia e Cola para você pagar diretamente pelo app do seu banco. O pedido é aprovado e separado em segundos!
                  </p>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Número do Cartão (Simulação Tokenizada):
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nome Impresso no Cartão:
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Validade:</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">CVV:</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Opções de Parcelamento:
                    </label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
                    >
                      <option value={1}>1x de R$ {cartTotal.toFixed(2)} (Sem juros)</option>
                      <option value={2}>2x de R$ {(cartTotal / 2).toFixed(2)} (Sem juros)</option>
                      <option value={3}>3x de R$ {(cartTotal / 3).toFixed(2)} (Sem juros)</option>
                      <option value={6}>6x de R$ {(cartTotal / 6).toFixed(2)} (Sem juros)</option>
                      <option value={12}>12x de R$ {((cartTotal * 1.08) / 12).toFixed(2)} (Com juros)</option>
                    </select>
                  </div>

                  <p className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tokenização direta com padrão internacional PCI-DSS Level 1.</span>
                  </p>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-900">Emissão de Boleto Bancário</p>
                  <p>O boleto será gerado na tela seguinte para impressão ou pagamento via código de barras. Compensação bancária em até 2 dias úteis.</p>
                </div>
              )}

              {/* Order Summary box */}
              <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Itens ({cart.length})</span>
                  <span>R$ {cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Desconto ({appliedCoupon?.code})</span>
                    <span>- R$ {cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Frete</span>
                  <span>{cartShipping === 0 ? 'Grátis' : `R$ ${cartShipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total a pagar</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: SUCCESS / CONFIRMATION */}
          {step === 4 && createdOrder && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Pedido Registrado com Sucesso
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Pedido #{createdOrder.id}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enviamos o comprovante para <b>{createdOrder.customerEmail}</b>
                </p>
              </div>

              {/* Pix Payment box if method is pix */}
              {createdOrder.paymentMethod === 'pix' && (
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 text-left space-y-4 max-w-md mx-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-emerald-700" />
                      Pagar com Pix Instantâneo:
                    </span>
                    <span className="text-xs font-extrabold text-emerald-900">
                      R$ {createdOrder.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Simulated QR Code Graphic */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 flex flex-col items-center justify-center">
                    <div className="w-36 h-36 bg-slate-900 p-2 rounded-lg flex items-center justify-center">
                      <div className="w-full h-full bg-white p-1 grid grid-cols-6 grid-rows-6 gap-0.5">
                        {[...Array(36)].map((_, i) => (
                          <div
                            key={i}
                            className={`${
                              (i % 2 === 0 || i % 3 === 0 || i === 0 || i === 5 || i === 30 || i === 35)
                                ? 'bg-slate-900'
                                : 'bg-white'
                            } rounded-xs`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-2">
                      Abra o app do seu banco e aponte a câmera
                    </span>
                  </div>

                  {/* Copy & Paste Code */}
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                      Código Pix Copia e Cola:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={createdOrder.pixCode}
                        className="flex-1 bg-white border border-emerald-200 text-[10px] font-mono text-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none"
                      />
                      <button
                        onClick={handleCopyPix}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setView('admin');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <span>Ver Pedido no Painel Admin</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Continuar Navegando
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation (Step 1 to 3) */}
        {step < 4 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="px-5 py-2.5 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>Avançar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishOrder}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirmar Pedido (R$ {cartTotal.toFixed(2)})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
