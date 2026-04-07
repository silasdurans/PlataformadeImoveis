export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  size: number;
  capacity: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  lat: number;
  lng: number;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Escritório Moderno Centro São Luís",
    type: "Escritório",
    price: 1800,
    location: "Centro, São Luís - MA",
    size: 45,
    capacity: 8,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzczNjY4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzczNjY4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1559310415-1e164ccd653a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MzYxMzQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1637665662134-db459c1bbb46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWV0aW5nJTIwcm9vbSUyMG9mZmljZXxlbnwxfHx8fDE3NzM2NDk1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Escritório completamente mobiliado no coração de São Luís, ideal para startups e pequenas empresas. Localização privilegiada com fácil acesso a transporte público e área comercial.",
    features: [
      "Wi-Fi de alta velocidade",
      "Mobiliado",
      "Ar condicionado",
      "Recepção compartilhada",
      "Sala de reunião",
      "Copa equipada",
      "Estacionamento disponível",
      "Segurança 24h"
    ],
    lat: -2.5297,
    lng: -44.3028
  },
  {
    id: "2",
    title: "Coworking Premium Renascença",
    type: "Coworking",
    price: 850,
    location: "Renascença, São Luís - MA",
    size: 20,
    capacity: 4,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559310415-1e164ccd653a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MzYxMzQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1559310415-1e164ccd653a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMGludGVyaW9yfGVufDF8fHx8MTc3MzYxMzQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1576073460124-e073bb8d87f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Espaço de coworking moderno e inspirador, perfeito para profissionais autônomos e equipes pequenas. Ambiente colaborativo com infraestrutura completa.",
    features: [
      "Wi-Fi Gigabit",
      "Café e água inclusos",
      "Impressora e scanner",
      "Armário individual",
      "Sala de reunião (agendamento)",
      "Ambiente climatizado",
      "Acesso 24/7",
      "Comunidade ativa"
    ],
    lat: -2.5187,
    lng: -44.2739
  },
  {
    id: "3",
    title: "Loja Comercial Cohama",
    type: "Loja",
    price: 3500,
    location: "Cohama, São Luís - MA",
    size: 80,
    capacity: 15,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1761333477936-56fbc7851c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcmV0YWlsJTIwc3RvcmV8ZW58MXx8fHwxNzczNjY4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1761333477936-56fbc7851c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcmV0YWlsJTIwc3RvcmV8ZW58MXx8fHwxNzczNjY4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Loja ampla em uma das regiões mais movimentadas de São Luís. Excelente visibilidade e fluxo de pessoas. Ideal para varejo.",
    features: [
      "Vitrine ampla",
      "Banheiro privativo",
      "Depósito",
      "Ar condicionado split",
      "3 vagas de estacionamento",
      "Portão de enrolar",
      "Ponto de água e esgoto",
      "Instalação elétrica 220V"
    ],
    lat: -2.5654,
    lng: -44.2493
  },
  {
    id: "4",
    title: "Sala Comercial Calhau",
    type: "Sala Comercial",
    price: 1200,
    location: "Calhau, São Luís - MA",
    size: 35,
    capacity: 6,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1637665662134-db459c1bbb46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWV0aW5nJTIwcm9vbSUyMG9mZmljZXxlbnwxfHx8fDE3NzM2NDk1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1637665662134-db459c1bbb46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWV0aW5nJTIwcm9vbSUyMG9mZmljZXxlbnwxfHx8fDE3NzM2NDk1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Sala comercial pronta para uso, em edifício corporativo moderno. Ótima localização próxima à praia.",
    features: [
      "Internet incluída",
      "2 banheiros no andar",
      "Copa compartilhada",
      "Elevador",
      "Portaria 24h",
      "Gerador",
      "2 vagas",
      "CFTV"
    ],
    lat: -2.4817,
    lng: -44.2949
  },
  {
    id: "5",
    title: "Escritório Executivo Ponta d'Areia",
    type: "Escritório",
    price: 2500,
    location: "Ponta d'Areia, São Luís - MA",
    size: 60,
    capacity: 10,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576073460124-e073bb8d87f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1576073460124-e073bb8d87f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1711720743865-10787dd6934a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzM2NDYzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Escritório de alto padrão em edifício premium. Vista panorâmica, acabamento sofisticado e localização nobre.",
    features: [
      "Mobiliado de luxo",
      "Wi-Fi empresarial",
      "Sala de reunião privativa",
      "Banheiro privativo",
      "Ar condicionado central",
      "4 vagas cobertas",
      "Concierge",
      "Heliponto"
    ],
    lat: -2.4956,
    lng: -44.2828
  },
  {
    id: "6",
    title: "Espaço Compartilhado São Francisco",
    type: "Coworking",
    price: 650,
    location: "São Francisco, São Luís - MA",
    size: 15,
    capacity: 3,
    rating: 4.5,
    image: "https://images.unsplash.com/flagged/photo-1576485424072-e585a98df56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/flagged/photo-1576485424072-e585a98df56e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Ambiente descontraído e produtivo para freelancers e pequenos times. Ótimo custo-benefício.",
    features: [
      "Mesa fixa",
      "Internet rápida",
      "Café livre",
      "Ar condicionado",
      "Recepção",
      "Armário com chave",
      "Horário comercial",
      "Eventos networking"
    ],
    lat: -2.5389,
    lng: -44.2654
  },
  {
    id: "7",
    title: "Sala Premium Jaracaty",
    type: "Sala Comercial",
    price: 1600,
    location: "Jaracaty, São Luís - MA",
    size: 50,
    capacity: 8,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcHJvcGVydHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcHJvcGVydHklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzM2Njg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Sala comercial em área nobre, perfeita para consultórios e escritórios profissionais.",
    features: [
      "Piso elevado",
      "Forro de gesso",
      "Iluminação LED",
      "Banheiro no andar",
      "Recepção comum",
      "Estacionamento rotativo",
      "Segurança",
      "Próximo a shopping"
    ],
    lat: -2.5034,
    lng: -44.2566
  },
  {
    id: "8",
    title: "Loja Estratégica Centro Histórico",
    type: "Loja",
    price: 2800,
    location: "Centro Histórico, São Luís - MA",
    size: 65,
    capacity: 12,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzczNjY4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1758630737900-a28682c5aa69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzczNjY4Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    description: "Ponto comercial em área histórica e turística, ideal para lojas de artesanato, cafeterias e comércio cultural.",
    features: [
      "Fachada histórica",
      "Pé-direito alto",
      "Mezanino",
      "Ventilação natural",
      "Restaurado",
      "Grande circulação",
      "Patrimônio cultural",
      "Próximo a pontos turísticos"
    ],
    lat: -2.5297,
    lng: -44.3028
  }
];
