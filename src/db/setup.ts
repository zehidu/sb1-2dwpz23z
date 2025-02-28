import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .filter(statement => statement.trim() !== '')
      .map(statement => statement + ';');
    
    // Execute each statement
    const connection = await pool.getConnection();
    
    try {
      for (const statement of statements) {
        await connection.query(statement);
      }
      console.log('Database setup completed successfully');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();

export default setupDatabase;