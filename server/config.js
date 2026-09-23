import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'intelfarma_super_secret_jwt_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbPath: process.env.DB_PATH || path.join(rootDir, 'data', 'intelfarma.sqlite'),
  uploadsDir: path.join(rootDir, 'uploads'),
  publicDir: path.join(rootDir, 'public'),
  assetsDir: path.join(rootDir, 'asserts'),
  rootDir
};
