import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from './config.js';
import { runSeed } from './database/seed.js';

// Importar rotas
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import pagesRoutes from './routes/pages.js';
import medicinesRoutes from './routes/medicines.js';
import blogRoutes from './routes/blog.js';
import faqRoutes from './routes/faq.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';

const app = express();

// Inicializar banco e seeds iniciais automaticamente
try {
  runSeed();
} catch (err) {
  console.error('Erro ao inicializar banco de dados:', err);
}

// Middlewares
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Servir arquivos estáticos
app.use('/asserts', express.static(config.assetsDir));
app.use('/uploads', express.static(config.uploadsDir));
app.use(express.static(config.publicDir));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/medicines', medicinesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Intelfarma Web & CMS API'
  });
});

// SPA fallback para rotas do Frontend e Admin
app.get('/admin*', (req, res) => {
  res.sendFile(path.join(config.publicDir, 'admin', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(config.publicDir, 'index.html'));
});

// Inicialização do servidor
app.listen(config.port, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Servidor Intelfarma rodando com sucesso!`);
  console.log(`🌐 Site Institucional:  http://localhost:${config.port}`);
  console.log(`🔒 Painel Admin (CMS):  http://localhost:${config.port}/admin`);
  console.log(`📡 API Healthcheck:     http://localhost:${config.port}/api/health`);
  console.log(`======================================================\n`);
});
