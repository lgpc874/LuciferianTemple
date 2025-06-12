import { generateAllGrimoireCovers, grimoireCategories } from './grimoire-generator.js';

async function main() {
  console.log('🎨 Gerando capas dos grimórios...\n');
  
  try {
    const covers = await generateAllGrimoireCovers();
    
    console.log('\n📚 Capas geradas com sucesso:');
    
    for (const category of grimoireCategories) {
      const coverUrl = covers[category.category];
      if (coverUrl) {
        console.log(`${category.title}: ${coverUrl}`);
      }
    }
    
    console.log('\n✅ Todas as capas foram geradas!');
    
  } catch (error) {
    console.error('❌ Erro ao gerar capas:', error);
  }
}

main();