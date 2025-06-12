import { useState } from "react";
import WarningOverlay from "@/components/warning-overlay";
import MainContent from "@/components/main-content";

export default function Home() {
  const [showWarning, setShowWarning] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTearVeil = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setShowWarning(false);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {showWarning && (
        <WarningOverlay 
          onTearVeil={handleTearVeil}
          isTransitioning={isTransitioning}
        />
      )}
      
      {!showWarning && (
        <div className="pt-20">
          <MainContent />
        </div>
      )}
    </div>
  );
}
