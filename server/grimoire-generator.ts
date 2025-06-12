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
    prompt: "Ancient leather-bound grimoire with golden occult symbols, pentagram, mystic runes, dark aged leather cover, ornate metal clasps, candlelight atmosphere, gothic medieval style, deep burgundy and gold colors"
  },
  {
    id: 2,
    title: "Lúcifer e o Caminho da Luz Negra",
    description: "Uma introdução ao luciferianismo filosófico e espiritual",
    category: "lucifer-luz-negra",
    difficultyLevel: 2,
    unlockOrder: 2,
    prompt: "Ornate black grimoire with silver Luciferian sigils, inverted pentagram, morning star symbol, obsidian cover with silver inlays, chains and dark metal bindings, ethereal black and silver design, philosophical darkness theme"
  },
  {
    id: 3,
    title: "Lilith e o Poder da Sombra Feminina",
    description: "O despertar da força oculta da Mãe Noturna",
    category: "lilith-sombra-feminina",
    difficultyLevel: 2,
    unlockOrder: 3,
    prompt: "Mysterious dark purple grimoire with feminine occult symbols, crescent moon, serpent imagery, Lilith sigils, velvet texture cover with silver moon phases, night goddess aesthetic, deep purple and silver tones"
  },
  {
    id: 4,
    title: "Simbolismo e Sigilos",
    description: "O poder dos símbolos arcanos",
    category: "simbolismo-sigilos",
    difficultyLevel: 3,
    unlockOrder: 4,
    prompt: "Intricate grimoire covered in elaborate sigils and sacred geometry, golden symbols on dark brown leather, alchemical emblems, hermetic seals, complex mystical diagrams, brass corners and bindings, scholarly occult design"
  },
  {
    id: 5,
    title: "Textos Filosóficos e Reflexões",
    description: "Escritos para provocar a alma e questionar os dogmas",
    category: "textos-filosoficos",
    difficultyLevel: 4,
    unlockOrder: 5,
    prompt: "Elegant philosophical tome with classical design, deep blue leather with gold philosophical symbols, quill and ink imagery, wisdom symbols, ancient Greek and Latin inscriptions, intellectual darkness theme, navy blue and gold"
  },
  {
    id: 6,
    title: "Meditações e Práticas Simples",
    description: "Exercícios seguros para quem está começando",
    category: "meditacoes-praticas",
    difficultyLevel: 1,
    unlockOrder: 6,
    prompt: "Serene meditation grimoire with spiritual symbols, lotus patterns, chakra imagery, peaceful dark green leather with golden spiritual emblems, zen aesthetic with occult elements, meditation poses silhouettes, green and gold design"
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