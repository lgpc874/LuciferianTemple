// Sistema de formatação automática para grimórios
// Aplica estética mística e luciferiana ao conteúdo

export interface FormattedChapter {
  title: string;
  content: string;
  formattedContent: string;
}

export interface FormattedGrimoire {
  title: string;
  description: string;
  chapters: FormattedChapter[];
  metadata: {
    wordCount: number;
    estimatedReadingTime: number;
    formattedAt: Date;
  };
}

// Símbolos místicos e luciferianos para ornamentação
const MYSTICAL_SYMBOLS = {
  chapter: "⧭",
  section: "🜚", 
  ritual: "⚔",
  warning: "⚠",
  quote: "🜔",
  flame: "🔥",
  pentagram: "⛤",
  separator: "◈◈◈"
};

// Palavras-chave que recebem formatação especial
const SPECIAL_TERMS = {
  lucifer: ["Lúcifer", "Lucifer"],
  ritual: ["ritual", "rituais", "cerimônia", "invocação"],
  latin: ["astaroth", "belial", "leviathan", "mammon", "baphomet", "sigil", "sigilo"],
  power: ["poder", "energia", "força", "magia", "magick"],
  elements: ["fogo", "água", "ar", "terra", "éter", "quintessência"]
};

export function formatGrimoireContent(
  title: string,
  description: string,
  chapters: Array<{ title: string; content: string }>
): FormattedGrimoire {
  const formattedChapters = chapters.map((chapter, index) => 
    formatChapter(chapter, index + 1)
  );

  const totalWords = formattedChapters.reduce(
    (acc, chapter) => acc + countWords(chapter.content), 0
  );

  return {
    title: formatTitle(title),
    description: formatDescription(description),
    chapters: formattedChapters,
    metadata: {
      wordCount: totalWords,
      estimatedReadingTime: Math.ceil(totalWords / 200), // 200 palavras por minuto
      formattedAt: new Date()
    }
  };
}

function formatChapter(chapter: { title: string; content: string }, chapterNumber: number): FormattedChapter {
  const formattedTitle = `${MYSTICAL_SYMBOLS.chapter} Capítulo ${chapterNumber}: ${chapter.title}`;
  const formattedContent = formatContentText(chapter.content);

  return {
    title: chapter.title,
    content: chapter.content,
    formattedContent: `
<div class="grimoire-chapter">
  <div class="chapter-header">
    <h2 class="chapter-title">${formattedTitle}</h2>
    <div class="chapter-ornament">${MYSTICAL_SYMBOLS.separator}</div>
  </div>
  
  <div class="chapter-content">
    ${formattedContent}
  </div>
  
  <div class="chapter-footer">
    <div class="chapter-ornament">${MYSTICAL_SYMBOLS.separator}</div>
  </div>
</div>
    `.trim()
  };
}

function formatTitle(title: string): string {
  return `${MYSTICAL_SYMBOLS.flame} ${title} ${MYSTICAL_SYMBOLS.flame}`;
}

function formatDescription(description: string): string {
  return `<div class="grimoire-description">${formatContentText(description)}</div>`;
}

function formatContentText(content: string): string {
  let formatted = content;

  // Quebrar em parágrafos
  const paragraphs = formatted.split('\n\n').filter(p => p.trim());
  
  formatted = paragraphs.map(paragraph => {
    let formattedParagraph = paragraph.trim();

    // Detectar e formatar títulos/seções (linhas que terminam com :)
    if (formattedParagraph.endsWith(':') && formattedParagraph.length < 100) {
      return `<h3 class="section-title">${MYSTICAL_SYMBOLS.section} ${formattedParagraph}</h3>`;
    }

    // Detectar citações (parágrafos entre aspas)
    if (formattedParagraph.startsWith('"') && formattedParagraph.endsWith('"')) {
      return `<blockquote class="mystical-quote">
        <span class="quote-symbol">${MYSTICAL_SYMBOLS.quote}</span>
        ${formattedParagraph}
        <span class="quote-symbol">${MYSTICAL_SYMBOLS.quote}</span>
      </blockquote>`;
    }

    // Detectar listas (linhas que começam com -, * ou números)
    if (formattedParagraph.includes('\n-') || formattedParagraph.includes('\n*') || /\n\d+\./.test(formattedParagraph)) {
      const lines = formattedParagraph.split('\n');
      const listItems = lines.map(line => {
        if (line.trim().match(/^[-*]\s/) || line.trim().match(/^\d+\.\s/)) {
          return `<li class="mystical-list-item">${line.replace(/^[-*\d\.]\s*/, '')}</li>`;
        }
        return line;
      }).join('\n');
      return `<ul class="mystical-list">${listItems}</ul>`;
    }

    // Detectar avisos/advertências (parágrafos que contêm palavras de aviso)
    if (/\b(cuidado|atenção|aviso|perigo|importante)\b/i.test(formattedParagraph)) {
      return `<div class="warning-box">
        <span class="warning-symbol">${MYSTICAL_SYMBOLS.warning}</span>
        ${formattedParagraph}
      </div>`;
    }

    // Aplicar formatação especial a termos específicos
    formattedParagraph = applyTermFormatting(formattedParagraph);

    // Detectar e formatar texto em latim (palavras em maiúscula ou termos conhecidos)
    formattedParagraph = formatLatinTerms(formattedParagraph);

    return `<p class="grimoire-paragraph">${formattedParagraph}</p>`;
  }).join('\n\n');

  return formatted;
}

function applyTermFormatting(text: string): string {
  let formatted = text;

  // Formatar nomes de entidades luciferianas
  SPECIAL_TERMS.lucifer.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    formatted = formatted.replace(regex, `<span class="entity-name">${term}</span>`);
  });

  // Formatar termos de ritual
  SPECIAL_TERMS.ritual.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    formatted = formatted.replace(regex, `<span class="ritual-term">${term}</span>`);
  });

  // Formatar termos de poder
  SPECIAL_TERMS.power.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    formatted = formatted.replace(regex, `<span class="power-term">${term}</span>`);
  });

  // Formatar elementos
  SPECIAL_TERMS.elements.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    formatted = formatted.replace(regex, `<span class="element-term">${term}</span>`);
  });

  return formatted;
}

function formatLatinTerms(text: string): string {
  let formatted = text;

  // Detectar palavras em latim conhecidas
  SPECIAL_TERMS.latin.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    formatted = formatted.replace(regex, `<em class="latin-term">${term}</em>`);
  });

  // Detectar frases em maiúscula (possível latim ritual)
  formatted = formatted.replace(/\b[A-Z]{3,}\b/g, (match) => {
    return `<strong class="ritual-formula">${match}</strong>`;
  });

  return formatted;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

// CSS para a formatação automática
export const GRIMOIRE_CSS = `
<style>
.grimoire-chapter {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.chapter-header {
  text-align: center;
  margin-bottom: 2rem;
}

.chapter-title {
  font-family: 'Cinzel', serif;
  color: #ffc107;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}

.chapter-ornament {
  color: #ffc107;
  font-size: 1.2rem;
  opacity: 0.8;
}

.section-title {
  font-family: 'Cinzel', serif;
  color: #ffc107;
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem 0;
  text-shadow: 0 0 5px rgba(255, 193, 7, 0.3);
}

.grimoire-paragraph {
  font-family: 'EB Garamond', serif;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: justify;
}

.mystical-quote {
  background: rgba(139, 69, 19, 0.2);
  border-left: 3px solid #ffc107;
  padding: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  position: relative;
}

.quote-symbol {
  color: #ffc107;
  font-size: 1.2rem;
  opacity: 0.7;
}

.mystical-list {
  list-style: none;
  padding-left: 0;
}

.mystical-list-item {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.mystical-list-item::before {
  content: "◈";
  position: absolute;
  left: 0;
  color: #ffc107;
}

.warning-box {
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.5);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.warning-symbol {
  color: #dc3545;
  margin-right: 0.5rem;
}

.entity-name {
  color: #dc3545;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
}

.ritual-term {
  color: #ffc107;
  font-weight: 500;
}

.power-term {
  color: #e83e8c;
  font-weight: 500;
}

.element-term {
  color: #20c997;
  font-weight: 500;
}

.latin-term {
  color: #ffc107;
  font-style: italic;
  font-weight: 500;
}

.ritual-formula {
  color: #dc3545;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 0 0 5px rgba(220, 53, 69, 0.3);
}

.grimoire-description {
  font-family: 'EB Garamond', serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
`;