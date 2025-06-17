// Criar módulos diretamente através do supabaseService
const { supabaseService } = require('./supabase-service');

async function createModulesDirectly() {
  try {
    console.log('🔥 Criando 5 novos módulos para LUXFERAT...\n');

    // Usar o cliente interno do supabaseService
    const client = supabaseService.supabase;

    const novosModulos = [
      {
        curso_id: 1,
        titulo: 'A Descida às Raízes Ancestrais',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A DESCIDA ÀS RAÍZES ANCESTRAIS</h2><p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Antes das religiões organizadas domesticarem a humanidade, nossos ancestrais conheciam verdades que foram deliberadamente enterradas. O luciferianismo não é uma invenção moderna — é o <em>resgate</em> de uma sabedoria primordial.</p><h3 style="color: #D97706; font-family: Cinzel;">O Conhecimento Proibido</h3><p style="font-family: EB Garamond; font-size: 16px;">Em todas as culturas antigas encontramos vestígios: <strong style="color: #D6342C;">Prometeu</strong> (fogo dos deuses), <strong style="color: #D6342C;">Quetzalcóatl</strong> (serpente do conhecimento), <strong style="color: #D6342C;">Enki</strong> (criador da sabedoria humana).</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE CONEXÃO ANCESTRAL</h3><p>Materiais: vela preta, vela vermelha, incenso, água, sal, objeto ancestral.</p><p>Crie círculo de sal, posicione velas, invoque: "Eu chamo os que vieram antes, que a sabedoria antiga desperte em mim."</p>',
        desafio: 'Durante 7 dias, pesquise tradições esotéricas que ressoam com você (gnosticismo, hermetismo, xamanismo). Identifique símbolos e conceitos que fazem sentido intuitivo. Conecte esta tradição ancestral com seu despertar luciferiano pessoal.',
        ordem: 3
      },
      {
        curso_id: 1,
        titulo: 'O Trabalho com a Sombra Luciferiana',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">O TRABALHO COM A SOMBRA LUCIFERIANA</h2><p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">A sombra não é o "mal" — é a totalidade de aspectos reprimidos. No caminho luciferiano, a sombra torna-se nossa maior aliada rumo à totalidade.</p><h3 style="color: #D97706; font-family: Cinzel;">Redefinindo o "Mal"</h3><p>Raiva = energia de limites, Orgulho = reconhecimento de valor, Desejo = impulso natural. A integração consciente transcende dualidades artificiais.</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE INTEGRAÇÃO DA SOMBRA</h3><p>Diante de espelho escuro com vela vermelha, pergunte: "Que aspectos meus eu nego?" Dialogue com cada aspecto: "Que função positiva você serve?" Invoque: "Eu reconheço todos os aspectos de meu ser, luz e sombra."</p>',
        desafio: 'Crie um "Atlas da Sombra" durante 10 dias. Liste aspectos rejeitados, identifique origens dos julgamentos, experimente expressar aspectos reprimidos construtivamente. Mapear persona social vs. eu autêntico.',
        ordem: 4
      },
      {
        curso_id: 1,
        titulo: 'A Magia como Tecnologia da Consciência',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A MAGIA COMO TECNOLOGIA DA CONSCIÊNCIA</h2><p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Magia é tecnologia sofisticada para operar mudanças na realidade através da manipulação consciente de estados de consciência, energia psíquica e forças naturais.</p><h3 style="color: #D97706; font-family: Cinzel;">Princípios Fundamentais</h3><p>Correspondência (como acima, assim abaixo), Vibração (tudo em movimento), Polaridade (opostos transmutáveis). Elementos: intenção clara, estado gnóstico, foco energético, libertação do resultado.</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">RITUAL BÁSICO DE MANIFESTAÇÃO</h3><p>Escolha objetivo específico (30 dias). Purificação com vela dourada, declaração: "Eu sou a chama que molda realidade." Escreva objetivo no presente, visualize sucesso, queime papel, selar com água: "Está feito."</p>',
        desafio: 'Experimento mágico controlado: 3 objetivos (pequeno/médio/desafiador), rituais em dias diferentes, registrar TODOS eventos relacionados por 3-4 semanas. Avaliar eficácia: resultado exato=100%, similar=75%, movimento=50%.',
        ordem: 5
      },
      {
        curso_id: 1,
        titulo: 'Soberania Espiritual e Autopoder',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">SOBERANIA ESPIRITUAL E AUTOPODER</h2><p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Soberania espiritual é o reconhecimento maduro de sua divindade inerente e responsabilidade total por sua existência. Autopoder vs. poder sobre outros.</p><h3 style="color: #D97706; font-family: Cinzel;">Pilares da Soberania</h3><p>Responsabilidade total (100% da vida), independência emocional (bem-estar próprio), clareza de valores (convicção pessoal). Libertação de prisões invisíveis: condicionamento social, crenças limitantes, medo do julgamento.</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">RITUAL DE DECLARAÇÃO DE SOBERANIA</h3><p>Com coroa, diante de espelho, declarar: "Eu sou o soberano de minha existência, autor de minha realidade, livre de opiniões alheias. Pela chama de Luxferat, reivindico meu trono interior." Escrever Constituição Pessoal com valores e limites.</p>',
        desafio: 'Implementação da soberania por 21 dias: Semana 1 - mapear submissões desnecessárias. Semana 2 - experimentos de autodeterminação (dizer não, expressar opinião autêntica). Semana 3 - consolidar mudanças. Identificar onde mais perde poder pessoal.',
        ordem: 6
      },
      {
        curso_id: 1,
        titulo: 'A Criação de Sua Própria Realidade',
        conteudo: '<h2 style="color: #D6342C; font-family: Cinzel Decorative;">A CRIAÇÃO DE SUA PRÓPRIA REALIDADE</h2><p style="font-family: EB Garamond; font-size: 16px; line-height: 1.6;">Você é o criador consciente de sua realidade. Não apenas influenciador, mas arquiteto ativo de sua experiência existencial.</p><h3 style="color: #D97706; font-family: Cinzel;">Princípios da Realidade Consciente</h3><p>Realidade consensual vs. pessoal, observador afeta observado, tempo é maleável. Técnicas: revisão timeline, projeção probabilística, ancoragem vibracional. Responsabilidade absoluta do criador.</p>',
        pratica: '<h3 style="color: #D97706; font-family: Cinzel;">RITUAL MESTRE DE CRIAÇÃO</h3><p>7 velas coloridas, cristal quartzo, espelho, tinta dourada. Invocação: "Eu sou a fonte de minha experiência, diretor deste drama cósmico." Escrever vida ideal no presente, visualizar 15 minutos, ancorar no cristal. Queimar pergaminho, carregar cristal 30 dias.</p>',
        desafio: 'PROJETO MESTRE - 90 dias de recriação total: Dias 1-30 desconstrução (identificar criações inconscientes), 31-60 reconstrução (mudanças práticas), 61-90 consolidação. Demonstrar transformação mensurável em 5 áreas da vida através dos princípios luciferianos.',
        ordem: 7
      }
    ];

    // Tentar inserir usando RPC para bypass de RLS
    for (const modulo of novosModulos) {
      console.log(`📖 Criando: ${modulo.titulo}`);
      
      const { data, error } = await client.rpc('insert_modulo', {
        p_curso_id: modulo.curso_id,
        p_titulo: modulo.titulo,
        p_conteudo: modulo.conteudo,
        p_pratica: modulo.pratica,
        p_desafio: modulo.desafio,
        p_ordem: modulo.ordem
      });

      if (error) {
        // Se RPC falhar, tentar inserção direta
        console.log('RPC falhou, tentando inserção direta...');
        const { error: insertError } = await client
          .from('modulos')
          .insert(modulo);
        
        if (insertError) {
          console.log(`❌ Erro: ${insertError.message}`);
        } else {
          console.log(`✅ Criado com inserção direta`);
        }
      } else {
        console.log(`✅ Criado com RPC`);
      }
    }

    console.log('\n🎉 Processo concluído!');
    console.log('Verificando módulos existentes...');
    
    // Verificar quantos módulos existem
    const { data: modulosExistentes } = await client
      .from('modulos')
      .select('id, titulo')
      .eq('curso_id', 1);
    
    console.log(`📊 Total de módulos LUXFERAT: ${modulosExistentes?.length || 0}`);
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

createModulesDirectly();