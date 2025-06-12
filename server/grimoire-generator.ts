import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

export const grimoireCategories = [
  {
    id: 1,
    title: "Introdução ao Ocultismo",
    description: "Conceitos básicos para os buscadores do Despertar",
    category: "introducao-ocultismo",
    difficultyLevel: 1,
    unlockOrder: 1,
    prompt: "Ancient leather-bound book with ornate golden decorative patterns, aged burgundy leather cover, brass corner reinforcements, mystical geometric designs embossed on cover, candlelit library setting, vintage scholarly aesthetic"
  },
  {
    id: 2,
    title: "Lúcifer e o Caminho da Luz Negra",
    description: "Uma introdução ao luciferianismo filosófico e espiritual",
    category: "lucifer-luz-negra",
    difficultyLevel: 2,
    unlockOrder: 2,
    prompt: "Elegant black leather tome with silver decorative elements, ornate silver clasps and bindings, star and celestial motifs, sophisticated gothic design, philosophical manuscript aesthetic, black and silver color scheme"
  },
  {
    id: 3,
    title: "Lilith e o Poder da Sombra Feminina",
    description: "O despertar da força oculta da Mãe Noturna",
    category: "lilith-sombra-feminina",
    difficultyLevel: 2,
    unlockOrder: 3,
    prompt: "Beautiful purple velvet-bound grimoire with silver moon phase decorations, crescent moon emblems, flowing feminine curves in design, elegant silver clasps, night sky aesthetic, deep purple and silver tones"
  },
  {
    id: 4,
    title: "Simbolismo e Sigilos",
    description: "O poder dos símbolos arcanos",
    category: "simbolismo-sigilos",
    difficultyLevel: 3,
    unlockOrder: 4,
    prompt: "Scholarly manuscript with intricate geometric patterns, golden mathematical symbols, sacred geometry designs, alchemical diagrams, brown leather with gold embossing, academic occult study aesthetic"
  },
  {
    id: 5,
    title: "Textos Filosóficos e Reflexões",
    description: "Escritos para provocar a alma e questionar os dogmas",
    category: "textos-filosoficos",
    difficultyLevel: 4,
    unlockOrder: 5,
    prompt: "Classical philosophical tome with deep blue leather cover, gold lettering and decorative borders, quill and inkwell imagery, ancient wisdom symbols, scholarly library setting, navy blue and gold design"
  },
  {
    id: 6,
    title: "Meditações e Práticas Simples",
    description: "Exercícios seguros para quem está começando",
    category: "meditacoes-praticas",
    difficultyLevel: 1,
    unlockOrder: 6,
    prompt: "Peaceful meditation manual with forest green leather cover, golden lotus flower embossing, zen garden elements, tranquil spiritual symbols, nature-inspired decorative patterns, green and gold color palette"
  }
];

export async function generateGrimoireCover(category: typeof grimoireCategories[0]): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${category.prompt}, mystical book cover, ancient grimoire, high quality, detailed artwork, dark fantasy style, book lying flat view, realistic textures`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || "";
  } catch (error) {
    console.error(`Error generating cover for ${category.title}:`, error);
    throw new Error(`Failed to generate cover image for ${category.title}`);
  }
}

export async function generateAllGrimoireCovers(): Promise<{[key: string]: string}> {
  const covers: {[key: string]: string} = {};
  
  for (const category of grimoireCategories) {
    console.log(`Generating cover for: ${category.title}`);
    try {
      const coverUrl = await generateGrimoireCover(category);
      covers[category.category] = coverUrl;
      console.log(`✓ Generated cover for: ${category.title}`);
      
      // Pequena pausa entre as gerações para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Failed to generate cover for: ${category.title}`, error);
    }
  }
  
  return covers;
}