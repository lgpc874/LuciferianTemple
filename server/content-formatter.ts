// Sistema de formatação automática de conteúdo para grimórios
export class ContentFormatter {
  
  // Aplica formatação automática ao conteúdo bruto
  static formatContent(rawContent: string): string {
    let formattedContent = rawContent;

    // 1. Identificar e formatar títulos de capítulos
    formattedContent = this.formatChapterTitles(formattedContent);

    // 2. Identificar e formatar citações e menções
    formattedContent = this.formatQuotes(formattedContent);

    // 3. Identificar e formatar termos em latim
    formattedContent = this.formatLatinTerms(formattedContent);

    // 4. Identificar e formatar listas
    formattedContent = this.formatLists(formattedContent);

    // 5. Identificar e formatar ênfases
    formattedContent = this.formatEmphasis(formattedContent);

    // 6. Identificar e formatar separadores místicos
    formattedContent = this.formatMysticalSeparators(formattedContent);

    // 7. Adicionar parágrafos se necessário
    formattedContent = this.formatParagraphs(formattedContent);

    return formattedContent;
  }

  // Identifica títulos como "Capítulo 1:", "1.", números romanos, etc.
  private static formatChapterTitles(content: string): string {
    return content
      // Capítulo com número
      .replace(/^(Capítulo\s+\d+[:\-\s]*.*?)$/gmi, '<h2 class="text-2xl font-cinzel text-golden-amber mb-4 text-center border-b border-golden-amber/20 pb-2">$1</h2>')
      
      // Números romanos no início da linha
      .replace(/^([IVX]+\.\s*.*?)$/gmi, '<h3 class="text-xl font-cinzel text-golden-amber mb-3 text-center">$1</h3>')
      
      // Números seguidos de ponto no início
      .replace(/^(\d+\.\s*[A-ZÁÀÉÍÓÚ].*?)$/gmi, '<h3 class="text-lg font-cinzel text-golden-amber mb-3">$1</h3>')
      
      // Títulos em maiúsculas (3+ palavras)
      .replace(/^([A-ZÁÀÉÍÓÚ\s]{10,})$/gmi, '<h2 class="text-xl font-cinzel text-golden-amber mb-4 text-center tracking-wide">$1</h2>');
  }

  // Identifica citações com aspas, travessões ou indentação
  private static formatQuotes(content: string): string {
    return content
      // Citações com aspas duplas
      .replace(/"([^"]+)"/g, '<blockquote class="border-l-4 border-golden-amber/40 pl-4 italic text-golden-amber/90 my-3">"$1"</blockquote>')
      
      // Citações com aspas simples longas
      .replace(/'([^']{20,})'/g, '<blockquote class="border-l-4 border-golden-amber/40 pl-4 italic text-golden-amber/90 my-3">\'$1\'</blockquote>')
      
      // Linhas que começam com travessão (diálogos)
      .replace(/^[\-—]\s*(.+)$/gmi, '<p class="italic text-golden-amber/90 ml-4">— $1</p>');
  }

  // Identifica termos em latim comuns
  private static formatLatinTerms(content: string): string {
    const latinTerms = [
      'ad astra', 'aeternum', 'alma mater', 'alter ego', 'ars longa', 'ave atque vale',
      'carpe diem', 'cogito ergo sum', 'corpus', 'curriculum vitae', 'de facto',
      'deus ex machina', 'et cetera', 'ex libris', 'fiat lux', 'gloria in excelsis',
      'homo sapiens', 'in memoriam', 'ipso facto', 'lux aeterna', 'magna carta',
      'memento mori', 'per aspera ad astra', 'post mortem', 'requiescat in pace',
      'sine qua non', 'terra incognita', 'veni vidi vici', 'veritas', 'via crucis',
      'lucifer', 'astaroth', 'belial', 'asmodeus', 'baphomet', 'abraxas',
      'gnosis', 'pneuma', 'archon', 'demiurgo', 'pleroma', 'sophia',
      'mysterium', 'magnum opus', 'prima materia', 'solve et coagula'
    ];

    let formattedContent = content;
    
    latinTerms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'g');
      formattedContent = formattedContent.replace(regex, (match) => 
        `<em class="text-golden-amber font-medium tracking-wide">${match}</em>`
      );
    });

    return formattedContent;
  }

  // Identifica listas com hífen, asterisco ou números
  private static formatLists(content: string): string {
    return content
      // Listas com hífen ou asterisco
      .replace(/^[\-\*]\s*(.+)$/gmi, '<li class="mb-2 text-muted-foreground">• $1</li>')
      
      // Envolve listas consecutivas em <ul>
      .replace(/(<li[^>]*>.*?<\/li>\s*)+/g, '<ul class="list-none space-y-1 my-4 ml-4">$&</ul>');
  }

  // Identifica texto em negrito, itálico e sublinhado
  private static formatEmphasis(content: string): string {
    return content
      // Texto entre **negrito**
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-golden-amber font-semibold">$1</strong>')
      
      // Texto entre *itálico*
      .replace(/\*([^*]+)\*/g, '<em class="italic text-golden-amber/90">$1</em>')
      
      // Texto entre _sublinhado_
      .replace(/_([^_]+)_/g, '<span class="underline decoration-golden-amber/60">$1</span>')
      
      // Palavras em MAIÚSCULAS (ênfase)
      .replace(/\b([A-ZÁÀÉÍÓÚ]{3,})\b/g, '<span class="text-golden-amber font-bold tracking-wider">$1</span>');
  }

  // Adiciona separadores místicos
  private static formatMysticalSeparators(content: string): string {
    return content
      // Linha com apenas asteriscos ou hífens
      .replace(/^[\*\-_]{3,}$/gmi, '<div class="text-center my-6 text-golden-amber">⸸ ✦ ⸸</div>')
      
      // Adiciona separador entre seções longas
      .replace(/(\n\n\n+)/g, '\n\n<div class="text-center my-6 text-golden-amber opacity-60">◆ ◇ ◆</div>\n\n');
  }

  // Formata parágrafos e quebras de linha
  private static formatParagraphs(content: string): string {
    return content
      // Remove múltiplas quebras de linha
      .replace(/\n{3,}/g, '\n\n')
      
      // Envolve parágrafos em <p> se não estão em outras tags
      .replace(/^(?!<[^>]+>)(.+)$/gmi, '<p class="mb-4 leading-relaxed">$1</p>')
      
      // Remove <p> vazios
      .replace(/<p[^>]*>\s*<\/p>/g, '')
      
      // Corrige <p> dentro de outras tags
      .replace(/<(h[1-6]|blockquote|li)[^>]*><p[^>]*>(.*?)<\/p><\/(h[1-6]|blockquote|li)>/g, '<$1>$2</$3>');
  }

  // Gera título de capítulo baseado no conteúdo
  static generateChapterTitle(content: string, chapterNumber: number, category: string): string {
    const categoryTitles: Record<string, string[]> = {
      'introducao-ocultismo': [
        'A Origem dos Mistérios',
        'Os Primeiros Passos na Senda',
        'Despertar da Consciência',
        'O Véu da Realidade',
        'Fundamentos Arcanos'
      ],
      'lucifer-luz-conhecimento': [
        'A Chama da Sabedoria',
        'O Portador da Luz',
        'Conhecimento Proibido',
        'A Rebelião Cósmica',
        'Iluminação Luciferiana'
      ],
      'lilith-poder-sombra': [
        'A Primeira Mulher',
        'Soberania Feminina',
        'Os Mistérios da Sombra',
        'Liberdade Primordial',
        'O Poder da Noite'
      ],
      'magia-cerimonial': [
        'Preparação do Templo',
        'Instrumentos Sagrados',
        'Invocação dos Guardiões',
        'O Círculo Mágico',
        'Rituais de Poder'
      ],
      'simbolismo-esoterico': [
        'Linguagem dos Símbolos',
        'Arquétipos Universais',
        'Geometria Sagrada',
        'Numerologia Mística',
        'Correspondências Herméticas'
      ]
    };

    const titles = categoryTitles[category] || [
      'Ensinamentos Antigos',
      'Sabedoria Oculta',
      'Mistérios Revelados',
      'Conhecimento Secreto',
      'Práticas Arcanas'
    ];

    // Se há títulos específicos para a categoria, usa eles em ordem
    if (chapterNumber <= titles.length) {
      return `Capítulo ${chapterNumber}: ${titles[chapterNumber - 1]}`;
    }

    // Caso contrário, gera título baseado no conteúdo
    const firstLine = content.split('\n')[0]?.trim();
    if (firstLine && firstLine.length > 10 && firstLine.length < 60) {
      return `Capítulo ${chapterNumber}: ${firstLine}`;
    }

    return `Capítulo ${chapterNumber}: ${titles[chapterNumber % titles.length]}`;
  }

  // Estima tempo de leitura baseado no conteúdo
  static estimateReadingTime(content: string): number {
    // Remove tags HTML para contar apenas texto
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    
    // Assume 200 palavras por minuto (velocidade média de leitura)
    const minutes = Math.ceil(wordCount / 200);
    
    // Mínimo de 2 minutos, máximo de 30
    return Math.max(2, Math.min(30, minutes));
  }

  // Gera descrição automática do grimório baseado no conteúdo
  static generateDescription(title: string, category: string, firstChapterContent?: string): string {
    const categoryDescriptions: Record<string, string> = {
      'introducao-ocultismo': 'Uma jornada pelos fundamentos do conhecimento oculto, revelando os mistérios ancestrais e preparando o iniciante para os caminhos esotéricos.',
      'lucifer-luz-conhecimento': 'Exploração profunda da figura de Lúcifer como portador da luz e conhecimento, desvendando os mistérios da iluminação espiritual.',
      'lilith-poder-sombra': 'Mergulho nos mistérios de Lilith e o poder feminino primordial, revelando os aspectos sombrios da natureza divina.',
      'magia-cerimonial': 'Guia completo das práticas mágicas cerimoniais, incluindo rituais, instrumentos e técnicas de manifestação.',
      'simbolismo-esoterico': 'Decodificação dos símbolos sagrados e sua aplicação nos caminhos espirituais, revelando a linguagem secreta dos mistérios.'
    };

    let description = categoryDescriptions[category] || 
      'Um compêndio de ensinamentos esotéricos e práticas ancestrais para o desenvolvimento espiritual.';

    // Se há conteúdo do primeiro capítulo, adapta a descrição
    if (firstChapterContent) {
      const preview = firstChapterContent.replace(/<[^>]*>/g, '').substring(0, 100);
      if (preview.length > 50) {
        description += ` Este grimório inicia com: "${preview}..."`;
      }
    }

    return description;
  }
}