import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { AnimatePresence } from "framer-motion";

import NavigationMenu from "@/components/navigation-menu";
import ContentProtection from "@/components/content-protection";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";

import Biblioteca from "@/pages/biblioteca";
import AdminDashboard from "@/pages/admin-dashboard";
import Perfil from "@/pages/perfil";

function Router() {
  const [location] = useLocation();
  const isGrimoireReader = location.startsWith('/grimoire/');
  const isAdminPage = location.startsWith('/admin');
  
  return (
    <div>
      {/* Menu apenas para páginas que não são de leitura nem admin */}
      {!isGrimoireReader && !isAdminPage && (
        <NavigationMenu />
      )}
      
      <AnimatePresence mode="wait" initial={false}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/perfil" component={Perfil} />
          <Route path="/biblioteca" component={Biblioteca} />
          <Route path="/admin-dashboard/:tab?" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <ContentProtection>
            <Toaster />
            <Router />
          </ContentProtection>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
