import { useState, useEffect } from "react";
import { PageTransition } from "@/components/page-transition";
import WarningOverlay from "@/components/warning-overlay";
import MainContent from "@/components/main-content";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já passou pelo warning antes
    const hasSeenWarning = localStorage.getItem('templo-veil-torn');
    if (!hasSeenWarning) {
      setShowWarning(true);
    }
  }, []);

  const handleTearVeil = () => {
    setIsTransitioning(true);
    
    // Marca que o usuário já passou pelo warning
    localStorage.setItem('templo-veil-torn', 'true');
    
    setTimeout(() => {
      setShowWarning(false);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <PageTransition className="min-h-screen relative overflow-x-hidden">
      {showWarning && (
        <WarningOverlay 
          onTearVeil={handleTearVeil}
          isTransitioning={isTransitioning}
        />
      )}
      
      {!showWarning && (
        <div className="pt-32">
          <MainContent />
        </div>
      )}
    </PageTransition>
  );
}
