-- =====================================================
-- TEMPLO DO ABISMO - SCHEMA COMPLETO
-- Execute este script sempre que criar um novo projeto
-- =====================================================

-- Limpar tabelas existentes (opcional - descomente se necessário)
-- DROP TABLE IF EXISTS user_progress CASCADE;
-- DROP TABLE IF EXISTS grimoire_purchases CASCADE;
-- DROP TABLE IF EXISTS chapters CASCADE;
-- DROP TABLE IF EXISTS grimoires CASCADE;
-- DROP TABLE IF EXISTS library_sections CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS ai_settings CASCADE;
-- DROP TABLE IF EXISTS system_settings CASCADE;
-- DROP TABLE IF EXISTS user_sessions CASCADE;
-- DROP TABLE IF EXISTS payment_logs CASCADE;
-- DROP TABLE IF EXISTS content_analytics CASCADE;
-- DROP TABLE IF EXISTS user_notifications CASCADE;
-- DROP TABLE IF EXISTS content_reports CASCADE;

-- =====================================================
-- 1. TABELAS PRINCIPAIS
-- =====================================================

-- Usuários do sistema
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  subscription_status TEXT DEFAULT 'free', -- free, premium, vip
  subscription_expires_at TIMESTAMPTZ,
  profile_image_url TEXT,
  bio TEXT,
  preferred_language TEXT DEFAULT 'pt-BR',
  theme_preference TEXT DEFAULT 'dark', -- dark, light, auto
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seções da biblioteca
CREATE TABLE library_sections (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  color_scheme TEXT DEFAULT '#D97706', -- cor primária da seção
  access_level TEXT DEFAULT 'public', -- public, premium, vip, admin
  min_user_level INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grimórios
CREATE TABLE grimoires (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  section_id BIGINT REFERENCES library_sections(id) ON DELETE CASCADE,
  author_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  price DECIMAL(10,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  unlock_order INTEGER DEFAULT 1,
  cover_image_url TEXT,
  excerpt TEXT, -- resumo para preview
  tags TEXT[], -- array de tags
  difficulty_level TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced, master
  estimated_read_time INTEGER DEFAULT 30, -- minutos
  word_count INTEGER DEFAULT 0,
  language TEXT DEFAULT 'pt-BR',
  content_type TEXT DEFAULT 'grimoire', -- grimoire, ritual, meditation, philosophy
  access_level TEXT DEFAULT 'public',
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capítulos (para grimórios divididos em capítulos)
CREATE TABLE chapters (
  id BIGSERIAL PRIMARY KEY,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  chapter_order INTEGER DEFAULT 1,
  is_published BOOLEAN DEFAULT true,
  preview_content TEXT, -- primeiros parágrafos para preview
  estimated_read_time INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. SISTEMA DE PROGRESSO E INTERAÇÃO
-- =====================================================

-- Progresso de leitura dos usuários
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  chapter_id BIGINT REFERENCES chapters(id) ON DELETE CASCADE, -- opcional
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  current_page INTEGER DEFAULT 1,
  total_pages INTEGER DEFAULT 1,
  reading_time_seconds INTEGER DEFAULT 0, -- tempo total de leitura
  last_position TEXT, -- posição específica no texto
  notes TEXT, -- anotações pessoais
  bookmarks TEXT[], -- array de posições marcadas
  is_completed BOOLEAN DEFAULT false,
  completion_date TIMESTAMPTZ,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- Avaliações e comentários
CREATE TABLE grimoire_reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_public BOOLEAN DEFAULT true,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- =====================================================
-- 3. SISTEMA DE PAGAMENTOS E COMPRAS
-- =====================================================

-- Compras de grimórios
CREATE TABLE grimoire_purchases (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE NOT NULL,
  payment_intent_id TEXT UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT DEFAULT 'pending' NOT NULL, -- pending, completed, failed, refunded
  payment_method TEXT DEFAULT 'stripe',
  payment_details JSONB, -- detalhes específicos do pagamento
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ, -- para conteúdo com acesso temporário
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grimoire_id)
);

-- Logs de pagamentos para auditoria
CREATE TABLE payment_logs (
  id BIGSERIAL PRIMARY KEY,
  purchase_id BIGINT REFERENCES grimoire_purchases(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- created, processing, completed, failed, refunded
  provider_response JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assinaturas premium
CREATE TABLE user_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL, -- premium, vip, lifetime
  stripe_subscription_id TEXT UNIQUE,
  status TEXT DEFAULT 'active', -- active, canceled, past_due, incomplete
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. CONFIGURAÇÕES E ADMINISTRAÇÃO
-- =====================================================

-- Configurações da IA
CREATE TABLE ai_settings (
  id BIGSERIAL PRIMARY KEY,
  setting_name TEXT UNIQUE NOT NULL, -- global, section_specific, user_specific
  personality TEXT DEFAULT 'luciferian',
  complexity TEXT DEFAULT 'beginner',
  length TEXT DEFAULT 'medium',
  style TEXT DEFAULT 'mixed',
  guidelines TEXT DEFAULT '',
  default_section_id BIGINT REFERENCES library_sections(id) ON DELETE SET NULL,
  auto_price BOOLEAN DEFAULT false,
  price_range_min DECIMAL(10,2) DEFAULT 9.99,
  price_range_max DECIMAL(10,2) DEFAULT 49.99,
  model_name TEXT DEFAULT 'gpt-4',
  max_tokens INTEGER DEFAULT 4000,
  temperature DECIMAL(3,2) DEFAULT 0.7,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configurações do sistema
CREATE TABLE system_settings (
  id BIGSERIAL PRIMARY KEY,
  setting_category TEXT NOT NULL, -- site, content, security, payments, etc
  setting_key TEXT NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text', -- text, boolean, number, json
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- se pode ser acessado pelo frontend
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(setting_category, setting_key)
);

-- =====================================================
-- 5. ANALYTICS E MONITORAMENTO
-- =====================================================

-- Analytics de conteúdo
CREATE TABLE content_analytics (
  id BIGSERIAL PRIMARY KEY,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- view, download, purchase, completion, rating
  event_data JSONB,
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessões de usuário
CREATE TABLE user_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. SISTEMA DE NOTIFICAÇÕES E COMUNICAÇÃO
-- =====================================================

-- Notificações para usuários
CREATE TABLE user_notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info, success, warning, error
  category TEXT DEFAULT 'general', -- general, purchase, progress, system
  is_read BOOLEAN DEFAULT false,
  action_url TEXT, -- link para ação relacionada
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Relatórios de conteúdo
CREATE TABLE content_reports (
  id BIGSERIAL PRIMARY KEY,
  grimoire_id BIGINT REFERENCES grimoires(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL, -- inappropriate, error, copyright, spam
  description TEXT,
  status TEXT DEFAULT 'pending', -- pending, reviewed, resolved, dismissed
  admin_notes TEXT,
  resolved_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_users_is_admin ON users(is_admin);

-- Índices para library_sections
CREATE INDEX idx_library_sections_sort_order ON library_sections(sort_order);
CREATE INDEX idx_library_sections_is_active ON library_sections(is_active);

-- Índices para grimoires
CREATE INDEX idx_grimoires_section_id ON grimoires(section_id);
CREATE INDEX idx_grimoires_is_published ON grimoires(is_published);
CREATE INDEX idx_grimoires_is_featured ON grimoires(is_featured);
CREATE INDEX idx_grimoires_price ON grimoires(price);
CREATE INDEX idx_grimoires_difficulty_level ON grimoires(difficulty_level);
CREATE INDEX idx_grimoires_content_type ON grimoires(content_type);
CREATE INDEX idx_grimoires_created_at ON grimoires(created_at DESC);

-- Índices para chapters
CREATE INDEX idx_chapters_grimoire_id ON chapters(grimoire_id);
CREATE INDEX idx_chapters_order ON chapters(chapter_order);

-- Índices para user_progress
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_grimoire_id ON user_progress(grimoire_id);
CREATE INDEX idx_user_progress_is_completed ON user_progress(is_completed);

-- Índices para purchases
CREATE INDEX idx_grimoire_purchases_user_id ON grimoire_purchases(user_id);
CREATE INDEX idx_grimoire_purchases_grimoire_id ON grimoire_purchases(grimoire_id);
CREATE INDEX idx_grimoire_purchases_status ON grimoire_purchases(status);

-- Índices para analytics
CREATE INDEX idx_content_analytics_grimoire_id ON content_analytics(grimoire_id);
CREATE INDEX idx_content_analytics_event_type ON content_analytics(event_type);
CREATE INDEX idx_content_analytics_created_at ON content_analytics(created_at DESC);

-- =====================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE grimoires ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE grimoire_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE grimoire_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

-- Políticas permissivas para desenvolvimento (ajustar conforme necessário)
CREATE POLICY "Acesso público para leitura" ON users FOR SELECT USING (true);
CREATE POLICY "Usuários podem se registrar" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Usuários podem atualizar próprio perfil" ON users FOR UPDATE USING (true);

CREATE POLICY "Seções visíveis para todos" ON library_sections FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar seções" ON library_sections FOR ALL USING (true);

CREATE POLICY "Grimórios publicados visíveis" ON grimoires FOR SELECT USING (is_published = true);
CREATE POLICY "Admins podem gerenciar grimórios" ON grimoires FOR ALL USING (true);

CREATE POLICY "Capítulos visíveis para todos" ON chapters FOR SELECT USING (true);
CREATE POLICY "Admins podem gerenciar capítulos" ON chapters FOR ALL USING (true);

CREATE POLICY "Usuários veem próprio progresso" ON user_progress FOR ALL USING (true);
CREATE POLICY "Reviews públicas visíveis" ON grimoire_reviews FOR SELECT USING (is_public = true);
CREATE POLICY "Usuários podem avaliar" ON grimoire_reviews FOR ALL USING (true);

CREATE POLICY "Usuários veem próprias compras" ON grimoire_purchases FOR ALL USING (true);
CREATE POLICY "Logs de pagamento acessíveis" ON payment_logs FOR ALL USING (true);
CREATE POLICY "Usuários veem próprias assinaturas" ON user_subscriptions FOR ALL USING (true);

CREATE POLICY "Configurações acessíveis" ON ai_settings FOR ALL USING (true);
CREATE POLICY "Configurações sistema acessíveis" ON system_settings FOR ALL USING (true);

CREATE POLICY "Analytics acessíveis" ON content_analytics FOR ALL USING (true);
CREATE POLICY "Sessões acessíveis" ON user_sessions FOR ALL USING (true);
CREATE POLICY "Notificações do usuário" ON user_notifications FOR ALL USING (true);
CREATE POLICY "Relatórios acessíveis" ON content_reports FOR ALL USING (true);

-- =====================================================
-- 9. DADOS INICIAIS PADRÃO
-- =====================================================

-- Usuário administrador padrão
INSERT INTO users (username, email, password, is_admin) 
VALUES ('admin', 'admin@templodoabismo.com.br', '$2b$10$rQ8K5yUhMhQJhCcDj8zY8OqXJ5kM7Nv4PzB8L9wE2fH6uK1tR3gA5q', true)
ON CONFLICT (username) DO NOTHING;

-- Seções da biblioteca padrão
INSERT INTO library_sections (name, description, sort_order, color_scheme) VALUES
  ('Atrium Ignis', 'Textos preparatórios para iniciantes no caminho luciferiano', 1, '#8b0000'),
  ('Porta Umbrae', 'Conhecimentos intermediários sobre magia e filosofia das sombras', 2, '#6a0dad'),
  ('Arcana Noctis', 'Segredos avançados de magia cerimonial e gnose luciferiana', 3, '#003366'),
  ('Via Tenebris', 'Caminhos superiores de maestria e transcendência', 4, '#111111'),
  ('Templo do Abismo', 'Santuário dos mistérios mais profundos canalizados das divindades primordiais', 5, '#1a0a0a')
ON CONFLICT (name) DO NOTHING;

-- Configurações de IA padrão
INSERT INTO ai_settings (setting_name, personality, complexity, style, guidelines) VALUES
  ('global', 'luciferian', 'beginner', 'mixed', 'Mantenha linguagem acessível mas profunda, evite clichês, foque na filosofia de autodivinização')
ON CONFLICT (setting_name) DO NOTHING;

-- Configurações do sistema padrão
INSERT INTO system_settings (setting_category, setting_key, setting_value, setting_type) VALUES
  ('site', 'name', 'Templo do Abismo', 'text'),
  ('site', 'description', 'Portal de ensinamentos luciferianos', 'text'),
  ('site', 'admin_email', 'admin@templodoabismo.com.br', 'text'),
  ('content', 'enable_user_registration', 'true', 'boolean'),
  ('content', 'enable_paid_content', 'true', 'boolean'),
  ('security', 'enable_content_protection', 'true', 'boolean'),
  ('payments', 'currency', 'BRL', 'text'),
  ('payments', 'enable_stripe', 'true', 'boolean')
ON CONFLICT (setting_category, setting_key) DO NOTHING;

-- =====================================================
-- 10. TRIGGERS E FUNÇÕES (OPCIONAL)
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger em tabelas relevantes
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grimoires_updated_at BEFORE UPDATE ON grimoires 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_library_sections_updated_at BEFORE UPDATE ON library_sections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- CONFIRMAÇÃO DE SUCESSO
-- =====================================================

SELECT 'Templo do Abismo - Schema completo criado com sucesso! 🔥' as status,
       COUNT(*) as total_tables
FROM information_schema.tables 
WHERE table_schema = 'public';