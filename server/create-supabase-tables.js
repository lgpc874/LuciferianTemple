import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_ANON_KEY are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
  console.log('Creating library tables in Supabase...');

  try {
    // Criar tabela library_sections
    const { error: sectionsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS library_sections (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          display_order INTEGER DEFAULT 0 NOT NULL,
          is_active BOOLEAN DEFAULT true NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (sectionsError) {
      console.error('Error creating library_sections:', sectionsError);
    } else {
      console.log('✓ library_sections table created');
    }

    // Criar tabela grimoires
    const { error: grimoiresError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS grimoires (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          category TEXT NOT NULL,
          difficulty_level INTEGER DEFAULT 1 NOT NULL,
          section_id INTEGER REFERENCES library_sections(id) NOT NULL,
          cover_image_url TEXT,
          price DECIMAL(10,2),
          is_paid BOOLEAN DEFAULT false NOT NULL,
          is_active BOOLEAN DEFAULT true NOT NULL,
          unlock_order INTEGER DEFAULT 0 NOT NULL,
          estimated_reading_time INTEGER DEFAULT 30 NOT NULL,
          tags TEXT[],
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (grimoiresError) {
      console.error('Error creating grimoires:', grimoiresError);
    } else {
      console.log('✓ grimoires table created');
    }

    // Criar tabela chapters
    const { error: chaptersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS chapters (
          id SERIAL PRIMARY KEY,
          grimoire_id INTEGER REFERENCES grimoires(id) NOT NULL,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          chapter_number INTEGER NOT NULL,
          estimated_reading_time INTEGER DEFAULT 10 NOT NULL,
          is_unlocked BOOLEAN DEFAULT false NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (chaptersError) {
      console.error('Error creating chapters:', chaptersError);
    } else {
      console.log('✓ chapters table created');
    }

    // Criar tabela user_progress
    const { error: progressError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_progress (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) NOT NULL,
          grimoire_id INTEGER REFERENCES grimoires(id) NOT NULL,
          chapter_id INTEGER REFERENCES chapters(id),
          progress_percentage DECIMAL(5,2) DEFAULT 0.00,
          current_page INTEGER DEFAULT 1,
          total_reading_time INTEGER DEFAULT 0,
          is_completed BOOLEAN DEFAULT false NOT NULL,
          last_read_at TIMESTAMP DEFAULT NOW(),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    });

    if (progressError) {
      console.error('Error creating user_progress:', progressError);
    } else {
      console.log('✓ user_progress table created');
    }

    // Inserir seções padrão
    const { error: insertError } = await supabase.rpc('exec_sql', {
      sql: `
        INSERT INTO library_sections (name, description, slug, display_order) VALUES
        ('Porta das Sombras', 'Para os que chegaram ao limiar. Os olhos ainda fechados... mas já sentem o fogo.', 'porta-das-sombras', 1),
        ('Vestíbulo da Chama', 'O primeiro despertar. A chama interior começa a arder com conhecimento primordial.', 'vestibulo-da-chama', 2),
        ('Torre dos Selos', 'Ascensão aos mistérios selados. Conhecimentos que poucos ousam desvelar.', 'torre-dos-selos', 3),
        ('Sanctum Profundum', 'O santuário dos arcanos supremos. Apenas para os que transcenderam o véu.', 'sanctum-profundum', 4),
        ('Textos Filosóficos', 'Fundamentos filosóficos e teóricos dos ensinamentos luciferianos.', 'textos-filosoficos', 5),
        ('Meditações Práticas', 'Práticas meditativas e exercícios para desenvolvimento espiritual.', 'meditacoes-praticas', 6)
        ON CONFLICT (slug) DO NOTHING;
      `
    });

    if (insertError) {
      console.error('Error inserting default sections:', insertError);
    } else {
      console.log('✓ Default sections inserted');
    }

    // Criar índices
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_grimoires_section_id ON grimoires(section_id);
        CREATE INDEX IF NOT EXISTS idx_grimoires_is_active ON grimoires(is_active);
        CREATE INDEX IF NOT EXISTS idx_chapters_grimoire_id ON chapters(grimoire_id);
        CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_progress_grimoire_id ON user_progress(grimoire_id);
      `
    });

    if (indexError) {
      console.error('Error creating indexes:', indexError);
    } else {
      console.log('✓ Indexes created');
    }

    console.log('🎉 All library tables created successfully in Supabase!');

  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();