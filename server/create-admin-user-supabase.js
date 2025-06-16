import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

async function createAdminUserSupabase() {
  const supabaseUrl = "https://otyxdolwqhpfpkklefoi.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90eXhkb2x3cWhwZnBra2xlZm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzUyOTksImV4cCI6MjA2NTI1MTI5OX0.lHOgO8tJ9xmMUCcJKhMHFfM6TG7Q3EWo6v5XgwRhFz0";
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log("🔄 Verificando se usuário admin (ID: 999) existe...");

    // Verificar se o usuário já existe
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('id', 999)
      .single();

    if (existingUser) {
      console.log("✅ Usuário admin já existe:", existingUser);
      return existingUser;
    }

    console.log("🆕 Criando usuário admin...");
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Criar usuário admin com ID específico
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: 999,
        username: 'admin',
        email: 'admin@templodoabismo.com.br',
        password_hash: hashedPassword,
        role: 'admin',
        is_active: true
      })
      .select()
      .single();

    if (insertError) {
      console.error("❌ Erro ao criar usuário admin:", insertError);
      
      // Se erro de ID específico, tentar inserir sem ID
      console.log("🔄 Tentando inserir sem ID específico...");
      const { data: autoUser, error: autoError } = await supabase
        .from('users')
        .insert({
          username: 'admin',
          email: 'admin@templodoabismo.com.br',
          password_hash: hashedPassword,
          role: 'admin',
          is_active: true
        })
        .select()
        .single();

      if (autoError) {
        console.error("❌ Erro ao criar usuário com ID auto:", autoError);
        return null;
      }
      
      console.log("✅ Usuário admin criado com ID automático:", autoUser);
      return autoUser;
    }
    
    console.log("✅ Usuário admin criado com sucesso:", newUser);
    return newUser;

  } catch (error) {
    console.error("❌ Erro geral:", error);
    return null;
  }
}

createAdminUserSupabase();