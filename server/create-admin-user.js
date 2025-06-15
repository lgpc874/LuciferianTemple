import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  try {
    console.log('Creating admin user "magurk"...');

    // Hash da senha admin123
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    // Inserir usuário administrativo
    const { data, error } = await supabase
      .from('users')
      .insert({
        username: 'magurk',
        email: 'admin@templodoabismo.com.br',
        password: hashedPassword,
        is_admin: true,
        role: 'admin'
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Duplicate key error
        console.log('✓ Admin user "magurk" already exists');
        
        // Atualizar senha se o usuário já existe
        const { error: updateError } = await supabase
          .from('users')
          .update({
            password: hashedPassword,
            is_admin: true,
            role: 'admin'
          })
          .eq('email', 'admin@templodoabismo.com.br');

        if (updateError) {
          console.error('Error updating admin user:', updateError);
        } else {
          console.log('✓ Admin user password updated');
        }
      } else {
        console.error('Error creating admin user:', error);
      }
    } else {
      console.log('✓ Admin user "magurk" created successfully:', {
        id: data.id,
        username: data.username,
        email: data.email,
        isAdmin: data.isAdmin
      });
    }

    console.log('\nAdmin login credentials:');
    console.log('Email: admin@templodoabismo.com.br');
    console.log('Password: admin123');
    console.log('Username: magurk');

  } catch (error) {
    console.error('Error in createAdminUser:', error);
  }
}

createAdminUser();