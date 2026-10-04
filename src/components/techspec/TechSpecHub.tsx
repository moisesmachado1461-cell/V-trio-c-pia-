import React, { useState } from 'react';
import {
  TECH_SPEC_SECTIONS,
  ARCHITECTURE_DETAILS,
  SQL_SCHEMA_CODE,
  ROADMAP_PHASES,
  EFFORT_MATRIX,
  SECURITY_COMPLIANCE,
} from '../../data/techSpecData';
import { useStore } from '../../context/StoreContext';
import {
  Server,
  Database,
  Layers,
  Calendar,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  Code2,
  Cpu,
  Sparkles,
  Zap,
  TrendingUp,
  FileText,
  Printer,
  ShoppingBag,
  Store,
  CheckCircle2
} from 'lucide-react';

export const TechSpecHub: React.FC = () => {
  const { setView } = useStore();
  const [selectedSection, setSelectedSection] = useState<string>('architecture');
  const [copiedSql, setCopiedSql] = useState(false);
  const [filterComplexity, setFilterComplexity] = useState<string>('all');

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_CODE);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredEffort = EFFORT_MATRIX.filter((item) => {
    if (filterComplexity === 'all') return true;
    return item.complexity.toLowerCase() === filterComplexity.toLowerCase();
  });

  const totalEffortHours = EFFORT_MATRIX.reduce((acc, curr) => acc + curr.hours, 0);
  const totalStoryPoints = EFFORT_MATRIX.reduce((acc, curr) => acc + curr.storyPoints, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
      
      {/* Top Spec Header */}
      <div className="bg-slate-950/80 border-b border-slate-800 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ARQUITETURA DE SOLUÇÕES • PME DIGITAL
                </span>
                <span className="text-xs text-slate-400">VÍTRIO Plataforma E-commerce</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Especificação Técnica & Blueprint de Desenvolvimento
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
                Documentação arquitetural completa para migração de comércio físico para digital, multisegmento (produtos e serviços), painel no-code e baixo custo operacional.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <span>Imprimir / PDF</span>
              </button>

              <button
                onClick={() => setView('store')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30"
              >
                <Store className="w-4 h-4" />
                <span>Testar Loja ao Vivo</span>
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-thin">
            {TECH_SPEC_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  selectedSection === sec.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{sec.shortTitle}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  selectedSection === sec.id ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {sec.badge}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* SECTION 1: ARCHITECTURE & STACK */}
        {selectedSection === 'architecture' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Executive Summary */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 shrink-0">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    Visão Geral da Arquitetura Técnica
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {ARCHITECTURE_DETAILS.philosophy}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>Custo Estimado de Infraestrutura: {ARCHITECTURE_DETAILS.totalInitialMonthlyCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Layers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ARCHITECTURE_DETAILS.layers.map((layer, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      {layer.name}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      {layer.cost}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">
                    {layer.tech}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {layer.reason}
                  </p>
                </div>
              ))}
            </div>

            {/* Topology Diagram (Visual Representation) */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Fluxo de Dados & Topologia da Rede</span>
              </h3>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3 font-mono">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="px-2 py-1 bg-indigo-900/60 text-indigo-300 rounded border border-indigo-700">
                    Cliente (Navegador / Smartphone PWA)
                  </span>
                  <span>── HTTPS (TLS 1.3) ──▶</span>
                  <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
                    Cloudflare CDN Edge
                  </span>
                  <span>──▶</span>
                  <span className="px-2 py-1 bg-emerald-900/60 text-emerald-300 rounded border border-emerald-700">
                    Frontend React SPA
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 pl-8">
                  <span>│</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <span className="px-2 py-1 bg-amber-900/60 text-amber-300 rounded border border-amber-700">
                    API Gateway / Express Serverless
                  </span>
                  <span>── Zod Schemas & JWT Auth ──▶</span>
                  <span className="px-2 py-1 bg-blue-900/60 text-blue-300 rounded border border-blue-700">
                    PostgreSQL Relacional (Neon / Cloud SQL)
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-300 pl-8">
                  <span>│ (Webhooks Assinados HMAC-SHA256)</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <span className="px-2 py-1 bg-rose-900/60 text-rose-300 rounded border border-rose-700">
                    Gateway de Pagamento (Mercado Pago / Asaas / Pagar.me)
                  </span>
                  <span>◀── Notificação Pix Instantâneo ──</span>
                  <span className="px-2 py-1 bg-cyan-900/60 text-cyan-300 rounded border border-cyan-700">
                    Baixa Automática no Pedido & WhatsApp Alert
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 2: RELATIONAL DATABASE & SCHEMAS */}
        {selectedSection === 'database' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <span>Modelo Relacional & DDL SQL (PostgreSQL 16)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Arquitetura polimórfica que unifica produtos físicos e serviços com horários agendáveis em uma base transacional ACID.
                </p>
              </div>

              <button
                onClick={handleCopySql}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                {copiedSql ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'SQL Copiado para Área de Transferência!' : 'Copiar DDL Completo'}</span>
              </button>
            </div>

            {/* Visual DER Table Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Tabela: stores & store_themes
                </span>
                <p className="text-xs text-slate-300">
                  Armazena os parâmetros no-code: paleta de cores, logotipo, tipografia, slogan e chaves Pix da loja.
                </p>
                <span className="text-[10px] font-mono text-slate-500">Chave Primária: store_id (UUID)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Tabela: items (Polimórfica)
                </span>
                <p className="text-xs text-slate-300">
                  Campo item_type ('product' ou 'service'). Se produto: estoque e peso; se serviço: duração e modalidade.
                </p>
                <span className="text-[10px] font-mono text-slate-500">Índice: (store_id, is_active)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Tabela: orders & payments
                </span>
                <p className="text-xs text-slate-300">
                  Controle transacional de status, parcelamento, endereço imutável (JSON snapshot) e payload do Pix.
                </p>
                <span className="text-[10px] font-mono text-slate-500">Integridade ACID com transações</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Tabela: service_appointments
                </span>
                <p className="text-xs text-slate-300">
                  Slots de data e hora para serviços com validação de conflito de agenda (prevenção de double-booking).
                </p>
                <span className="text-[10px] font-mono text-slate-500">Range Index em scheduled_start</span>
              </div>
            </div>

            {/* Code Viewer */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300">schema_vitrio_postgresql.sql</span>
                </div>
                <span>PostgreSQL DDL Ready</span>
              </div>
              <pre className="p-5 text-xs text-slate-200 font-mono overflow-x-auto leading-relaxed max-h-[550px] scrollbar-thin">
                {SQL_SCHEMA_CODE}
              </pre>
            </div>
          </div>
        )}

        {/* SECTION 3: WIREFRAMES & UX */}
        {selectedSection === 'wireframes' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Mapeamento de Wireframes & Experiência do Usuário (UX/UI)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Fluxos projetados com foco em zero fricção de compra no mobile e máxima simplicidade operacional para o lojista leigo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Flow 1 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Fluxo 01 • Descoberta & Filtros</span>
                  <span className="text-[10px] text-slate-500">Cliente</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Navegação Multisegmento em 1 Clique
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O consumidor transita entre Moda, Beleza, Decoração e Serviços através de carrossel de pílulas rápidas sem recarregar a página, com contadores de itens em tempo real.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div>✓ Filtro duplo: Categoria temática + Tipo (Produto Físico vs Serviço)</div>
                  <div>✓ Busca instantânea por título, descrição e SKU</div>
                  <div>✓ Badges claras de "Serviço com Hora Marcada" vs "Produto em Estoque"</div>
                </div>
              </div>

              {/* Flow 2 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Fluxo 02 • Agendamento Integrado</span>
                  <span className="text-[10px] text-slate-500">Cliente & Lojista</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Seleção de Data, Hora e Modalidade
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Elimina o vai-e-volta cansativo no WhatsApp. O cliente seleciona o dia, horário vago e preenche observações que chegam diretamente ao painel do prestador.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div>✓ Duração estimada visível (ex: 1h 30min)</div>
                  <div>✓ Escolha entre atendimento presencial, online ou a domicílio</div>
                  <div>✓ Reserva confirmada imediatamente após aprovação do pagamento</div>
                </div>
              </div>

              {/* Flow 3 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Fluxo 03 • Checkout One-Step & Pix</span>
                  <span className="text-[10px] text-slate-500">Conversão de Vendas</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Pagamento Dinâmico em Segundos
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sem formulários quilométricos. O cliente informa nome, CPF para emissão da nota, escolhe Pix (com QR Code imediato na tela) ou cartão em até 12x.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div>✓ Código Pix Copia-e-Cola com 1 toque no celular</div>
                  <div>✓ Barra de progresso rumo ao Frete Grátis na sacola</div>
                  <div>✓ Aplicação instantânea de cupons de lançamento</div>
                </div>
              </div>

              {/* Flow 4 */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">Fluxo 04 • Customizador No-Code</span>
                  <span className="text-[10px] text-slate-500">Lojista / Admin</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Edição Visual em Tempo Real
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O lojista troca cores primárias, secundárias, fontes, slogan e avisos no painel e assiste a transformação visual imediata da vitrine sem precisar programar nada.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div>✓ Paletas prontas ou seletor de cores hexadecimal livre</div>
                  <div>✓ Modos de tipografia (Plus Jakarta, Playfair, Space Grotesk)</div>
                  <div>✓ Esteira Kanban de pedidos com arrastar ou clique de avanço</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 4: DEVELOPMENT ROADMAP */}
        {selectedSection === 'roadmap' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <span>Roteiro de Desenvolvimento Incremental (MVP ao Scale-Up)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Estratégia faseada para minimizar riscos financeiros para o pequeno empresário, iniciando as vendas em 4 semanas.
              </p>
            </div>

            <div className="space-y-4">
              {ROADMAP_PHASES.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-extrabold text-sm flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-extrabold text-white">
                          {phase.phase}: {phase.name}
                        </h3>
                        <p className="text-xs text-indigo-400 font-medium">
                          Objetivo: {phase.focus}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                        {phase.duration}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phase.badgeColor}`}>
                        {phase.tag}
                      </span>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-4 text-xs text-slate-300">
                    {phase.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: EFFORT & COMPLEXITY MATRIX */}
        {selectedSection === 'effort' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <span>Matriz de Esforço, Complexidade & Estimativas</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Mapeamento de horas de engenharia por módulo com análise de risco técnico e story points.
                </p>
              </div>

              {/* Total Summary Pills */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-right">
                  <span className="text-slate-400 block text-[10px]">Total Estimado</span>
                  <span className="font-extrabold text-amber-400 text-sm">{totalEffortHours} Horas</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-right">
                  <span className="text-slate-400 block text-[10px]">Story Points</span>
                  <span className="font-extrabold text-indigo-400 text-sm">{totalStoryPoints} pts</span>
                </div>
              </div>
            </div>

            {/* Filter by Complexity */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filtrar por Complexidade:</span>
              <button
                onClick={() => setFilterComplexity('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterComplexity === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterComplexity('Média')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterComplexity === 'Média' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Média
              </button>
              <button
                onClick={() => setFilterComplexity('Alta')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  filterComplexity === 'Alta' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Alta / Muito Alta
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Componente / Módulo</th>
                    <th className="p-3.5">Fase</th>
                    <th className="p-3.5">Complexidade</th>
                    <th className="p-3.5">Horas</th>
                    <th className="p-3.5">Story Points</th>
                    <th className="p-3.5">Stack Técnica</th>
                    <th className="p-3.5">Risco Técnico & Mitigação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredEffort.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {item.component}
                      </td>
                      <td className="p-3.5">
                        <span className="font-mono text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                          {item.phase}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.complexity === 'Muito Alta'
                              ? 'bg-purple-900 text-purple-200'
                              : item.complexity === 'Alta'
                              ? 'bg-rose-900 text-rose-200'
                              : 'bg-amber-900 text-amber-200'
                          }`}
                        >
                          {item.complexity}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-amber-400">
                        {item.hours}h
                      </td>
                      <td className="p-3.5 font-mono font-bold text-indigo-400">
                        {item.storyPoints}
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {item.stack}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {item.risk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 6: SECURITY & COMPLIANCE */}
        {selectedSection === 'security' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Segurança da Informação, LGPD & Conformidade de Pagamentos</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Estratégias de blindagem jurídica e técnica para garantir a privacidade dos clientes e a conformidade financeira.
              </p>
            </div>

            {/* LGPD Section */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SECURITY_COMPLIANCE.lgpd.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 block">
                      {item.requirement}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.implementation}
                    </p>
                    <div className="pt-2 text-[10px] font-mono text-slate-500">
                      Impacto: {item.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PCI-DSS Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Padrão de Segurança de Dados de Cartão (PCI-DSS SAQ A)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SECURITY_COMPLIANCE.pciDss.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-amber-400 block">
                      {item.principle}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-2 text-[10px] text-slate-500">
                      Escopo: {item.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Security */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span>Segurança Operacional, Webhooks & RBAC</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SECURITY_COMPLIANCE.operationalSecurity.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-indigo-400 block">
                      {item.title}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
