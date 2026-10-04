export interface TechSpecSection {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  summary: string;
}

export const TECH_SPEC_SECTIONS: TechSpecSection[] = [
  {
    id: 'architecture',
    title: '1. Arquitetura Técnica & Stack Recomendada',
    shortTitle: 'Arquitetura',
    badge: 'Stack & Cloud',
    summary: 'Arquitetura modular focada em baixo custo inicial (bootstrapping para PMEs) com capacidade de escala horizontal automática.',
  },
  {
    id: 'database',
    title: '2. Estrutura & Modelagem de Banco de Dados',
    shortTitle: 'Banco de Dados',
    badge: 'PostgreSQL Relacional',
    summary: 'Diagrama Entidade-Relacionamento (DER), DDL SQL completo para produtos físicos e serviços agendáveis, integridade ACID.',
  },
  {
    id: 'wireframes',
    title: '3. Wireframes & Fluxos Principais (UX/UI)',
    shortTitle: 'Wireframes & UX',
    badge: 'Design System',
    summary: 'Mapeamento visual e comportamental dos fluxos críticos: Descoberta, Carrinho Inteligente, Checkout One-Step e Painel Admin.',
  },
  {
    id: 'roadmap',
    title: '4. Roteiro de Desenvolvimento (Fases & Sprints)',
    shortTitle: 'Roteiro de Desenvolvimento',
    badge: 'Plano Incremental',
    summary: 'Cronograma progressivo em 5 fases evolutivas para lançamento rápido de MVP em 4 semanas e evolução contínua.',
  },
  {
    id: 'effort',
    title: '5. Estimativa de Esforço, Complexidade & Custos',
    shortTitle: 'Esforço & Custos',
    badge: 'Estimativa & ROI',
    summary: 'Matriz detalhada de horas por módulo, story points, complexidade técnica, riscos mitigados e projeção de custo de infraestrutura.',
  },
  {
    id: 'security',
    title: '6. Segurança, LGPD & Compliance de Pagamentos',
    shortTitle: 'Segurança & Compliance',
    badge: 'LGPD & PCI-DSS',
    summary: 'Proteção de dados do consumidor (LGPD), tokenização e isolamento PCI-DSS, idempotência de webhooks e RBAC para funcionários.',
  },
];

export const ARCHITECTURE_DETAILS = {
  philosophy: 'Princípio do "Monólito Modular com Serverless Edge": máxima velocidade de entrega, mínimo overhead operacional e custo de infraestrutura próximo de zero nos primeiros meses para viabilizar pequenos e médios negócios.',
  layers: [
    {
      name: 'Camada de Apresentação (Frontend)',
      tech: 'React 19 + TypeScript + Vite + Tailwind CSS',
      reason: 'Carregamento ultrarrápido (< 1.2s First Contentful Paint), sem dependência pesada de servidor, compatível com PWA (Progressive Web App) para funcionar como app no smartphone do cliente.',
      cost: 'R$ 0/mês (Hospedado em CDN Cloudflare Pages / Vercel Hobby / Cloud Run)'
    },
    {
      name: 'Camada de Negócio & API (Backend)',
      tech: 'Node.js / Express + TypeScript (ou Next.js Serverless Routes)',
      reason: 'Endpoints RESTful tipados com Zod para validação rigorosa de payloads. Processamento de checkout, geração de Pix em tempo real e webhooks bancários.',
      cost: 'R$ 0 a R$ 35/mês (Tier gratuito do Google Cloud Run ou Render Starter)'
    },
    {
      name: 'Camada de Dados Relacional',
      tech: 'PostgreSQL 16 gerenciado (ex: Neon Serverless / Supabase / Cloud SQL)',
      reason: 'Garantia de integridade referencial ACID essencial para finanças, estoque em concorrência e agendamento de horários sem double-booking.',
      cost: 'R$ 0/mês (Free Tier Neon até 0.5 GB de dados) escalando sob demanda'
    },
    {
      name: 'Camada de Armazenamento de Arquivos',
      tech: 'Cloudflare R2 / Google Cloud Storage com CDN',
      reason: 'Upload de fotos de produtos e logo da loja sem cobrança de taxa de tráfego de saída (zero egress fee no Cloudflare R2).',
      cost: 'R$ 0 a R$ 10/mês para até 10 GB de imagens otimizadas em WebP'
    },
    {
      name: 'Gateway de Pagamentos & Notificações',
      tech: 'Mercado Pago SDK / Asaas / Pagar.me + Twilio / WhatsApp Cloud API',
      reason: 'Taxas competitivas para Pix (0.7% a 0.99%) e cartão de crédito, aprovação instantânea e disparo de confirmação no WhatsApp do cliente.',
      cost: 'Sem mensalidade fixa (cobrança apenas por transação aprovada)'
    }
  ],
  totalInitialMonthlyCost: 'R$ 0 a R$ 45 / mês nos primeiros 6 meses de operação'
};

export const SQL_SCHEMA_CODE = `-- ========================================================
-- VÍTRIO E-COMMERCE MULTISEGMENTO - SCHEMA RELACIONAL POSTGRESQL
-- Suporte nativo a Produtos Físicos + Serviços Agendáveis
-- ========================================================

-- 1. LOJAS & CONFIGURAÇÕES VISUAIS (White-label No-Code)
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    legal_name VARCHAR(150) NOT NULL,
    trade_name VARCHAR(150) NOT NULL,
    cnpj_cpf VARCHAR(20) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE store_themes (
    store_id UUID PRIMARY KEY REFERENCES stores(id) ON DELETE CASCADE,
    logo_url TEXT,
    primary_color VARCHAR(10) DEFAULT '#0F172A',
    secondary_color VARCHAR(10) DEFAULT '#D97706',
    accent_color VARCHAR(10) DEFAULT '#10B981',
    font_family VARCHAR(50) DEFAULT 'Plus Jakarta Sans',
    border_radius VARCHAR(10) DEFAULT 'md',
    announcement_bar TEXT,
    hero_headline TEXT,
    hero_subheadline TEXT,
    hero_image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SEGMENTOS & CATEGORIAS
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(80) NOT NULL,
    slug VARCHAR(80) NOT NULL,
    segment_type VARCHAR(30) NOT NULL, -- 'fashion', 'services', 'beauty', 'decor', etc.
    icon_name VARCHAR(40),
    parent_id UUID REFERENCES categories(id),
    sort_order INT DEFAULT 0
);

-- 3. PRODUTOS & SERVIÇOS (Tabela Polimórfica Eficiente)
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('product', 'service')),
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    sku VARCHAR(50),
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10, 2),
    stock_quantity INT DEFAULT 0, -- Se item_type = 'product'
    duration_minutes INT,          -- Se item_type = 'service'
    service_delivery_mode VARCHAR(20), -- 'presencial', 'online', 'domicilio'
    weight_grams INT,              -- Para cálculo de frete
    dimensions_json JSONB,         -- { "width": 20, "height": 10, "length": 30 }
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 4. AGENDAMENTOS DE SERVIÇOS
CREATE TABLE service_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES items(id),
    customer_id UUID NOT NULL,
    order_id UUID,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(30) DEFAULT 'confirmed', -- 'pending', 'confirmed', 'completed', 'cancelled'
    notes TEXT
);

-- 5. CLIENTES & AUTENTICAÇÃO
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id),
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    document_cpf VARCHAR(14),
    password_hash VARCHAR(255) NOT NULL,
    marketing_consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_customer_store_email UNIQUE (store_id, email)
);

CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    label VARCHAR(40),
    street VARCHAR(150) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(50),
    neighborhood VARCHAR(80) NOT NULL,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT TRUE
);

-- 6. PEDIDOS & TRANSAÇÕES
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL REFERENCES stores(id),
    order_number VARCHAR(30) UNIQUE NOT NULL, -- Ex: VIT-9482
    customer_id UUID NOT NULL REFERENCES customers(id),
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'
    subtotal NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0,
    shipping_fee NUMERIC(10, 2) DEFAULT 0,
    total_amount NUMERIC(10, 2) NOT NULL,
    coupon_code VARCHAR(40),
    shipping_address_snapshot JSONB NOT NULL,
    tracking_code VARCHAR(60),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id),
    item_title VARCHAR(150) NOT NULL,
    item_type VARCHAR(20) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10, 2) NOT NULL,
    variant_details JSONB,
    appointment_id UUID REFERENCES service_appointments(id)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    gateway_provider VARCHAR(40) NOT NULL, -- 'mercadopago', 'asaas', 'stripe'
    gateway_payment_id VARCHAR(100),
    method VARCHAR(30) NOT NULL, -- 'pix', 'credit_card', 'boleto'
    status VARCHAR(30) DEFAULT 'pending',
    installments INT DEFAULT 1,
    pix_qr_code TEXT,
    pix_copia_cola TEXT,
    payload_response JSONB,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. ÍNDICES E PERFORMANCE
CREATE INDEX idx_items_store_segment ON items(store_id, is_active, item_type);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_store_status ON orders(store_id, status);
CREATE INDEX idx_service_appointments_range ON service_appointments(item_id, scheduled_start, scheduled_end);
`;

export const ROADMAP_PHASES = [
  {
    phase: 'Fase 1',
    name: 'Fundação & MVP Comercial (4 Semanas)',
    focus: 'Primeiras vendas no ar com custo operacional mínimo',
    tag: 'Pronto para Produção',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    milestones: [
      'Setup de repositório, CI/CD automatizado e banco de dados PostgreSQL relacional.',
      'Catálogo unificado com filtro por categorias e busca inteligente.',
      'Página do produto/serviço com galeria de fotos, especificações e avaliações.',
      'Carrinho de compras local com persistência e checkout simplificado.',
      'Integração de pagamento Pix instantâneo (Mercado Pago / Asaas) com webhook de baixa automática.',
      'Painel de login seguro para o lojista cadastrar seus 20 primeiros produtos/serviços.'
    ],
    duration: '4 semanas (1 sprint de setup + 3 sprints ágeis)'
  },
  {
    phase: 'Fase 2',
    name: 'Personalização Visual No-Code & Operação (3 Semanas)',
    focus: 'Identidade da marca e gestão de pedidos sem depender de desenvolvedores',
    tag: 'Diferencial VÍTRIO',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    milestones: [
      'Editor visual no-code: seletor de paleta de cores (primária, secundária, acento), fontes e arredondamento.',
      'Upload e gestão de banner principal, slogan e barra de avisos promocionais.',
      'Esteira Kanban de pedidos com arrastar-e-soltar e notificações por e-mail/WhatsApp.',
      'Relatórios e dashboards com faturamento diário, produtos mais vendidos e ticket médio.',
      'Gerenciador de cupons de desconto (percentual ou valor fixo).'
    ],
    duration: '3 semanas'
  },
  {
    phase: 'Fase 3',
    name: 'Módulo de Serviços & Agendamentos (3 Semanas)',
    focus: 'Capacitar profissionais autônomos, consultores, salões e clínicas',
    tag: 'Multisegmento Real',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    milestones: [
      'Seletor de data e horário no checkout de serviços com prevenção de conflitos.',
      'Definição de grade de disponibilidade por profissional ou sala de atendimento.',
      'Sincronização com Google Calendar (via API pública sem custo).',
      'Disparo de lembrete automático 24h antes do serviço agendado via WhatsApp.'
    ],
    duration: '3 semanas'
  },
  {
    phase: 'Fase 4',
    name: 'Otimização de Conversão & Fidelidade (2 Semanas)',
    focus: 'Aumentar faturamento por visitante (CRO)',
    tag: 'Crescimento',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    milestones: [
      'Cálculo dinâmico de frete integrado (Correios / Melhor Envio / Motoboy local).',
      'Checkout One-Step com suporte a cartão de crédito parcelado e antifraude.',
      'Recuperação de carrinhos abandonados com link direto de finalização.',
      'Módulo de avaliações verificadas com fotos enviadas por clientes pós-compra.'
    ],
    duration: '2 semanas'
  },
  {
    phase: 'Fase 5',
    name: 'Escala, ERP & Omnichannel (4 Semanas)',
    focus: 'Integração com loja física e automação fiscal',
    tag: 'Escalabilidade',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    milestones: [
      'Integração com ERP para PMEs (Bling ou Tiny ERP) para emissão automática de NF-e.',
      'Sincronização de estoque físico da loja presencial com estoque virtual em tempo real.',
      'Impressão térmica de comandas para separação e despacho de pacotes.',
      'Múltiplos operadores com controle de permissão (Administrador, Atendente, Operador de Estoque).'
    ],
    duration: '4 semanas'
  }
];

export const EFFORT_MATRIX = [
  {
    component: 'Arquitetura Base & CI/CD',
    complexity: 'Média',
    hours: 24,
    storyPoints: 5,
    stack: 'React 19 + Vite + Tailwind + Cloud Run',
    risk: 'Baixo (tecnologias consolidadas)',
    phase: 'Fase 1'
  },
  {
    component: 'Banco de Dados Relacional & Migrações',
    complexity: 'Média',
    hours: 28,
    storyPoints: 5,
    stack: 'PostgreSQL + Drizzle ORM',
    risk: 'Baixo (esquema normalizado)',
    phase: 'Fase 1'
  },
  {
    component: 'Catálogo & Busca Multisegmento',
    complexity: 'Média',
    hours: 32,
    storyPoints: 8,
    stack: 'Componentes React + Filtros de URL',
    risk: 'Baixo',
    phase: 'Fase 1'
  },
  {
    component: 'Carrinho Inteligente & Simulação',
    complexity: 'Média',
    hours: 22,
    storyPoints: 5,
    stack: 'Zustand / Context API + LocalStorage',
    risk: 'Baixo',
    phase: 'Fase 1'
  },
  {
    component: 'Integração Pix & Checkout',
    complexity: 'Alta',
    hours: 40,
    storyPoints: 13,
    stack: 'Mercado Pago SDK + Webhook Assinado',
    risk: 'Médio (idempotência e callbacks)',
    phase: 'Fase 1'
  },
  {
    component: 'Editor Visual No-Code (Theme Customizer)',
    complexity: 'Alta',
    hours: 45,
    storyPoints: 13,
    stack: 'CSS Variables + React Theme Engine',
    risk: 'Médio (garantir contraste acessível WCAG)',
    phase: 'Fase 2'
  },
  {
    component: 'Esteira Kanban de Pedidos & Status',
    complexity: 'Média',
    hours: 30,
    storyPoints: 8,
    stack: 'Drag & Drop + WebSockets / Polling',
    risk: 'Baixo',
    phase: 'Fase 2'
  },
  {
    component: 'Relatórios & Dashboard de Desempenho',
    complexity: 'Média',
    hours: 26,
    storyPoints: 5,
    stack: 'Queries SQL Agregadas + Charts',
    risk: 'Baixo',
    phase: 'Fase 2'
  },
  {
    component: 'Módulo de Agendamentos de Serviços',
    complexity: 'Alta',
    hours: 50,
    storyPoints: 13,
    stack: 'Slot Picker + Controle de Concorrência ACID',
    risk: 'Alto (evitar agendamentos simultâneos)',
    phase: 'Fase 3'
  },
  {
    component: 'Checkout Cartão + Antifraude + Parcelamento',
    complexity: 'Alta',
    hours: 36,
    storyPoints: 8,
    stack: 'Gateway Tokenized Form (PCI-DSS)',
    risk: 'Médio (regras de chargeback)',
    phase: 'Fase 4'
  },
  {
    component: 'Integração ERP / NF-e (Bling/Tiny)',
    complexity: 'Muito Alta',
    hours: 60,
    storyPoints: 21,
    stack: 'API REST ERP + Fila de Webhooks',
    risk: 'Alto (estabilidade de terceiros)',
    phase: 'Fase 5'
  }
];

export const SECURITY_COMPLIANCE = {
  lgpd: [
    {
      requirement: 'Consentimento Explícito & Finalidade',
      implementation: 'Checkboxes desmarcados por padrão para comunicações de marketing. Armazenamento com timestamp e versão dos Termos de Uso e Política de Privacidade.',
      impact: 'Conformidade com Art. 7º e 8º da LGPD (Lei nº 13.709/2018).'
    },
    {
      requirement: 'Direito de Acesso e Anonimização / Esquecimento',
      implementation: 'Endpoint self-service no painel do cliente permitindo exportação de todos os dados cadastrais em JSON ou exclusão de dados pessoais (mantendo registros fiscais anônimos exigidos pela Receita Federal).',
      impact: 'Garante o cumprimento dos direitos do titular (Art. 18 da LGPD).'
    },
    {
      requirement: 'Minimização de Dados Cadastrais',
      implementation: 'Coleta apenas dos dados estritamente indispensáveis para faturamento e entrega: Nome completo, CPF, E-mail, Telefone e Endereço.',
      impact: 'Redução drástica da superfície de vulnerabilidade em caso de incidente.'
    }
  ],
  pciDss: [
    {
      principle: 'Zero Dados de Cartão nos Servidores da VÍTRIO',
      description: 'A digitação de número de cartão de crédito, validade e CVV ocorre através de iFrames seguros fornecidos pelo gateway (Tokenização Direta / Hosted Fields). O servidor da VÍTRIO recebe apenas um token alfanumérico descartável.',
      scope: 'Enquadramento na autoavaliação simplificada SAQ A do PCI-DSS, eliminando custos de auditorias pesadas para a PME.'
    },
    {
      principle: 'Comunicação Segura End-to-End',
      description: 'Criptografia TLS 1.3 obrigatória em todas as requisições com HSTS (HTTP Strict Transport Security) ativo e cabeçalhos Content-Security-Policy (CSP) estritos.',
      scope: 'Prevenção de ataques Man-in-the-Middle e injeção de scripts maliciosos (XSS).'
    }
  ],
  operationalSecurity: [
    {
      title: 'Autenticação & Controle de Acesso (RBAC)',
      detail: 'Separação de papéis: "Administrador Geral" (gestão financeira e visual), "Operador de Pedidos" (vê apenas etiquetas e status de despacho), "Atendente" (agenda serviços) e "Cliente" (acessa apenas seus próprios pedidos).'
    },
    {
      title: 'Webhooks com Assinatura Criptográfica & Idempotência',
      detail: 'Todas as notificações de pagamento recebidas do gateway são validadas via HMAC-SHA256 e gravadas em tabela de eventos com chave única de idempotência, impedindo duplicidade de saldo ou disparos repetidos.'
    },
    {
      title: 'Auditoria & Logs Imutáveis',
      detail: 'Ações administrativas sensíveis (alteração de preços, cancelamento de pedidos, alteração de contas bancárias de recebimento) são registradas em log de auditoria com IP, data/hora e identificador do operador.'
    }
  ]
};
