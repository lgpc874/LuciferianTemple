import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import FixedHeader from "@/components/fixed-header";
import NavigationMenu from "@/components/navigation-menu";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import BibliothecaArcana from "@/pages/bibliotheca-arcana";
import Biblioteca from "@/pages/biblioteca";
import GrimoireReader from "@/pages/grimoire-reader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/bibliotheca-arcana" component={BibliothecaArcana} />
      <Route path="/biblioteca" component={Biblioteca} />
      <Route path="/grimoire/:id" component={GrimoireReader} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <FixedHeader />
          <NavigationMenu />
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
