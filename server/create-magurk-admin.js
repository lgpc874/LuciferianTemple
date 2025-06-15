import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createMagurkAdmin() {
  try {
    console.log('Creating admin user "magurk" with email admin@templodoabismo.com.br...');

    // Hash da senha admin123
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    // Tentar inserir o usuário
    const { data, error } = await supabase
      .from('users')
      .insert({
        username: 'magurk',
        email: 'admin@templodoabismo.com.br',
        password: hashedPassword
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Duplicate key error
        console.log('Admin user already exists, updating...');
        
        // Atualizar usuário existente
        const { error: updateError } = await supabase
          .from('users')
          .update({
            username: 'magurk',
            password: hashedPassword
          })
          .eq('email', 'admin@templodoabismo.com.br');

        if (updateError) {
          console.error('Error updating admin user:', updateError);
        } else {
          console.log('✓ Admin user "magurk" updated successfully');
        }
      } else {
        console.error('Error creating admin user:', error);
      }
    } else {
      console.log('✓ Admin user "magurk" created successfully:', {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
      });
    }

    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Email: admin@templodoabismo.com.br');
    console.log('Password: admin123');
    console.log('Username: magurk');
    console.log('========================');

  } catch (error) {
    console.error('Error in createMagurkAdmin:', error);
  }
}

createMagurkAdmin();