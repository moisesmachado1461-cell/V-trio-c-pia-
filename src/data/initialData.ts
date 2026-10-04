import { Segment, ProductService, Order, Customer, Coupon, StoreTheme, Review } from '../types';

export const INITIAL_SEGMENTS: Segment[] = [
  {
    id: 'fashion',
    name: 'Moda & Acessórios',
    icon: 'Shirt',
    description: 'Vestuário autoral, calçados e semijoias com acabamento premium',
    badgeColor: 'text-rose-700',
    badgeBg: 'bg-rose-50 border-rose-200',
  },
  {
    id: 'services',
    name: 'Serviços & Consultoria',
    icon: 'Briefcase',
    description: 'Agendamento de consultorias, design e manutenções com hora marcada',
    badgeColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-50 border-indigo-200',
  },
  {
    id: 'beauty',
    name: 'Beleza & Cuidados',
    icon: 'Sparkles',
    description: 'Cosméticos botânicos, perfumaria e procedimentos de autocuidado',
    badgeColor: 'text-pink-700',
    badgeBg: 'bg-pink-50 border-pink-200',
  },
  {
    id: 'decor',
    name: 'Casa & Decoração',
    icon: 'Home',
    description: 'Luminárias artesanais, cerâmicas e organização para seu lar',
    badgeColor: 'text-amber-700',
    badgeBg: 'bg-amber-50 border-amber-200',
  },
  {
    id: 'gastronomy',
    name: 'Gastronomia & Café',
    icon: 'Coffee',
    description: 'Cafés especiais microlotes, pães artesanais e cestas gourmet',
    badgeColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-50 border-emerald-200',
  },
  {
    id: 'tech',
    name: 'Eletrônicos & Suporte',
    icon: 'Laptop',
    description: 'Equipamentos, gadgets para home office e suporte técnico especializado',
    badgeColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-50 border-cyan-200',
  },
];

export const INITIAL_PRODUCTS: ProductService[] = [
  {
    id: 'prod-1',
    title: 'Camisa Linho Puro Riviera',
    type: 'product',
    segmentId: 'fashion',
    price: 249.90,
    originalPrice: 299.90,
    shortDescription: '100% linho europeu pré-encolhido com corte alfaiataria moderno.',
    description: 'Feita artesanalmente com fibras de linho puro selecionadas, garantindo respirabilidade térmica, toque suave e caimento sofisticado. Ideal tanto para o clima tropical brasileiro quanto para reuniões de negócios.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 32,
    features: ['100% Linho Puro', 'Botões de madrepérola natural', 'Modelagem Comfort Fit', 'Garantia de 90 dias'],
    sku: 'MOD-LNH-001',
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'serv-1',
    title: 'Consultoria de Estilo & Imagem Pessoal',
    type: 'service',
    segmentId: 'services',
    price: 380.00,
    originalPrice: 450.00,
    shortDescription: 'Sessão individual online ou presencial com análise de coloração pessoal.',
    description: 'Descubra a sua cartela cromática ideal, biotipo e estratégias visuais para comunicar sua melhor autoridade e estilo autêntico. Inclui dossiê digital completo com 30 combinações em PDF.',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 8,
    duration: '1h 30min',
    serviceLocation: 'online',
    rating: 5.0,
    reviewCount: 47,
    features: ['Análise cromática completa', 'Dossiê em PDF de 40 páginas', 'Guia de cápsula inteligente', 'Suporte WhatsApp 15 dias'],
    sku: 'SRV-IMG-002',
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'prod-2',
    title: 'Sérum Facial Botânico Iluminador',
    type: 'product',
    segmentId: 'beauty',
    price: 139.00,
    originalPrice: 169.00,
    shortDescription: 'Vitamina C pura a 15% estabilizada com ácido hialurônico vegetal.',
    description: 'Fórmula limpa e vegana enriquecida com extratos da flora brasileira. Uniformiza o tom da pele, combate radicais livres e promove viço imediato sem deixar sensação oleosa.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-0091811eef4f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 35,
    rating: 4.8,
    reviewCount: 89,
    features: ['15% Vitamina C Estabilizada', 'Ácido Hialurônico de Triplo Peso', 'Vegano & Cruelty-free', 'Frasco âmbar 30ml com conta-gotas'],
    sku: 'BEL-SRM-003',
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'serv-2',
    title: 'Sessão Spa Day Facial & Drenagem',
    type: 'service',
    segmentId: 'beauty',
    price: 210.00,
    originalPrice: 260.00,
    shortDescription: 'Protocolo revitalizante facial com limpeza profunda, argiloterapia e massagem.',
    description: 'Atendimento exclusivo em cabine privativa climatizada com aromaterapia e cromoterapia. Inclui higienização facial profunda, esfoliação enzimática, hidratação oclusiva e massagem modeladora facial.',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    duration: '1h 15min',
    serviceLocation: 'presencial',
    rating: 4.95,
    reviewCount: 63,
    features: ['Cabine individual de bem-estar', 'Aromaterapia inclusa', 'Argila branca vulcânica', 'Chá de ervas pós-sessão'],
    sku: 'SRV-SPA-004',
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'prod-3',
    title: 'Luminária Pendente Cerâmica Terra Cotta',
    type: 'product',
    segmentId: 'decor',
    price: 319.00,
    originalPrice: 389.00,
    shortDescription: 'Pendente modelado à mão em cerâmica de alta temperatura com fio trançado.',
    description: 'Design escandinavo com alma brasileira. Cada cúpula é torneada manualmente por mestres ceramistas, tornando cada peça única. Proporciona iluminação difusa acolhedora para salas de jantar e cantos de leitura.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 9,
    rating: 4.9,
    reviewCount: 24,
    features: ['Cerâmica de alta temperatura 1240°C', 'Fio de algodão trançado de 1,8m', 'Bocal E27 padrão bivolt', 'Canopla de teto inclusa'],
    sku: 'DEC-LUM-005',
    isFeatured: false,
    inStock: true,
  },
  {
    id: 'prod-4',
    title: 'Café Especial Microlote Mogiana Paulista (250g)',
    type: 'product',
    segmentId: 'gastronomy',
    price: 48.00,
    originalPrice: 55.00,
    shortDescription: '100% Arábica Catuaí Amarelo, notas de caramelo, frutas amarelas e mel.',
    description: 'Cultivado a 1.250 metros de altitude na conceituada região de Alta Mogiana. Torra fresca semanal realizada em torrador de tambor artesanal. Pontuação SCA de 86 pontos.',
    images: [
      'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 45,
    rating: 4.96,
    reviewCount: 112,
    features: ['Grãos 100% Arábica selecionados', 'Pontuação SCA: 86 pontos', 'Válvula desgaseificadora e zíper', 'Data de torra estampada'],
    sku: 'GAS-CAF-006',
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'serv-3',
    title: 'Diagnóstico & Otimização de Wi-Fi / Rede Residencial',
    type: 'service',
    segmentId: 'tech',
    price: 180.00,
    originalPrice: 220.00,
    shortDescription: 'Visita técnica para eliminação de pontos cegos de sinal e configuração Mesh.',
    description: 'Análise com analisador de espectro de RF para mapear interferências, redistribuição ideal de roteadores e configuração de segurança WPA3 para home offices de alta performance.',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    duration: '2h',
    serviceLocation: 'domicilio',
    rating: 4.85,
    reviewCount: 19,
    features: ['Mapeamento térmico de sinal Wi-Fi', 'Configuração de QoS para videoconferências', 'Isolamento de rede para IoT', 'Relatório impresso com topologia'],
    sku: 'SRV-RED-007',
    isFeatured: false,
    inStock: true,
  },
  {
    id: 'prod-5',
    title: 'Bolsa Tote em Couro Legítimo Artesanal',
    type: 'product',
    segmentId: 'fashion',
    price: 490.00,
    originalPrice: 560.00,
    shortDescription: 'Costura manual em ponto sela e compartimento acolchoado para notebook 14".',
    description: 'Confeccionada com couro bovino de curtimento vegetal que envelhece ganhando pátina e personalidade única. Metais banhados em níquel fosco antiferrugem e forro em sarja encorpada.',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 6,
    rating: 5.0,
    reviewCount: 15,
    features: ['Couro legítimo atanado 100% natural', 'Bolso para laptop até 14 polegadas', 'Fechamento com zíper YKK blindado', 'Acompanha porta-cartões brinde'],
    sku: 'MOD-BOL-008',
    isFeatured: true,
    inStock: true,
  },
  {
    id: 'serv-4',
    title: 'Consultoria de Decoração Express 3D',
    type: 'service',
    segmentId: 'decor',
    price: 320.00,
    originalPrice: 400.00,
    shortDescription: 'Redecore um cômodo com projeto 3D realista e lista clicável de compras.',
    description: 'Você envia as fotos e medidas do seu espaço, e nossos arquitetos parceiros entregam um moodboard de estilo, planta com layout otimizado e maquete 3D foto-realista em 5 dias úteis.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 5,
    duration: '5 dias úteis',
    serviceLocation: 'online',
    rating: 4.92,
    reviewCount: 38,
    features: ['Modelagem 3D imersiva', 'Lista de compras dentro do orçamento', '1 rodada de ajustes inclusa', 'Reunião de alinhamento por vídeo'],
    sku: 'SRV-DEC-009',
    isFeatured: true,
    inStock: true,
  }
];

export const INITIAL_THEME: StoreTheme = {
  storeName: 'VÍTRIO Emporium & Studio',
  tagline: 'Produtos autorais & Serviços com alma local',
  announcementBar: '🎉 Oferta de Lançamento Digital: Use o cupom BEMVINDO10 e ganhe 10% OFF no seu 1º pedido!',
  showAnnouncement: true,
  primaryColor: '#0F172A', // Slate 900
  secondaryColor: '#D97706', // Amber 600
  accentColor: '#10B981', // Emerald 500
  fontFamily: 'Plus Jakarta Sans',
  borderRadius: 'md',
  heroHeadline: 'O melhor do comércio local, agora conectado a você.',
  heroSubheadline: 'Descubra roupas autorais, cosméticos limpos, cafés premiados e agende serviços especializados em um só lugar.',
  heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  contactEmail: 'atendimento@vitrio.com.br',
  contactPhone: '(11) 98765-4321',
  contactAddress: 'Rua Harmonia, 412 - Vila Madalena, São Paulo - SP',
  contactInstagram: '@vitrio.oficial',
  pixKey: 'financeiro@vitrio.com.br',
  currency: 'R$',
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'VIT-9482',
    customerName: 'Mariana Silveira',
    customerEmail: 'mariana.silveira@email.com',
    customerPhone: '(11) 99123-4567',
    customerDocument: '341.***.***-89',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedVariant: 'Tamanho M - Bege Areia',
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 2,
      }
    ],
    subtotal: 345.90,
    discount: 34.59,
    shipping: 14.90,
    total: 326.21,
    status: 'shipped',
    paymentMethod: 'pix',
    paymentStatus: 'approved',
    shippingAddress: {
      street: 'Av. Brigadeiro Luis Antonio',
      number: '2345',
      complement: 'Apto 102',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01401-000'
    },
    createdAt: '2026-10-02T14:32:00Z',
    trackingCode: 'BR849204123SP'
  },
  {
    id: 'VIT-9483',
    customerName: 'Carlos Eduardo Ramos',
    customerEmail: 'carlos.ramos@empresa.com',
    customerPhone: '(11) 98844-1122',
    customerDocument: '228.***.***-14',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Consultoria de Estilo
        quantity: 1,
        selectedDate: '2026-10-15',
        selectedTime: '14:30',
        notes: 'Foco em guarda-roupa para transição de carreira executiva.'
      }
    ],
    subtotal: 380.00,
    discount: 0,
    shipping: 0,
    total: 380.00,
    status: 'paid',
    paymentMethod: 'credit_card',
    paymentStatus: 'approved',
    installments: 3,
    shippingAddress: {
      street: 'Rua Oscar Freire',
      number: '910',
      complement: 'Conj. 42',
      neighborhood: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-000'
    },
    createdAt: '2026-10-03T09:15:00Z',
  },
  {
    id: 'VIT-9484',
    customerName: 'Beatriz Fontes',
    customerEmail: 'bia.fontes@gmail.com',
    customerPhone: '(21) 97722-3344',
    customerDocument: '401.***.***-67',
    items: [
      {
        product: INITIAL_PRODUCTS[2], // Sérum Facial
        quantity: 2,
      },
      {
        product: INITIAL_PRODUCTS[3], // Spa Day Facial
        quantity: 1,
        selectedDate: '2026-10-18',
        selectedTime: '10:00',
      }
    ],
    subtotal: 488.00,
    discount: 48.80,
    shipping: 0,
    total: 439.20,
    status: 'processing',
    paymentMethod: 'pix',
    paymentStatus: 'approved',
    shippingAddress: {
      street: 'Rua Visconde de Pirajá',
      number: '550',
      complement: 'Cobertura',
      neighborhood: 'Ipanema',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22410-002'
    },
    createdAt: '2026-10-03T18:40:00Z',
  },
  {
    id: 'VIT-9485',
    customerName: 'Lucas Albuquerque',
    customerEmail: 'lucas.albuq@outlook.com',
    customerPhone: '(11) 96555-8899',
    customerDocument: '119.***.***-05',
    items: [
      {
        product: INITIAL_PRODUCTS[4], // Luminária Pendente
        quantity: 1,
      }
    ],
    subtotal: 319.00,
    discount: 0,
    shipping: 28.50,
    total: 347.50,
    status: 'pending',
    paymentMethod: 'pix',
    paymentStatus: 'pending',
    pixCode: '00020126580014br.gov.bcb.pix0136financeiro@vitrio.com.br5204000053039865406347.505802BR5916VITRIO EMPORIUM6009SAO PAULO62070503***6304E8A2',
    shippingAddress: {
      street: 'Rua Fradique Coutinho',
      number: '1200',
      neighborhood: 'Pinheiros',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05416-001'
    },
    createdAt: '2026-10-04T05:20:00Z',
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'BEMVINDO10',
    discountType: 'percentage',
    value: 10,
    minPurchase: 100,
    expiresAt: '2026-12-31',
    active: true,
    description: '10% de desconto para primeira compra acima de R$ 100',
  },
  {
    code: 'VITRIO25',
    discountType: 'fixed',
    value: 25,
    minPurchase: 180,
    expiresAt: '2026-11-30',
    active: true,
    description: 'R$ 25 OFF em pedidos ou agendamentos acima de R$ 180',
  },
  {
    code: 'FRETEGRATIS',
    discountType: 'fixed',
    value: 20,
    minPurchase: 250,
    expiresAt: '2026-12-15',
    active: true,
    description: 'Desconto equivalente ao frete expresso em compras acima de R$ 250',
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Mariana Silveira',
    email: 'mariana.silveira@email.com',
    phone: '(11) 99123-4567',
    city: 'São Paulo, SP',
    ordersCount: 4,
    totalSpent: 1240.50,
  },
  {
    id: 'cust-2',
    name: 'Carlos Eduardo Ramos',
    email: 'carlos.ramos@empresa.com',
    phone: '(11) 98844-1122',
    city: 'São Paulo, SP',
    ordersCount: 2,
    totalSpent: 760.00,
  },
  {
    id: 'cust-3',
    name: 'Beatriz Fontes',
    email: 'bia.fontes@gmail.com',
    phone: '(21) 97722-3344',
    city: 'Rio de Janeiro, RJ',
    ordersCount: 5,
    totalSpent: 1890.30,
  },
  {
    id: 'cust-4',
    name: 'Lucas Albuquerque',
    email: 'lucas.albuq@outlook.com',
    phone: '(11) 96555-8899',
    city: 'São Paulo, SP',
    ordersCount: 1,
    totalSpent: 347.50,
  },
  {
    id: 'cust-5',
    name: 'Fernanda Meirelles',
    email: 'femeirelles@uol.com.br',
    phone: '(31) 98411-9000',
    city: 'Belo Horizonte, MG',
    ordersCount: 3,
    totalSpent: 920.00,
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerName: 'Guilherme Prado',
    rating: 5,
    date: '28/09/2026',
    comment: 'Qualidade excepcional do linho! O caimento ficou perfeito no tamanho M. Chegou em 2 dias com embalagem perfumada ecológica.',
    verified: true,
  },
  {
    id: 'rev-2',
    productId: 'serv-1',
    customerName: 'Renata Vasconcellos',
    rating: 5,
    date: '15/09/2026',
    comment: 'A consultoria transformou a forma como monto minhas malas de viagem a trabalho. O dossiê é rico em detalhes e as orientações foram super práticas.',
    verified: true,
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    customerName: 'Camila Toledo',
    rating: 5,
    date: '20/09/2026',
    comment: 'Minha pele nunca teve tanto viço! O cheirinho cítrico suave é uma delícia matinal e rende muito.',
    verified: true,
  },
  {
    id: 'rev-4',
    productId: 'prod-4',
    customerName: 'André Zanetti',
    rating: 5,
    date: '01/10/2026',
    comment: 'Café espetacular! Torra recente, aroma que tomou conta da casa inteira. Já assinei para receber todo mês.',
    verified: true,
  }
];
