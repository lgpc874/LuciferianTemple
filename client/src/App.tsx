import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { AnimatePresence } from "framer-motion";
import FixedHeader from "@/components/fixed-header";
import NavigationMenu from "@/components/navigation-menu";
import ContentProtection from "@/components/content-protection";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import BibliothecaArcana from "@/pages/bibliotheca-arcana";
import Biblioteca from "@/pages/biblioteca";
import GrimoireReader from "@/pages/grimoire-kindle";
import GrimoireSimple from "@/pages/grimoire-simple";
import AdminDashboard from "@/pages/admin-dashboard";

function Router() {
  const [location] = useLocation();
  const isGrimoireReader = location.startsWith('/grimoire/');
  const isAdminPage = location.startsWith('/admin');
  
  return (
    <div>
      {/* Header e menu apenas para páginas que não são de leitura nem admin */}
      {!isGrimoireReader && !isAdminPage && (
        <>
          <FixedHeader />
          <NavigationMenu />
        </>
      )}
      
      <AnimatePresence mode="wait" initial={false}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/bibliotheca-arcana" component={BibliothecaArcana} />
          <Route path="/biblioteca" component={Biblioteca} />
          <Route path="/grimoire/:id" component={GrimoireReader} />
          <Route path="/admin" component={AdminDashboard} />
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
