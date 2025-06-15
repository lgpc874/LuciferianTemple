import { useEffect, ReactNode } from 'react';

interface ContentProtectionProps {
  children: ReactNode;
  enableScreenshotProtection?: boolean;
}

export default function ContentProtection({ children, enableScreenshotProtection = false }: ContentProtectionProps) {
  // Todas as proteções desabilitadas para desenvolvimento

  // Proteção de impressão desabilitada para desenvolvimento

  return (
    <div className={enableScreenshotProtection ? 'screenshot-protection' : ''}>
      {children}
    </div>
  );
}