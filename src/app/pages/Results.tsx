import { SlidersHorizontal, Grid, List, Map as MapIcon, ArrowUpDown, Sparkles, Filter, X, Building2, DollarSign, Maximize2, Users, Calendar, TrendingUp, Wifi, Car, Coffee, Shield, Zap, MapPin, ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { AIAgent } from "../components/AIAgent";
import { Footer } from "../components/Footer";
import { PropertyCard } from "../components/PropertyCard";
import { useState, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useProperties } from "../../data/properties";

export default function Results() {
  const properties = useProperties();
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");
  
  // Filtros avançados
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sizeRange, setSizeRange] = useState([0, 500]);
  const [capacityRange, setCapacityRange] = useState([1, 50]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [availability, setAvailability] = useState("all");
  const [contractType, setContractType] = useState("all");

  const propertyTypes = [
    { id: "escritorio", label: "Escritório", icon: Building2, count: 45 },
    { id: "coworking", label: "Coworking", icon: Users, count: 28 },
    { id: "sala", label: "Sala Comercial", icon: Maximize2, count: 37 },
    { id: "loja", label: "Loja", icon: Coffee, count: 22 },
  ];

  const amenities = [
    { id: "wifi", label: "Wi-Fi de Alta Velocidade", icon: Wifi },
    { id: "parking", label: "Estacionamento", icon: Car },
    { id: "furnished", label: "Mobiliado", icon: Coffee },
    { id: "security", label: "Segurança 24h", icon: Shield },
    { id: "ac", label: "Ar Condicionado", icon: Zap },
    { id: "kitchen", label: "Copa/Cozinha", icon: Coffee },
  ];

  const locations = [
    { id: "centro", label: "Centro", count: properties.filter((property) => property.location.toLowerCase().includes("centro")).length },
    { id: "renascenca", label: "Renascença", count: properties.filter((property) => property.location.toLowerCase().includes("renasc" )).length },
    { id: "cohama", label: "Cohama", count: properties.filter((property) => property.location.toLowerCase().includes("cohama")).length },
    { id: "calhau", label: "Calhau", count: properties.filter((property) => property.location.toLowerCase().includes("calhau")).length },
    { id: "ponta", label: "Ponta d'Areia", count: properties.filter((property) => property.location.toLowerCase().includes("ponta")).length },
    { id: "jaracaty", label: "Jaracaty", count: properties.filter((property) => property.location.toLowerCase().includes("jaracaty")).length },
    { id: "saofrancisco", label: "São Francisco", count: properties.filter((property) => property.location.toLowerCase().includes("são francisco") || property.location.toLowerCase().includes("sao francisco")).length },
    { id: "centrohistorico", label: "Centro Histórico", count: properties.filter((property) => property.location.toLowerCase().includes("centro histórico") || property.location.toLowerCase().includes("centro historico")).length },
  ];

  const toggleSelection = (array: string[], setArray: Dispatch<SetStateAction<string[]>>, id: string) => {
    setArray(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const activeFiltersCount = 
    selectedTypes.length + 
    selectedAmenities.length + 
    selectedLocations.length +
    (priceRange[0] !== 0 || priceRange[1] !== 10000 ? 1 : 0) +
    (sizeRange[0] !== 0 || sizeRange[1] !== 500 ? 1 : 0) +
    (capacityRange[0] !== 1 || capacityRange[1] !== 50 ? 1 : 0) +
    (availability !== "all" ? 1 : 0) +
    (contractType !== "all" ? 1 : 0);

  const availabilityMap: Record<string, string> = {
    "1": "immediate",
    "2": "15days",
    "3": "30days",
    "4": "immediate",
    "5": "15days",
    "6": "immediate",
    "7": "30days",
    "8": "immediate",
  };

  const contractTypeMap: Record<string, string> = {
    "1": "flexible",
    "2": "6months",
    "3": "12months",
    "4": "flexible",
    "5": "24months",
    "6": "flexible",
    "7": "12months",
    "8": "6months",
  };

  const amenityKeywords: Record<string, string[]> = {
    wifi: ["wi-fi", "internet"],
    parking: ["estacionamento", "vagas", "portaria"],
    furnished: ["mobiliado", "mobiliado de luxo"],
    security: ["segurança", "cftv", "portaria", "concierge"],
    ac: ["ar condicionado", "ambiente climatizado"],
    kitchen: ["copa", "cozinha"],
  };

  const typeMap: Record<string, string> = {
    escritorio: "Escritório",
    coworking: "Coworking",
    sala: "Sala Comercial",
    loja: "Loja",
  };

  const locationMap: Record<string, string[]> = {
    centro: ["centro"],
    renascenca: ["renasc"],
    cohama: ["cohama"],
    calhau: ["calhau"],
    ponta: ["ponta"],
    jaracaty: ["jaracaty"],
    saofrancisco: ["são francisco", "sao francisco"],
    centrohistorico: ["centro histórico", "centro historico"],
  };

  const filteredProperties = properties.filter((property) => {
    const normalizedTitle = property.type.toLowerCase();
    const normalizedLocation = property.location.toLowerCase();
    const normalizedFeatures = property.features.join(" ").toLowerCase();
    const normalizedPrice = property.price;
    const normalizedSize = property.size;
    const normalizedCapacity = property.capacity;
    const propAvailability = availabilityMap[property.id] ?? "immediate";
    const propContract = contractTypeMap[property.id] ?? "flexible";

    const matchesType = selectedTypes.length === 0 || selectedTypes.some((typeId) => normalizedTitle.includes(typeMap[typeId]?.toLowerCase() ?? typeId));
    const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every((amenityId) =>
      amenityKeywords[amenityId]?.some((keyword) => normalizedFeatures.includes(keyword))
    );
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.some((locationId) =>
      locationMap[locationId]?.some((keyword) => normalizedLocation.includes(keyword))
    );
    const matchesPrice = normalizedPrice >= priceRange[0] && normalizedPrice <= priceRange[1];
    const matchesSize = normalizedSize >= sizeRange[0] && normalizedSize <= sizeRange[1];
    const matchesCapacity = normalizedCapacity >= capacityRange[0] && normalizedCapacity <= capacityRange[1];
    const matchesAvailability = availability === "all" || propAvailability === availability;
    const matchesContract = contractType === "all" || propContract === contractType;

    return (
      matchesType &&
      matchesAmenities &&
      matchesLocation &&
      matchesPrice &&
      matchesSize &&
      matchesCapacity &&
      matchesAvailability &&
      matchesContract
    );
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "size-desc") return b.size - a.size;
    if (sortBy === "rating-desc") return b.rating - a.rating;
    if (sortBy === "newest") return Number(b.id) - Number(a.id);
    return a.id.localeCompare(b.id);
  });

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setSelectedLocations([]);
    setPriceRange([0, 10000]);
    setSizeRange([0, 500]);
    setCapacityRange([1, 50]);
    setAvailability("all");
    setContractType("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <Header />
      
      {/* Dark header banner with AI-powered search */}
      <div className="bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="size-5 text-blue-400" />
              </motion.div>
              <span className="text-sm text-blue-400 font-medium">Busca Inteligente com IA</span>
            </div>
            <h1 className="text-5xl mb-3 text-white">Espaços Comerciais</h1>
            <p className="text-slate-300 text-lg mb-6">{properties.length} espaços disponíveis • Atualizados em tempo real</p>
            
            {/* Quick Insights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Preço Médio", value: "R$ 3.500/mês", icon: DollarSign, color: "from-green-500 to-emerald-600" },
                { label: "Tamanho Médio", value: "85m²", icon: Maximize2, color: "from-blue-500 to-cyan-600" },
                { label: "Mais Procurado", value: "Escritórios", icon: Building2, color: "from-purple-500 to-violet-600" },
                { label: "Disponibilidade", value: "Imediata", icon: Calendar, color: "from-orange-500 to-amber-600" },
              ].map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <div className={`inline-flex items-center justify-center size-10 bg-gradient-to-br ${insight.color} rounded-lg mb-2`}>
                    <insight.icon className="size-5 text-white" />
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{insight.label}</div>
                  <div className="text-lg font-semibold text-white">{insight.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 mb-6 sticky top-20 z-40 backdrop-blur-lg bg-white/95"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-medium ${
                  showFilters
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Filter className="size-4" />
                <span>Filtros Avançados</span>
                {activeFiltersCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2.5 py-0.5 bg-white/30 rounded-full text-xs font-bold"
                  >
                    {activeFiltersCount}
                  </motion.span>
                )}
                <ChevronDown className={`size-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all text-sm font-medium"
                >
                  <X className="size-4" />
                  Limpar Filtros
                </motion.button>
              )}

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-5 py-3 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-sm cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <option value="recommended">✨ Recomendados pela IA</option>
                  <option value="price-asc">💰 Menor Preço</option>
                  <option value="price-desc">💎 Maior Preço</option>
                  <option value="size-desc">📏 Maior Área</option>
                  <option value="rating-desc">⭐ Melhor Avaliação</option>
                  <option value="newest">🆕 Mais Recentes</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* View Modes */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5">
              {[
                { mode: "grid" as const, icon: Grid, label: "Grade" },
                { mode: "list" as const, icon: List, label: "Lista" },
                { mode: "map" as const, icon: MapIcon, label: "Mapa" }
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  title={label}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === mode 
                      ? "bg-[#0F172A] shadow-md text-white" 
                      : "hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex gap-6">
          {/* Advanced Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 320 }}
                exit={{ opacity: 0, x: -20, width: 0 }}
                className="flex-shrink-0 overflow-hidden"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-36 max-h-[calc(100vh-180px)] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                      <Filter className="size-5 text-blue-600" />
                      Filtros Avançados
                    </h3>
                  </div>

                  {/* Property Type */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Building2 className="size-4 text-blue-600" />
                      Tipo de Espaço
                    </h4>
                    <div className="space-y-2">
                      {propertyTypes.map((type) => (
                        <label
                          key={type.id}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all group ${
                            selectedTypes.includes(type.id)
                              ? 'bg-blue-50 border-2 border-blue-500'
                              : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type.id)}
                              onChange={() => toggleSelection(selectedTypes, setSelectedTypes, type.id)}
                              className="size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                            />
                            <type.icon className={`size-4 ${selectedTypes.includes(type.id) ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="text-sm font-medium">{type.label}</span>
                          </div>
                          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">{type.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <DollarSign className="size-4 text-green-600" />
                      Faixa de Preço (Mensal)
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex items-center justify-between">
                        <div className="px-4 py-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                          <div className="text-xs text-green-600 mb-0.5">Mínimo</div>
                          <div className="font-bold text-green-700">R$ 0</div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                          <div className="text-xs text-blue-600 mb-0.5">Máximo</div>
                          <div className="font-bold text-blue-700">R$ {priceRange[1].toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Range */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Maximize2 className="size-4 text-purple-600" />
                      Área (m²)
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={sizeRange[1]}
                        onChange={(e) => setSizeRange([sizeRange[0], parseInt(e.target.value)])}
                        className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex items-center justify-between">
                        <div className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-xs text-purple-600">De</div>
                          <div className="font-bold text-purple-700">{sizeRange[0]}m²</div>
                        </div>
                        <div className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-xs text-purple-600">Até</div>
                          <div className="font-bold text-purple-700">{sizeRange[1]}m²</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Users className="size-4 text-orange-600" />
                      Capacidade (Pessoas)
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="1"
                        max="50"
                        step="1"
                        value={capacityRange[1]}
                        onChange={(e) => setCapacityRange([capacityRange[0], parseInt(e.target.value)])}
                        className="w-full accent-orange-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-center">
                        <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg inline-block">
                          <div className="text-xs text-orange-600">Até</div>
                          <div className="font-bold text-orange-700">{capacityRange[1]} pessoas</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Zap className="size-4 text-yellow-600" />
                      Comodidades
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {amenities.map((amenity) => (
                        <button
                          key={amenity.id}
                          onClick={() => toggleSelection(selectedAmenities, setSelectedAmenities, amenity.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                            selectedAmenities.includes(amenity.id)
                              ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                          }`}
                        >
                          <amenity.icon className="size-5" />
                          <span className="text-xs text-center leading-tight">{amenity.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <MapPin className="size-4 text-red-600" />
                      Localização
                    </h4>
                    <div className="space-y-2">
                      {locations.map((location) => (
                        <label
                          key={location.id}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                            selectedLocations.includes(location.id)
                              ? 'bg-red-50 border-2 border-red-500'
                              : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedLocations.includes(location.id)}
                              onChange={() => toggleSelection(selectedLocations, setSelectedLocations, location.id)}
                              className="size-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span className="text-sm font-medium">{location.label}</span>
                          </div>
                          <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">{location.count}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <Calendar className="size-4 text-indigo-600" />
                      Disponibilidade
                    </h4>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="all">Todas</option>
                      <option value="immediate">Imediata</option>
                      <option value="15days">Até 15 dias</option>
                      <option value="30days">Até 30 dias</option>
                      <option value="custom">Data Personalizada</option>
                    </select>
                  </div>

                  {/* Contract Type */}
                  <div>
                    <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                      <TrendingUp className="size-4 text-teal-600" />
                      Tipo de Contrato
                    </h4>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "Todos" },
                        { value: "flexible", label: "Flexível (Mensal)" },
                        { value: "6months", label: "6 Meses" },
                        { value: "12months", label: "12 Meses" },
                        { value: "24months", label: "24+ Meses" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                            contractType === option.value
                              ? 'bg-teal-50 border-2 border-teal-500'
                              : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contractType"
                            value={option.value}
                            checked={contractType === option.value}
                            onChange={(e) => setContractType(e.target.value)}
                            className="size-5 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{sortedProperties.length} espaço(s) encontrados</p>
                <h2 className="text-2xl font-semibold text-[#0F172A]">Resultados</h2>
              </div>
            </div>

            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PropertyCard
                      id={property.id}
                      image={property.image}
                      title={property.title}
                      price={property.price}
                      location={property.location}
                      size={property.size}
                      capacity={property.capacity}
                      rating={property.rating}
                      type={property.type}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === "list" && (
              <div className="space-y-4">
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <PropertyCard
                      id={property.id}
                      image={property.image}
                      title={property.title}
                      price={property.price}
                      location={property.location}
                      size={property.size}
                      capacity={property.capacity}
                      rating={property.rating}
                      type={property.type}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === "map" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xl"
              >
                <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full mb-6">
                  <MapIcon className="size-16 text-blue-600" />
                </div>
                <h3 className="text-3xl mb-3 text-[#0F172A] font-bold">Visualização em Mapa</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  Explore a localização de todos os imóveis no mapa interativo
                </p>
                <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 rounded-xl h-[500px] flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center">
                    <MapIcon className="size-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">Mapa interativo em desenvolvimento</p>
                    <p className="text-sm text-slate-400 mt-1">Em breve com integração Google Maps</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AIAgent />
      <Footer />
    </div>
  );
}
