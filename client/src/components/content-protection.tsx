import { useEffect, ReactNode } from 'react';

interface ContentProtectionProps {
  children: ReactNode;
  enableScreenshotProtection?: boolean;
}

export default function ContentProtection({ children, enableScreenshotProtection = false }: ContentProtectionProps) {
  useEffect(() => {
    // Desabilitar menu de contexto
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Desabilitar teclas de atalho perigosas
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + A (Selecionar tudo)
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + C (Copiar)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + V (Colar)
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + X (Recortar)
      if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + S (Salvar)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + P (Imprimir)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        return false;
      }
      
      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + Shift + I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + Shift + J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + U (Ver código-fonte)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      // Para grimórios com proteção de screenshot
      if (enableScreenshotProtection) {
        // Print Screen
        if (e.key === 'PrintScreen') {
          e.preventDefault();
          return false;
        }
        
        // Alt + Print Screen
        if (e.altKey && e.key === 'PrintScreen') {
          e.preventDefault();
          return false;
        }
        
        // Cmd + Shift + 3/4/5 (macOS screenshots)
        if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
          e.preventDefault();
          return false;
        }
      }
    };

    // Desabilitar seleção com mouse
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Desabilitar drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Proteção adicional contra DevTools
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'F12' || 
          ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key))) {
        e.preventDefault();
        return false;
      }
    };

    // Detectar tentativa de abrir DevTools (verificação de tamanho da janela)
    let devtools = { open: false, orientation: null };
    if (enableScreenshotProtection) {
      const threshold = 160;
      
      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true;
            // Redirecionar ou mostrar aviso
            console.clear();
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial;font-size:24px;background:#000;color:#fff;">Acesso não autorizado detectado</div>';
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    }

    // Adicionar event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [enableScreenshotProtection]);

  // Adicionar proteção contra print screen via CSS
  useEffect(() => {
    if (enableScreenshotProtection) {
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          * { display: none !important; }
          body::before {
            content: "Impressão não autorizada";
            display: block !important;
            font-size: 50px;
            text-align: center;
            padding: 100px;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [enableScreenshotProtection]);

  return (
    <div className={enableScreenshotProtection ? 'screenshot-protection' : ''}>
      {children}
    </div>
  );
}