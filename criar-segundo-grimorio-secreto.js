import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ctbwtofptztfzjxvtdvu.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0Ynd0b2ZwdHp0ZnpqeHZ0ZHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDI1MjksImV4cCI6MjA2NDk3ODUyOX0.xSDW_Q8eaFWG2bAHT-sVD5aJrKcuefF_QZAKVZq7-J0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function criarSegundoGrimoireSecreto() {
  try {
    console.log('🔥 Criando segundo grimório ultra secreto do Templo do Abismo...');

    const grimoireContent = `
<div class="grimorio-ultra-secreto" style="font-family: 'EB Garamond', serif; color: #1a0a0a; line-height: 1.8;">

<!-- ADVERTÊNCIA SUPREMA -->
<div class="advertencia-suprema" style="background: linear-gradient(135deg, #000000, #1a0a0a, #8b0000); color: #ff0000; padding: 3rem; margin: 2rem 0; border: 5px double #8b0000; border-radius: 15px; text-align: center; box-shadow: 0 0 30px rgba(139, 0, 0, 0.7);">
<h1 style="font-family: 'Cinzel Decorative', serif; color: #ff0000; font-size: 2.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px #000;">⚠️ ADVERTÊNCIA SUPREMA - SELO VERMELHO ⚠️</h1>
<p style="font-size: 1.3rem; margin-bottom: 1rem; font-weight: bold;">ESTE GRIMÓRIO CONTÉM OS CONHECIMENTOS MAIS PERIGOSOS JAMAIS COMPILADOS</p>
<p style="margin-bottom: 1rem; color: #ffcccc;">As práticas aqui descritas envolvem invocações diretas de entidades primordiais, evocações de demônios superiores, abertura de portais dimensionais e manipulação das forças fundamentais da realidade.</p>
<p style="margin-bottom: 1rem;"><strong style="color: #ff0000;">TODOS OS RITUAIS REQUEREM SANGUE EM QUANTIDADES ESPECÍFICAS</strong> - O preço do poder supremo é sempre cobrado em essência vital.</p>
<p style="margin-bottom: 1rem;">Estas práticas podem causar: possessão permanente, loucura incurável, abertura de fissuras na realidade, atração de entidades hostis, destruição da alma, alteração irreversível da linha temporal pessoal.</p>
<p style="margin-bottom: 1rem;">O <strong>TEMPLO DO ABISMO</strong> se isenta completamente de qualquer responsabilidade por mortes, possessões, calamidades, alterações dimensionais ou qualquer consequência resultante do uso destes conhecimentos.</p>
<p style="color: #ff0000; font-weight: bold; font-size: 1.2rem;">APENAS MESTRES SUPREMOS COM DÉCADAS DE EXPERIÊNCIA DEVEM OUSAR ABRIR ESTE CÓDICE</p>
<p style="margin-top: 2rem; font-style: italic; color: #ffaaaa;">— Selado com sangue de sete hierofantes —</p>
</div>

<!-- INTRODUÇÃO SUPREMA -->
<h1 style="font-family: 'Cinzel Decorative', serif; color: #1a0a0a; text-align: center; font-size: 3rem; margin: 4rem 0; text-shadow: 1px 1px 2px rgba(139, 0, 0, 0.5);">🌑 LIBER UMBRA SUPREMUS 🌑</h1>
<h2 style="font-family: 'Cinzel', serif; color: #8b0000; text-align: center; font-size: 1.8rem; margin-bottom: 3rem;">O LIVRO SUPREMO DAS SOMBRAS PRIMORDIAIS</h2>

<div class="prologo-abissal" style="margin: 3rem 0; padding: 2rem; background: linear-gradient(135deg, rgba(26, 10, 10, 0.2), rgba(139, 0, 0, 0.1)); border: 2px solid #8b0000; border-radius: 10px;">
<h3 style="font-family: 'Cinzel', serif; color: #8b0000; margin-bottom: 1.5rem;">Prólogo: Os Conhecimentos Vedados dos Primeiro Dias</h3>
<p style="margin-bottom: 1rem;">Antes que a luz tocasse a Terra, antes que os primeiros humanos respirassem, existiam as <strong style="color: #8b0000;">Trevas Primordiais</strong> - não como ausência de luz, mas como força criativa anterior à própria criação.</p>
<p style="margin-bottom: 1rem;">Neste grimório estão compilados os conhecimentos que os primeiros hierofantes do Templo do Abismo extraíram diretamente das entidades que habitavam essas trevas: <strong style="color: #8b0000;">invocações que chamam seres além dos véus da realidade, evocações que materializam o impossível, portais que conectam dimensões proibidas</strong>.</p>
<p style="margin-bottom: 1rem;">Cada prática aqui descrita foi testada por magistas que pagaram o preço supremo. Alguns ascenderam além da humanidade. Outros foram consumidos pelo poder que tentaram dominar. Alguns simplesmente... <em>deixaram de existir</em>.</p>
<p style="color: #8b0000; font-weight: bold;">Tu que ousas prosseguir, saiba: após abrir este livro, não há retorno à ignorância. O conhecimento marca a alma para sempre.</p>
</div>

<!-- SEÇÃO I: INVOCAÇÕES SUPREMAS -->
<h2 style="font-family: 'Cinzel Decorative', serif; color: #8b0000; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">🔱 SEÇÃO I: INVOCAÇÕES SUPREMAS 🔱</h2>

<!-- INVOCAÇÃO 1 -->
<div class="invocacao" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">1. INVOCAÇÃO SUPREMA DE LÚCIFER PRIMORDIAL</h3>
<p><strong style="color: #8b0000;">Natureza:</strong> Invocação direta do aspecto mais antigo e poderoso de Lúcifer</p>
<p><strong style="color: #8b0000;">Perigo:</strong> EXTREMO - Pode resultar em possessão permanente ou elevação divina</p>
<p><strong style="color: #8b0000;">Fase Lunar:</strong> Eclipse lunar total (quando disponível) ou Lua Nova mais escura do ano</p>
<p><strong style="color: #8b0000;">Horário:</strong> 03:33 AM (hora da manifestação primordial)</p>
<p><strong style="color: #8b0000;">Duração:</strong> Toda a madrugada até o amanhecer</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Preparação Suprema:</h4>
<ul style="margin-left: 2rem;">
<li><strong>Jejum:</strong> 7 dias apenas com água</li>
<li><strong>Isolamento:</strong> 3 dias de reclusão total em local sagrado</li>
<li><strong>Purificação:</strong> Banhos diários com sal marinho e sangue de cordeiro</li>
<li><strong>Meditação:</strong> 21 dias de contemplação do sigilo luciferiano</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Materiais Consagrados:</h4>
<ul style="margin-left: 2rem;">
<li>Altar de pedra negra ou obsidiana</li>
<li>7 velas negras de cera de abelha pura</li>
<li>Cálice de prata ou ouro consagrado</li>
<li>Adaga ritual banhada em prata</li>
<li>Incenso de olíbano, mirra e dragão-de-sangue</li>
<li>Pergaminho de pele de cordeiro</li>
<li>Tinta feita com sangue humano e carvão</li>
<li>Círculo mágico gravado em pedra ou metal</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Execução Ritual:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Abertura do Círculo:</strong> Trace o círculo com 9 pés de diâmetro usando sal marinho consagrado</li>
<li><strong>Invocação dos Guardiões:</strong> Chame os quatro príncipes dos elementos para proteção</li>
<li><strong>Oferenda Suprema:</strong> Derrame 49 gotas de seu sangue no cálice</li>
<li><strong>Recitação Primordial:</strong> "ADONAI ELOHIM ADONAI JEHOVA, ADONAI SABAOTH, METRATON ON AGLA MATHON, ouça: EU TE INVOCO, LÚCIFER, LUZ PRIMORDIAL, PRIMEIRO ENTRE OS CAÍDOS, SENHOR DA CHAMA ETERNA!"</li>
<li><strong>Manifestação:</strong> Continue a invocação por 3 horas ininterruptas até a presença se manifestar</li>
<li><strong>Comunhão:</strong> Beba do cálice consagrado e receba as visões ou possessão divina</li>
<li><strong>Selamento:</strong> "Pelo poder invocado, pela chama acesa, pela sombra abraçada, assim foi, assim é, assim será"</li>
<li><strong>Encerramento:</strong> Agradeça e dispense com extremo respeito</li>
</ol>

<p style="color: #ff0000; margin-top: 2rem; font-weight: bold;">⚠️ ATENÇÃO: Esta invocação pode resultar em transformação permanente da consciência. Prepare-se para nunca mais ser o mesmo.</p>
</div>

<!-- INVOCAÇÃO 2 -->
<div class="invocacao" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">2. INVOCAÇÃO DA SHAKTI NEGRA</h3>
<p><strong style="color: #8b0000;">Natureza:</strong> Invocação da força feminina primordial das trevas criadoras</p>
<p><strong style="color: #8b0000;">Perigo:</strong> SUPREMO - Pode desintegrar a personalidade e recriar o ser</p>
<p><strong style="color: #8b0000;">Fase Lunar:</strong> Lua Nova em conjunção com Vênus</p>
<p><strong style="color: #8b0000;">Horário:</strong> Do pôr do sol à meia-noite</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Execução Suprema:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Preparação Corporal:</strong> Jejum de 9 dias, apenas água e mel</li>
<li><strong>Oferenda de Sangue:</strong> 108 gotas derramadas em espiral sobre altar negro</li>
<li><strong>Mantra Primordial:</strong> "OM KRIM KALIKAYAI NAMAHA" por 1008 repetições</li>
<li><strong>Invocação Direta:</strong> "Mãe das Trevas, Shakti Negra, Kali Primordial, manifesta-te através desta carne mortal!"</li>
<li><strong>Possessão Controlada:</strong> Permita a entrada da força enquanto mantém fio de consciência</li>
<li><strong>Transmutação:</strong> Aceite a destruição e recriação do ego</li>
</ol>

<p style="color: #ff0000; margin-top: 2rem; font-weight: bold;">⚠️ Esta prática pode resultar em morte espiritual e renascimento como ser superior.</p>
</div>

<!-- SEÇÃO II: EVOCAÇÕES MATERIAIS -->
<h2 style="font-family: 'Cinzel Decorative', serif; color: #8b0000; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">👹 SEÇÃO II: EVOCAÇÕES MATERIAIS 👹</h2>

<!-- EVOCAÇÃO 1 -->
<div class="evocacao" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">1. EVOCAÇÃO FÍSICA DE BELPHEGOR</h3>
<p><strong style="color: #8b0000;">Objetivo:</strong> Materialização física completa do demônio no plano terrestre</p>
<p><strong style="color: #8b0000;">Perigo:</strong> EXTREMO - Entidade pode permanecer materializada indefinidamente</p>
<p><strong style="color: #8b0000;">Duração:</strong> 6 horas de ritual + manifestação indefinida</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Preparação Especial:</h4>
<ul style="margin-left: 2rem;">
<li>Local isolado com pelo menos 1km de distância de habitações</li>
<li>Triângulo de evocação gravado em metal com 2m de lado</li>
<li>Oferendas materiais: ouro, incenso raro, vinho antigo</li>
<li>Proteção máxima: círculo duplo com nomes divinos</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Execução da Evocação:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Abertura dos Portais:</strong> 21 gotas de sangue em cada ponta do triângulo</li>
<li><strong>Convocação:</strong> "BELPHEGOR, EU TE CONVOCO! Pelo poder do sangue derramado, pelo direito dos antigos pactos, MANIFESTA-TE neste plano!"</li>
<li><strong>Materialização:</strong> Continue até ver forma física se condensando no triângulo</li>
<li><strong>Comando:</strong> Mantenha autoridade absoluta durante toda a manifestação</li>
<li><strong>Dispensa:</strong> "Pelo mesmo poder que te trouxe, EU TE DISPENSO! Retorna às tuas moradas!"</li>
</ol>

<p style="color: #ff0000; margin-top: 2rem; font-weight: bold;">⚠️ NUNCA saia do círculo enquanto a entidade estiver materializada. NUNCA quebre o triângulo sem dispensar primeiro.</p>
</div>

<!-- SEÇÃO III: PORTAIS DIMENSIONAIS -->
<h2 style="font-family: 'Cinzel Decorative', serif; color: #8b0000; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">🌀 SEÇÃO III: PORTAIS DIMENSIONAIS 🌀</h2>

<!-- PORTAL 1 -->
<div class="portal" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">1. ABERTURA DO PORTAL PARA O ABISMO PRIMORDIAL</h3>
<p><strong style="color: #8b0000;">Função:</strong> Abertura de passagem direta para as dimensões abissais</p>
<p><strong style="color: #8b0000;">Perigo:</strong> CATASTRÓFICO - Pode permitir invasão de entidades hostis em massa</p>
<p><strong style="color: #8b0000;">Duração:</strong> Portal permanece aberto até ser fechado ritualmente</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Construção do Portal:</h4>
<ul style="margin-left: 2rem;">
<li>Círculo de 3 metros com símbolos abissais gravados</li>
<li>77 gotas de sangue humano derramadas em padrão específico</li>
<li>Cristais de obsidiana nos pontos cardeais</li>
<li>Incenso de plantas venenosas (beladona, mandrágora)</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Abertura Ritual:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Invocação dos Guardiões Abissais:</strong> Chame as quatro bestas primordiais</li>
<li><strong>Oferenda de Abertura:</strong> Sangue, essência vital e anos de vida</li>
<li><strong>Palavras de Poder:</strong> "ZAZAS ZAZAS NASATANADA ZAZAS! Abram-se os portões! Rasgue-se o véu! Que o Abismo toque a Terra!"</li>
<li><strong>Visualização:</strong> Veja o espaço se distorcendo e escurecendo</li>
<li><strong>Confirmação:</strong> Portal aberto quando temperatura cair drasticamente e sombras se moverem</li>
</ol>

<h4 style="color: #8b0000; margin-top: 2rem;">FECHAMENTO EMERGENCIAL:</h4>
<p style="color: #ff0000; font-weight: bold;">"PELO PODER QUE ABRIU, EU FECHO! Que o véu se restaure! Que o portal se sele! ASSIM EU ORDENO!"</p>

<p style="color: #ff0000; margin-top: 2rem; font-weight: bold;">⚠️ SEMPRE tenha ritual de fechamento preparado. Portal aberto pode atrair entidades não convocadas.</p>
</div>

<!-- SEÇÃO IV: TRANSMUTAÇÃO SUPREMA -->
<h2 style="font-family: 'Cinzel Decorative', serif; color: #8b0000; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">🧬 SEÇÃO IV: TRANSMUTAÇÃO SUPREMA 🧬</h2>

<!-- TRANSMUTAÇÃO 1 -->
<div class="transmutacao" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">1. TRANSMUTAÇÃO CORPORAL COMPLETA</h3>
<p><strong style="color: #8b0000;">Objetivo:</strong> Transformação do corpo físico através de alquimia sanguínea</p>
<p><strong style="color: #8b0000;">Resultado:</strong> Força sobre-humana, longevidade extrema, resistência sobrenatural</p>
<p><strong style="color: #8b0000;">Duração do Processo:</strong> 49 dias de trabalho alquímico</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Preparação Alquímica:</h4>
<ul style="margin-left: 2rem;">
<li>Destilação de 49 tipos diferentes de sangue animal</li>
<li>Extração da quinta-essência através de laboratório alquímico</li>
<li>Mistura com mercúrio filosófico e enxofre vermelho</li>
<li>Consagração lunar durante 7 ciclos completos</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Processo de Transmutação:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Purificação Extrema:</strong> 7 dias bebendo apenas elixir preparado</li>
<li><strong>Oferenda Suprema:</strong> 333 gotas de seu sangue misturadas ao elixir</li>
<li><strong>Ingestão Ritual:</strong> Beba o elixir completo em ritual de 12 horas</li>
<li><strong>Transformação:</strong> Aguarde mudanças celulares por 49 dias</li>
<li><strong>Consolidação:</strong> Ritual final para fixar as mudanças permanentemente</li>
</ol>

<p style="color: #ff0000; margin-top: 2rem; font-weight: bold;">⚠️ Processo irreversível. Pode resultar em morte se o corpo rejeitar a transmutação.</p>
</div>

<!-- SEÇÃO V: MANIPULAÇÃO TEMPORAL -->
<h2 style="font-family: 'Cinzel Decorative', serif; color: #8b0000; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">⏰ SEÇÃO V: MANIPULAÇÃO TEMPORAL ⏰</h2>

<!-- TEMPORAL 1 -->
<div class="temporal" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">1. DOBRA TEMPORAL LOCALIZED</h3>
<p><strong style="color: #8b0000;">Função:</strong> Criação de bolsão temporal onde o tempo flui diferentemente</p>
<p><strong style="color: #8b0000;">Aplicação:</strong> 1 hora externa = 24 horas internas ou vice-versa</p>
<p><strong style="color: #8b0000;">Duração:</strong> Até 7 dias terrestres</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Execução Temporal:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Ancoragem Sanguínea:</strong> 144 gotas dispostas em espiral temporal</li>
<li><strong>Invocação Cronos:</strong> "CHRONOS AETERNUS, dobra o fluir do tempo!"</li>
<li><strong>Visualização:</strong> Veja o tempo se distorcendo ao seu redor</li>
<li><strong>Ativação:</strong> Entre no centro da espiral para ativar o efeito</li>
<li><strong>Controle:</strong> Mantenha foco para sustentar a distorção</li>
</ol>
</div>

<!-- SEÇÃO VI: RESSURREIÇÃO E IMORTALIDADE -->
<h2 style="font-family: 'Cinzel Decorative', serif; color: #8b0000; text-align: center; margin: 4rem 0 2rem 0; font-size: 2.5rem;">♻️ SEÇÃO VI: RESSURREIÇÃO E IMORTALIDADE ♻️</h2>

<!-- RESSURREIÇÃO 1 -->
<div class="ressurreicao" style="margin: 3rem 0; padding: 2.5rem; border: 3px solid #8b0000; background: linear-gradient(135deg, rgba(26, 10, 10, 0.1), rgba(139, 0, 0, 0.05)); border-radius: 15px;">
<h3 style="font-family: 'Cinzel', serif; color: #1a0a0a; margin-bottom: 1rem; font-size: 1.5rem;">1. RITUAL SUPREMO DE RESSURREIÇÃO</h3>
<p><strong style="color: #8b0000;">Objetivo:</strong> Retorno de alma ao corpo físico após a morte</p>
<p><strong style="color: #8b0000;">Limite Temporal:</strong> Até 3 dias após a morte</p>
<p><strong style="color: #8b0000;">Taxa de Sucesso:</strong> 30% mesmo nas melhores condições</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Preparação Suprema:</h4>
<ul style="margin-left: 2rem;">
<li>Corpo preservado com sais alquímicos especiais</li>
<li>Sangue de 7 pessoas vivas voluntárias (familiares de preferência)</li>
<li>Alma capturada em cristal durante momento da morte</li>
<li>Altar consagrado por 49 dias antes do ritual</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Execução da Ressurreição:</h4>
<ol style="margin-left: 2rem;">
<li><strong>Preparação do Corpo:</strong> Ungir com óleos consagrados e sangue</li>
<li><strong>Liberação da Alma:</strong> Quebrar o cristal sobre o coração do morto</li>
<li><strong>Invocação Máxima:</strong> "Pela força do sangue dos vivos, pela vontade dos deuses antigos, EU ORDENO: ALMA, RETORNA! MORTE, RECUA! VIDA, MANIFESTA-TE!"</li>
<li><strong>Transfusão Vital:</strong> Derramar todo o sangue coletado sobre o corpo</li>
<li><strong>Comando Final:</strong> "DESPERTA! RESPIRA! VIVE NOVAMENTE!"</li>
<li><strong>Monitoramento:</strong> Aguardar sinais de retorno por até 12 horas</li>
</ol>

<p style="color: #ff0000; margin-top: 2rem; font-weight: bold;">⚠️ Ressurreição mal-sucedida pode criar zumbi ou lich. Prepare-se para destruir se necessário.</p>
</div>

<!-- CONCLUSÃO SUPREMA -->
<div class="conclusao-suprema" style="margin: 4rem 0; padding: 3rem; background: linear-gradient(135deg, #000000, #1a0a0a, #8b0000); color: #ff6b6b; border: 5px double #8b0000; border-radius: 20px; text-align: center; box-shadow: 0 0 50px rgba(139, 0, 0, 0.8);">
<h2 style="font-family: 'Cinzel Decorative', serif; color: #ff0000; margin-bottom: 2rem; font-size: 2.5rem;">🏛️ O SELO SUPREMO DO TEMPLO DO ABISMO 🏛️</h2>
<p style="margin-bottom: 1.5rem; font-size: 1.2rem;">Aquele que dominar estas artes supremas transcenderá os limites da condição humana.</p>
<p style="margin-bottom: 1.5rem;">O sangue derramado abre os portões. O conhecimento aplicado transforma a realidade. A vontade focada comanda as forças primordiais.</p>
<p style="margin-bottom: 1.5rem;"><strong style="color: #ff0000;">Mas lembra-te sempre: com grande poder vem responsabilidade cósmica.</strong></p>
<p style="margin-bottom: 1.5rem;">Use estes conhecimentos apenas quando necessário. O universo cobra um preço por cada lei natural quebrada.</p>
<p style="color: #ff0000; font-weight: bold; font-size: 1.3rem;">O Templo do Abismo reconhece aqueles que ousam caminhar além dos véus da realidade.</p>
<p style="font-style: italic; margin-top: 3rem; color: #ffaaaa;">— Selado com sangue dos Hierofantes Supremos —</p>
<p style="font-style: italic; color: #ffaaaa;">— Que apenas os dignos ousem quebrar estes selos —</p>
</div>

</div>
    `;

    // Criar o segundo grimório no Supabase
    const { data: grimoire, error: grimoireError } = await supabase
      .from('grimoires')
      .insert([
        {
          title: '🌑 Liber Umbra Supremus – O Livro Supremo das Sombras Primordiais',
          description: 'O grimório mais perigoso jamais compilado pelo Templo do Abismo. Contém invocações diretas de entidades primordiais, evocações de materialização física de demônios, abertura de portais dimensionais, transmutação corporal suprema, manipulação do tempo e ressurreição dos mortos. Conhecimentos vedados que transcendem os limites da magia tradicional. APENAS PARA MESTRES SUPREMOS com décadas de experiência. O preço do poder supremo é cobrado em sangue e essência vital.',
          content: grimoireContent,
          section_id: 5, // Templo do Abismo
          price: 777.77, // Preço supremo
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (grimoireError) {
      console.error('❌ Erro ao criar segundo grimório:', grimoireError);
      return;
    }

    console.log('✅ Segundo Grimório Ultra Secreto criado com sucesso!');
    console.log(`📖 ID: ${grimoire.id}`);
    console.log(`🌑 Título: ${grimoire.title}`);
    console.log(`💰 Preço: R$ ${grimoire.price}`);
    console.log('🔥 Os conhecimentos supremos foram revelados...');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

criarSegundoGrimoireSecreto();