import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Results from "./pages/Results";
import PropertyDetail from "./pages/PropertyDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ClientAuth from "./pages/ClientAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/resultados",
    Component: Results,
  },
  {
    path: "/imovel/:id",
    Component: PropertyDetail,
  },
  {
    path: "/cliente/login",
    Component: ClientAuth,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
]);
