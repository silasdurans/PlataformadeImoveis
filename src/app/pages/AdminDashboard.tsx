import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Menu,
  X,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search
} from "lucide-react";
import { useNavigate } from "react-router";
import { properties } from "../data/properties";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Verificar autenticação
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/admin/login");
  };

  // Mock data
  const stats = {
    totalProperties: 247,
    activeListings: 189,
    totalViews: 15234,
    totalLeads: 892,
    monthlyRevenue: 1250000,
    occupancyRate: 87,
    avgRating: 4.7,
    newInquiries: 34
  };

  const recentActivities = [
    { id: 1, type: "view", property: "Escritório Premium - Paulista", time: "2 min atrás", user: "João Silva" },
    { id: 2, type: "inquiry", property: "Coworking Moderno - Vila Olímpia", time: "15 min atrás", user: "Maria Santos" },
    { id: 3, type: "booking", property: "Sala Comercial - Centro", time: "1 hora atrás", user: "Pedro Costa" },
    { id: 4, type: "review", property: "Loja Térrea - Shopping", time: "2 horas atrás", user: "Ana Lima", rating: 5 },
    { id: 5, type: "view", property: "Escritório Executivo - Faria Lima", time: "3 horas atrás", user: "Carlos Mendes" },
  ];

  const topProperties = [
    { id: 1, name: "Escritório Premium - Av. Paulista", views: 1234, leads: 45, revenue: "R$ 85.000" },
    { id: 2, name: "Coworking Moderno - Vila Olímpia", views: 1089, leads: 38, revenue: "R$ 72.000" },
    { id: 3, name: "Sala Executiva - Faria Lima", views: 987, leads: 32, revenue: "R$ 65.000" },
    { id: 4, name: "Loja Comercial - Shopping", views: 856, leads: 28, revenue: "R$ 58.000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-br from-[#0A0E27] via-[#0F172A] to-[#1a1f3a] text-white transition-all duration-300 z-50 ${sidebarOpen ? "w-72" : "w-20"}`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="size-10 bg-white rounded-lg flex items-center justify-center">
                  <Building2 className="size-6 text-[#0F172A]" />
                </div>
                <div>
                  <div className="font-bold">Grupo SP</div>
                  <div className="text-xs text-blue-300">Admin</div>
                </div>
              </div>
            ) : (
              <div className="size-10 bg-white rounded-lg flex items-center justify-center mx-auto">
                <Building2 className="size-6 text-[#0F172A]" />
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: "overview", icon: BarChart3, label: "Visão Geral" },
              { id: "properties", icon: Building2, label: "Imóveis" },
              { id: "leads", icon: Users, label: "Leads" },
              { id: "analytics", icon: PieChart, label: "Análises" },
              { id: "messages", icon: MessageSquare, label: "Mensagens", badge: 12 },
              { id: "calendar", icon: Calendar, label: "Agenda" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg"
                    : "hover:bg-white/10"
                }`}
              >
                <item.icon className="size-5" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-red-500 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all mt-auto absolute bottom-6 left-6 right-6"
          >
            <LogOut className="size-5" />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">Painel Administrativo</h1>
                <p className="text-slate-500">Bem-vindo de volta, Administrador</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-10 pr-4 py-2 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
                <div className="size-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    label: "Total de Imóveis", 
                    value: stats.totalProperties, 
                    change: "+12%", 
                    icon: Building2, 
                    color: "from-blue-500 to-cyan-600",
                    bgColor: "from-blue-50 to-cyan-50"
                  },
                  { 
                    label: "Visualizações", 
                    value: stats.totalViews.toLocaleString(), 
                    change: "+23%", 
                    icon: Eye, 
                    color: "from-purple-500 to-violet-600",
                    bgColor: "from-purple-50 to-violet-50"
                  },
                  { 
                    label: "Leads Gerados", 
                    value: stats.totalLeads, 
                    change: "+8%", 
                    icon: Users, 
                    color: "from-green-500 to-emerald-600",
                    bgColor: "from-green-50 to-emerald-50"
                  },
                  { 
                    label: "Receita Mensal", 
                    value: `R$ ${(stats.monthlyRevenue / 1000).toFixed(0)}K`, 
                    change: "+15%", 
                    icon: DollarSign, 
                    color: "from-orange-500 to-amber-600",
                    bgColor: "from-orange-50 to-amber-50"
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                        <stat.icon className="size-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-[#0F172A] mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Activity className="size-5 text-blue-600" />
                      Atividade Recente
                    </h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Ver tudo
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                        <div className={`p-2 rounded-lg ${
                          activity.type === "view" ? "bg-blue-100" :
                          activity.type === "inquiry" ? "bg-green-100" :
                          activity.type === "booking" ? "bg-purple-100" :
                          "bg-yellow-100"
                        }`}>
                          {activity.type === "view" && <Eye className="size-4 text-blue-600" />}
                          {activity.type === "inquiry" && <MessageSquare className="size-4 text-green-600" />}
                          {activity.type === "booking" && <Calendar className="size-4 text-purple-600" />}
                          {activity.type === "review" && <Star className="size-4 text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-[#0F172A]">{activity.user}</div>
                          <div className="text-sm text-slate-600">{activity.property}</div>
                          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                            <Clock className="size-3" />
                            {activity.time}
                          </div>
                        </div>
                        {activity.rating && (
                          <div className="flex items-center gap-1">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Top Properties */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <TrendingUp className="size-5 text-green-600" />
                      Imóveis em Destaque
                    </h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Ver tudo
                    </button>
                  </div>
                  <div className="space-y-4">
                    {topProperties.map((property, index) => (
                      <div key={property.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow">
                        <div className="size-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#0F172A]">{property.name}</div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Eye className="size-3" />
                              {property.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="size-3" />
                              {property.leads}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{property.revenue}</div>
                          <div className="text-xs text-slate-500">Receita</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Properties Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                    <Building2 className="size-5 text-blue-600" />
                    Todos os Imóveis
                  </h2>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2">
                      <Filter className="size-4" />
                      Filtrar
                    </button>
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2">
                      <Download className="size-4" />
                      Exportar
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                      <Plus className="size-4" />
                      Novo Imóvel
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Imóvel</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Localização</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Preço</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Avaliação</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.slice(0, 8).map((property) => (
                        <tr key={property.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-medium text-[#0F172A]">{property.title}</div>
                            <div className="text-sm text-slate-500">{property.type}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <MapPin className="size-3" />
                              {property.location}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-[#0F172A]">
                              R$ {property.price.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              <CheckCircle2 className="size-3" />
                              Ativo
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <Star className="size-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{property.rating}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="size-4 text-blue-600" />
                              </button>
                              <button className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                                <Edit className="size-4 text-green-600" />
                              </button>
                              <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="size-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* Other Tabs Content */}
          {activeTab !== "overview" && (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
              <div className="inline-block p-6 bg-slate-100 rounded-full mb-4">
                <Building2 className="size-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">
                {activeTab === "properties" && "Gerenciamento de Imóveis"}
                {activeTab === "leads" && "Gerenciamento de Leads"}
                {activeTab === "analytics" && "Análises e Relatórios"}
                {activeTab === "messages" && "Central de Mensagens"}
                {activeTab === "calendar" && "Agenda e Visitas"}
              </h3>
              <p className="text-slate-600">Esta seção está em desenvolvimento</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
