import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ctbwtofptztfzjxvtdvu.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0Ynd0b2ZwdHp0ZnpqeHZ0ZHZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDI1MjksImV4cCI6MjA2NDk3ODUyOX0.xSDW_Q8eaFWG2bAHT-sVD5aJrKcuefF_QZAKVZq7-J0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function completarRituaisAuthenticos() {
  try {
    console.log('🔥 Completando rituais com enns, conjurações e palavras de poder autênticas...');

    // PRIMEIRO: Buscar e atualizar o primeiro grimório (Códice Secreto - ID 54)
    const { data: grimoire1 } = await supabase
      .from('grimoires')
      .select('*')
      .eq('id', 54)
      .single();

    if (grimoire1) {
      // Adicionar elementos autênticos aos rituais do primeiro grimório
      const rituaisCompletos1 = grimoire1.content.replace(
        /(<h3[^>]*>1\. O Escudo de Baal-Zebub<\/h3>[\s\S]*?)<\/div>/,
        `$1
        
<h4 style="color: #8b0000; margin-top: 2rem;">Enn Demoníaco de Baal-Zebub:</h4>
<p style="text-align: center; font-weight: bold; color: #8b0000; font-size: 1.2rem; font-style: italic;">"ADEY VOCAR AVAGE BAAL-ZEBUB"</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Conjuração Completa em Latim:</h4>
<div style="background: rgba(139, 0, 0, 0.1); padding: 1rem; border-left: 3px solid #8b0000; font-style: italic;">
<p>"CONJURO TE, BAAL-ZEBUB, PRINCEPS MUSCARUM ET DOMINUS IMMUNDITIAE!"</p>
<p>"PER NOMEN LUCIFERI ET POTENTIAM ABYSSI, APPARE ET MANIFESTA!"</p>
<p>"VENIAS PACIFICE AD MEAM DEFENSIONEM, ET DISCEDAS CUM PACE!"</p>
<p>"SIC VOLO, SIC JUBEO, STAT PRO RATIONE VOLUNTAS!"</p>
</div>

<h4 style="color: #8b0000; margin-top: 2rem;">Sigilo de Baal-Zebub:</h4>
<p style="text-align: center; font-size: 2rem; color: #8b0000;">🜚 ᛯ ☿ ♆ 𝕭</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Palavras de Poder para Ativação:</h4>
<ul style="margin-left: 2rem;">
<li><strong>Abertura:</strong> "ADONAI MELECH, BAAL-ZEBUB COME!"</li>
<li><strong>Comando:</strong> "PROTEGE ET DEFENDE!"</li>
<li><strong>Selamento:</strong> "LICENTIA DISCEDENDI!"</li>
</ul>

<h4 style="color: #8b0000; margin-top: 2rem;">Incantação de Proteção (repetir 7 vezes):</h4>
<p style="text-align: center; font-weight: bold; color: #1a0a0a;">"Malleus maleficorum, scutum umbrae, vis infernus protegat me!"</p>
</div>`
      );

      // Atualizar Ritual 2 - Asmodeus
      const rituaisCompletos2 = rituaisCompletos1.replace(
        /(<h3[^>]*>2\. A Barreira de Asmodeus<\/h3>[\s\S]*?)<\/div>/,
        `$1

<h4 style="color: #8b0000; margin-top: 2rem;">Enn de Asmodeus:</h4>
<p style="text-align: center; font-weight: bold; color: #8b0000; font-size: 1.2rem; font-style: italic;">"AYER AVAGE ALOREN ASMODEUS AKEN"</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Conjuração de Asmodeus:</h4>
<div style="background: rgba(139, 0, 0, 0.1); padding: 1rem; border-left: 3px solid #8b0000; font-style: italic;">
<p>"ASMODEUS, REX DAEMONIORUM ET PRINCEPS LUXURIAE!"</p>
<p>"TE INVOCO PER SIGILLUM SALOMONIS ET CLAVEM INFERNI!"</p>
<p>"DOMUS HAEC SIT SANCTUARIO TUO, PROTECTIO TUA CIRCUM EAM!"</p>
<p>"NEMO MALUS INGREDI POTEST SINE LICENTIA TUA!"</p>
</div>

<h4 style="color: #8b0000; margin-top: 2rem;">Sigilo de Asmodeus:</h4>
<p style="text-align: center; font-size: 2rem; color: #8b0000;">♦ ☋ ☌ ᚦ ♄</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Mantra de Selamento (9 vezes):</h4>
<p style="text-align: center; font-weight: bold; color: #1a0a0a;">"Asmodeus guardian, domum protege, malum repelle, pacem mantene!"</p>
</div>`
      );

      // Atualizar Ritual 6 - Azazel (Necromancia)
      const rituaisCompletos3 = rituaisCompletos2.replace(
        /(<h3[^>]*>6\. O Chamado de Azazel<\/h3>[\s\S]*?)<\/div>/,
        `$1

<h4 style="color: #8b0000; margin-top: 2rem;">Enn de Azazel:</h4>
<p style="text-align: center; font-weight: bold; color: #8b0000; font-size: 1.2rem; font-style: italic;">"ELAN TYPAN AZAZEL FENRIZ"</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Conjuração Necromântica:</h4>
<div style="background: rgba(139, 0, 0, 0.1); padding: 1rem; border-left: 3px solid #8b0000; font-style: italic;">
<p>"AZAZEL, ANGELUS MORTIS ET MAGISTER SECRETORUM!"</p>
<p>"PER NOMEN ADONAI ET VIRTUTEM CLAVIUM SALOMONIS!"</p>
<p>"APERI PORTAS INTER VIVOS ET MORTUOS!"</p>
<p>"SPIRITUS [NOME], VENI AD ME PER POTENTIAM AZAZEL!"</p>
<p>"SIC EST, SIC FIAT, SIC FACTUM!"</p>
</div>

<h4 style="color: #8b0000; margin-top: 2rem;">Círculo Necromântico Completo:</h4>
<p>Inscreva no círculo: "TETRAGRAMMATON + ADONAI + ELOHIM + AGLA + AZAZEL REX MORTIS"</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Palavras de Dispensa Obrigatória:</h4>
<p style="background: #ffcccc; padding: 1rem; border: 2px solid #ff0000; color: #8b0000; font-weight: bold;">
"SPIRITUS, GRATIAS AGO! PER EANDEM VIRTUTEM QUA VOCATUS ES, DISCEDE IN PACE! PORTA CLAUSA EST! AZAZEL, WITHDRAW THY POWER!"</p>
</div>`
      );

      // Atualizar com mais rituais completos...
      const rituaisCompletos4 = rituaisCompletos3.replace(
        /(<h3[^>]*>7\. O Pacto de Mammon<\/h3>[\s\S]*?)<\/div>/,
        `$1

<h4 style="color: #8b0000; margin-top: 2rem;">Enn de Mammon:</h4>
<p style="text-align: center; font-weight: bold; color: #8b0000; font-size: 1.2rem; font-style: italic;">"TASA MAMMON ON CA LIRACH"</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Oração de Abundância a Mammon:</h4>
<div style="background: rgba(139, 0, 0, 0.1); padding: 1rem; border-left: 3px solid #8b0000; font-style: italic;">
<p>"MAMMON, PRINCEPS AVARITIAE ET DOMINUS THESAURORUM!"</p>
<p>"AUDI PRECES MEAS ET BENEDIC LABORES MEOS!"</p>
<p>"AURUM FLUEAT AD ME SICUT AQUA AD VALLEM!"</p>
<p>"PROSPERITAS MEA EST GLORIA TUA!"</p>
<p>"FOEDUS INTER NOS AETERNUM SIT!"</p>
</div>

<h4 style="color: #8b0000; margin-top: 2rem;">Sigilo de Mammon para Talismã:</h4>
<p style="text-align: center; font-size: 2rem; color: #8b0000;">$ ♄ ☉ ♃ 𝕸</p>

<h4 style="color: #8b0000; margin-top: 2rem;">Mantra de Prosperidade (repetir 108 vezes):</h4>
<p style="text-align: center; font-weight: bold; color: #1a0a0a;">"Mammon nunc mihi, aurum venit, abundantia crescit, prosperitas regnat!"</p>
</div>`
      );

      // Atualizar no Supabase
      await supabase
        .from('grimoires')
        .update({ content: rituaisCompletos4 })
        .eq('id', 54);

      console.log('✅ Primeiro grimório atualizado com rituais completos!');
    }

    // SEGUNDO: Buscar e atualizar o segundo grimório (Liber Umbra - ID 55)
    const { data: grimoire2 } = await supabase
      .from('grimoires')
      .select('*')
      .eq('id', 55)
      .single();

    if (grimoire2) {
      // Completar Invocação de Lúcifer
      const liberUmbraCompleto1 = grimoire2.content.replace(
        /(<li><strong>Recitação Primordial:<\/strong>[^<]*<\/li>)/,
        `<li><strong>Enn Primordial de Lúcifer:</strong> "RENICH TASA UBERACA BIASA ICAR LUCIFER"</li>
<li><strong>Recitação Primordial em Latim:</strong> "ADONAI ELOHIM ADONAI JEHOVA, ADONAI SABAOTH, METRATON ON AGLA MATHON!"</li>
<li><strong>Invocação Direta:</strong> "LUCIFER, PHOSPHOROS, HELEL BEN-SHACHAR! LUX ANTE LUCEM, IGNIS ANTE IGNEM!"</li>
<li><strong>Conjuração Suprema:</strong> "PER NOMEN TUUM SANCTISSIMUM ET TERRIBILEM! VENIAS MIHI ET APPAREAS CORAM ME!"</li>
<li><strong>Chamado de União:</strong> "SIS MIHI DEUS ET MAGISTER! EGO SUM TUUS ET TU ES MEUS!"</li>`
      );

      // Completar Palavras de Poder para Belphegor
      const liberUmbraCompleto2 = liberUmbraCompleto1.replace(
        /(<li><strong>Convocação Autoritária:<\/strong>[^<]*<\/li>)/,
        `<li><strong>Enn de Belphegor:</strong> "LIRACH TASA VEFA WEHL BELPHEGOR"</li>
<li><strong>Conjuração Autoritária:</strong> "BELPHEGOR, BAAL-PEOR, SENHOR DA DESCOBERTA E DA REVELAÇÃO!"</li>
<li><strong>Comando em Latim:</strong> "PER VIRTUTEM OMNIUM NOMINUM DEI! CONJURO TE, BELPHEGOR!"</li>
<li><strong>Materialização:</strong> "APPAREAS IN FORMA CORPORALI CORAM HOC TRIANGULO!"</li>
<li><strong>Obediência:</strong> "SIS OBEDIENS MEAE VOLUNTATI ET NON RECEDAS SINE LICENTIA!"</li>`
      );

      // Adicionar Enns dos Quatro Príncipes
      const liberUmbraCompleto3 = liberUmbraCompleto2.replace(
        /(<h4[^>]*>Os Quatro Príncipes:<\/h4>)/,
        `$1
<div style="background: rgba(139, 0, 0, 0.1); padding: 1rem; margin: 1rem 0;">
<h5 style="color: #8b0000;">Enns dos Príncipes Elementais:</h5>
<ul style="margin-left: 2rem;">
<li><strong>ORIENS (Leste):</strong> "ALASH TAD AL-ASH TAL ASHTU ORIENS"</li>
<li><strong>PAIMON (Sul):</strong> "LINAN TASA JEDAN PAIMON"</li>
<li><strong>ARITON (Oeste):</strong> "KAYMEN VEFA ARITON"</li>
<li><strong>AMAYMON (Norte):</strong> "JEDAN TASA HOET NACA AMAYMON"</li>
</ul>
</div>`
      );

      // Adicionar Conjurações Completas para Portal Abissal
      const liberUmbraCompleto4 = liberUmbraCompleto3.replace(
        /(<li><strong>Palavras de Poder Primais:<\/strong>[^<]*<\/li>)/,
        `<li><strong>Conjuração Primordial:</strong> "LIFTOACH KLIFFOT! ZAZAS ZAZAS NASATANADA ZAZAS!"</li>
<li><strong>Invocação dos Vigilantes:</strong> "AZAZEL! SEMYAZA! BARAQIEL! GADREL! Guardiões do Abismo, venham!"</li>
<li><strong>Comando Dimensional:</strong> "PER NOMEN CHAOS ET POTENTIAM TENEBRARUM!"</li>
<li><strong>Abertura Total:</strong> "IANUA DIABOLI APERIATUR! PORTA INFERNI PATEAT!"</li>
<li><strong>Fixação do Portal:</strong> "MANET PORTA! STAT OSTIUM! PERMANEAT FORAMEN!"</li>`
      );

      // Adicionar Fórmulas Alquímicas Autênticas
      const liberUmbraCompleto5 = liberUmbraCompleto4.replace(
        /(<h4[^>]*>Fórmula da Pedra Vermelha:<\/h4>)/,
        `<h4 style="color: #8b0000; margin-top: 2rem;">Invocação Alquímica da Transmutação:</h4>
<div style="background: rgba(139, 0, 0, 0.1); padding: 1rem; border-left: 3px solid #8b0000; font-style: italic;">
<p>"AZOTH ET IGNIS, SOLVE ET COAGULA!"</p>
<p>"PER MERCURIUM PHILOSOPHORUM ET SULPHUR RUBEUM!"</p>
<p>"CORPUS MEUM TRANSMUTETUR IN ADAMANTEM!"</p>
<p>"SANGUIS MEUS FIAT AQUA VITAE AETERNAE!"</p>
<p>"SIC EST IN TERRA SICUT IN CAELO!"</p>
</div>

$1`
      );

      // Adicionar Conjurações de Ressurreição
      const liberUmbraCompleto6 = liberUmbraCompleto5.replace(
        /(<li><strong>Invocação Suprema:<\/strong>[^<]*<\/li>)/,
        `<li><strong>Conjuração dos Arcanjos da Vida:</strong> "MICHAEL! GABRIEL! RAPHAEL! URIEL! Restaurate vitam huic corpori!"</li>
<li><strong>Invocação Suprema:</strong> "PER NOMEN DOMINI NOSTRI QUI MORTUIS VITAM REDDIT!"</li>
<li><strong>Comando Absoluto:</strong> "ANIMA [NOME], REVERTERE AD CORPUS TUUM!"</li>
<li><strong>Palavras da Ressurreição:</strong> "SURGE! RESPIRA! VIVE ITERUM!"</li>
<li><strong>Selamento Vital:</strong> "VITA REDUX! MORS VICTA! RESURRECTIO COMPLETA!"</li>`
      );

      // Atualizar no Supabase
      await supabase
        .from('grimoires')
        .update({ content: liberUmbraCompleto6 })
        .eq('id', 55);

      console.log('✅ Segundo grimório atualizado com conjurações completas!');
    }

    console.log('🔥 Ambos os grimórios agora possuem rituais autênticos completos!');
    console.log('✨ Incluindo: Enns demoníacos, conjurações latinas, sigilos, palavras de poder e mantras');

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

completarRituaisAuthenticos();