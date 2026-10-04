import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  User,
  ShoppingBag,
  Calendar,
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CustomerProfileModal: React.FC = () => {
  const { isProfileOpen, setIsProfileOpen, orders, theme } = useStore();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedPixId, setCopiedPixId] = useState<string | null>(null);

  if (!isProfileOpen) return null;

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleCopyPix = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPixId(id);
    setTimeout(() => setCopiedPixId(null), 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Aprovado
          </span>
        );
      case 'shipped':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
            <Truck className="w-3 h-3" /> Em Transporte
          </span>
        );
      case 'processing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Em Preparação
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Aguardando Pix
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Área do Cliente • Meus Pedidos
              </h2>
              <p className="text-xs text-slate-500">
                Histórico de compras e agendamentos de serviços
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">Nenhum pedido realizado ainda.</p>
              <p className="text-xs text-slate-500 mt-1">
                Adicione produtos ou serviços à sua sacola para vê-los listados aqui!
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all"
                >
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-4 cursor-pointer flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-extrabold text-sm text-slate-900">
                          #{order.id}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')} • {order.items.length}{' '}
                        {order.items.length === 1 ? 'item' : 'itens'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900 block">
                          R$ {order.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">
                          {order.paymentMethod === 'pix' ? 'Pix' : order.paymentMethod === 'credit_card' ? 'Cartão' : 'Boleto'}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200 bg-white space-y-3 text-xs">
                      {/* Tracking if available */}
                      {order.trackingCode && (
                        <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-blue-900">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Truck className="w-4 h-4 text-blue-600" />
                            <span>Rastreio Correios: {order.trackingCode}</span>
                          </span>
                          <span className="text-[11px] font-bold text-blue-700 underline cursor-pointer">
                            Rastrear Pacote
                          </span>
                        </div>
                      )}

                      {/* Items */}
                      <div className="space-y-2 pt-1">
                        <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                          Itens do Pedido:
                        </span>
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 p-2 bg-slate-50 rounded-xl"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.title}
                                className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="font-bold text-slate-900 truncate text-xs">
                                  {item.product.title}
                                </h4>
                                <span className="text-[11px] text-slate-500">
                                  Qtd: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant}` : ''}
                                  {item.selectedDate ? `• Agendado: ${item.selectedDate} às ${item.selectedTime}` : ''}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-slate-900 shrink-0">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping address */}
                      <div className="pt-2 border-t border-slate-100 text-slate-600 text-[11px]">
                        <span className="font-bold text-slate-700 block">Endereço de Entrega:</span>
                        <p>
                          {order.shippingAddress.street}, {order.shippingAddress.number}
                          {order.shippingAddress.complement ? ` - ${order.shippingAddress.complement}` : ''}
                        </p>
                        <p>
                          {order.shippingAddress.neighborhood} - {order.shippingAddress.city}/
                          {order.shippingAddress.state} - CEP {order.shippingAddress.zipCode}
                        </p>
                      </div>

                      {/* Pix pending reminder */}
                      {order.status === 'pending' && order.pixCode && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mt-2 space-y-2">
                          <p className="font-bold text-amber-900 text-xs">
                            Pagamento via Pix ainda pendente
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              readOnly
                              value={order.pixCode}
                              className="flex-1 bg-white border border-amber-200 text-[10px] font-mono p-1.5 rounded-lg"
                            />
                            <button
                              onClick={() => handleCopyPix(order.pixCode!, order.id)}
                              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                            >
                              {copiedPixId === order.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedPixId === order.id ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
