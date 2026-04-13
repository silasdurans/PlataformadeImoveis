import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, Mic, Calendar, MapPin, DollarSign, Building2, Users, TrendingUp, Clock, Zap, CheckCircle2, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";
import { useProperties } from "../../data/properties";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  results?: PropertyResult[];
}

interface PropertyResult {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
}

export function AIAgent() {
  const properties = useProperties();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "agent",
      content: "Olá! 👋 Sou o assistente inteligente da São Paulo Participações. Estou aqui para ajudá-lo a encontrar o espaço comercial perfeito. Como posso ajudar hoje?",
      timestamp: new Date(),
      suggestions: [
        "Procuro escritório no centro",
        "Preciso de coworking mobiliado",
        "Quero sala comercial até R$3000",
        "Mostre opções para 10 pessoas"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulação de inteligência - analisa a mensagem e retorna resposta contextual
  const analyzeMessage = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    const intentions = {
      search: ["procuro", "preciso", "quero", "busco", "encontrar", "mostrar", "ver"],
      price: ["preço", "valor", "custo", "r$", "reais", "orçamento", "até"],
      location: ["onde", "localização", "endereço", "região", "bairro", "centro", "renascença", "cohama", "jaracaty", "ponta", "são luís", "são luis"],
      size: ["tamanho", "área", "m²", "metros", "grande", "pequeno"],
      type: ["escritório", "coworking", "sala", "loja", "comercial"],
      amenities: ["mobiliado", "wifi", "estacionamento", "ar condicionado"],
      schedule: ["visita", "agendar", "conhecer", "ver", "agenda"],
      help: ["ajuda", "como", "funciona", "dúvida"]
    };

    const parseBudget = () => {
      const match = lowerMessage.match(/\d+[.,]?\d*/g);
      if (!match) return null;
      const value = Number(match[0].replace(/\./g, "").replace(",", "."));
      return Number.isFinite(value) ? value : null;
    };

    const parseCapacity = () => {
      const match = lowerMessage.match(/(\d+)\s*(pessoas|pesssoas|pessoas|pessoas)/);
      return match ? Number(match[1]) : null;
    };

    const findType = () => intentions.type.find(word => lowerMessage.includes(word));

    const findLocation = () => {
      const locationWords = ["centro", "renascença", "cohama", "jaracaty", "ponta", "são luís", "são luis"];
      return locationWords.find(word => lowerMessage.includes(word));
    };

    const budget = parseBudget();
    const capacity = parseCapacity();
    const selectedType = findType();
    const selectedLocation = findLocation();

    const filterProperties = properties.filter((property) => {
      const matchesType = selectedType ? property.type.toLowerCase().includes(selectedType) : true;
      const matchesLocation = selectedLocation ? property.location.toLowerCase().includes(selectedLocation) : true;
      const matchesBudget = budget ? property.price <= budget : true;
      const matchesCapacity = capacity ? property.capacity >= capacity : true;
      return matchesType && matchesLocation && matchesBudget && matchesCapacity;
    });

    const results = filterProperties.slice(0, 4).map((property) => ({
      id: property.id,
      title: property.title,
      type: property.type,
      location: property.location,
      price: property.price,
    }));

    const isSearchQuery = intentions.search.some(word => lowerMessage.includes(word)) || intentions.type.some(word => lowerMessage.includes(word));
    const needsSearch = isSearchQuery || lowerMessage.includes("mostrar") || lowerMessage.includes("ver");

    let responseContent = "";
    let suggestions: string[] = [];
    let responseResults: PropertyResult[] | undefined;

    if (needsSearch && results.length > 0) {
      responseContent = `Encontrei ${filterProperties.length} opção(ões) que podem ser interessantes para você. Veja abaixo algumas sugestões de imóveis com base na sua busca.`;
      responseResults = results;
      suggestions = [
        "Mostrar mais resultados",
        "Agendar visita",
        "Ver opções para 4 pessoas",
        "Filtrar por preço"
      ];
    } else if (needsSearch && results.length === 0 && (selectedType || selectedLocation || budget || capacity)) {
      responseContent = `Ainda não encontrei imóveis que batem com esses critérios exatos. Posso ampliar a busca? Tente usar outras regiões ou aumentar o orçamento.`;
      suggestions = [
        "Ver opções sem filtro de preço",
        "Mostrar todas as salas",
        "Buscar apenas coworking",
        "Agendar uma visita"
      ];
    } else if (intentions.schedule.some(word => lowerMessage.includes(word))) {
      responseContent = `📅 Certo! Posso ajudar a agendar sua visita. Para isso, diga quando você gostaria de visitar o imóvel e qual horário funciona melhor para você.`;
      suggestions = [
        "Amanhã às 09:00",
        "Sexta às 14:00",
        "Agendamento presencial",
        "Agendamento virtual"
      ];
    } else if (intentions.price.some(word => lowerMessage.includes(word))) {
      responseContent = `💰 Entendi! A São Paulo Participações oferece opções em diferentes faixas de preço. Você pode me dizer um valor máximo e eu busco imóveis que cabem no seu orçamento.`;
      suggestions = [
        "Até R$3000",
        "Entre R$3000 e R$5000",
        "Acima de R$5000",
        "Mostre opções econômicas"
      ];
    } else if (intentions.location.some(word => lowerMessage.includes(word))) {
      responseContent = `📍 Temos imóveis em locais estratégicos. Se quiser, posso mostrar opções em Centro, Renascença, Cohama ou Jaracaty.`;
      suggestions = [
        "Centro",
        "Renascença",
        "Cohama",
        "Jaracaty"
      ];
    } else if (intentions.help.some(word => lowerMessage.includes(word))) {
      responseContent = `📚 Estou aqui para ajudar. Você pode me pedir para buscar imóveis por tipo, preço, região ou número de pessoas. Também posso agendar visitas e explicar o processo.`;
      suggestions = [
        "Buscar imóveis",
        "Agendar visita",
        "Como funciona o aluguel?",
        "Mostrar imóveis para 5 pessoas"
      ];
    } else {
      responseContent = `Posso te ajudar a encontrar imóveis comerciais, buscar por orçamento, região ou tamanho. Experimente dizer algo como:\n\n- "Quero uma sala comercial até R$3000"\n- "Procuro coworking mobiliado no centro"\n- "Agendar visita"`;
      suggestions = [
        "Quero uma sala comercial até R$3000",
        "Procuro coworking no centro",
        "Agendar visita",
        "Mostre opções disponíveis"
      ];
    }

    return {
      id: Date.now().toString(),
      type: "agent",
      content: responseContent,
      timestamp: new Date(),
      suggestions,
      results: responseResults
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simula processamento da IA
    setTimeout(() => {
      const agentResponse = analyzeMessage(input);
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Aqui você implementaria a API de reconhecimento de voz
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInput("Procuro um escritório no centro até R$5000");
      }, 2000);
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 size-16 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/50 to-cyan-400/50 blur-xl"
            />
            <Sparkles className="size-7 relative z-10" />
            <motion.div
              className="absolute -top-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Painel do Agente de IA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-5 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="size-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Sparkles className="size-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg">Assistente IA</h3>
                    <div className="flex items-center gap-2 text-xs text-blue-100">
                      <motion.div
                        className="size-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>Online agora</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-br from-slate-50 to-blue-50 border-b">
              {[
                { icon: Building2, label: "250+ Imóveis", color: "text-blue-600" },
                { icon: Clock, label: "24/7 Suporte", color: "text-cyan-600" },
                { icon: Zap, label: "Resp. Instant.", color: "text-purple-600" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
                  <stat.icon className={`size-4 ${stat.color}`} />
                  <span className="text-xs text-slate-600">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${message.type === "user" ? "order-2" : ""}`}>
                    {message.type === "agent" && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="size-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Sparkles className="size-3 text-white" />
                        </div>
                        <span className="text-xs text-slate-500">Assistente IA</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-4 ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
                          : "bg-white shadow-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.results && message.results.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {message.results.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => navigate(`/imovel/${item.id}`)}
                            className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm hover:border-blue-300 hover:bg-blue-50 transition"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm text-slate-500">{item.type}</p>
                                <p className="font-semibold text-[#0F172A]">{item.title}</p>
                                <p className="text-xs text-slate-500 mt-1">{item.location}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-[#0F172A]">R$ {item.price.toLocaleString('pt-BR')}</p>
                                <p className="text-xs text-slate-500">Ver detalhes</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left px-4 py-2.5 bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-300 rounded-xl text-sm text-slate-700 hover:text-blue-700 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Zap className="size-3.5 text-blue-500" />
                              {suggestion}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="size-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Sparkles className="size-3 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="size-2 bg-slate-400 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  className={`size-11 rounded-xl flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Mic className="size-5" />
                </motion.button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="size-11 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                >
                  <Send className="size-5" />
                </motion.button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                Powered by AI • São Paulo Participações
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
