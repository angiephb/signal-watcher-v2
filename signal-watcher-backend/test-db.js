import { Client } from 'pg';
import 'dotenv/config';

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('Intentando conectar a:', process.env.DATABASE_URL?.split('@')[1]);
    await client.connect();
    console.log('¡Conexión exitosa!');
    const res = await client.query('SELECT NOW()');
    console.log('Respuesta del servidor:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Error de conexión:', err.message);
    if (err.message.includes('ETIMEDOUT') || err.message.includes('ECONNREFUSED')) {
      console.log('Sugerencia: Revisa si tu IP está permitida en el firewall de Supabase.');
    }
    process.exit(1);
  }
}

testConnection();
