// ═══════════════════════════════════════════════════════════
//  SERVER.JS — Maktab Test Portali Backend
//  Tekin hosting uchun: Render.com yoki Railway.app
//
//  Ishga tushirish:
//    npm install
//    node server.js
//
//  Environment variables (.env yoki hosting dashboard):
//    PORT=3000
//    SUPABASE_URL=https://xxxx.supabase.co
//    SUPABASE_ANON_KEY=your_anon_key
//    SUPER_ADMIN_USERNAME=admin
//    SUPER_ADMIN_PASSWORD=Admin@2024!
//    VIEWER_ADMIN_USERNAME=viewer
//    VIEWER_ADMIN_PASSWORD=Viewer@2024!
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Static fayllar (public/ papkasidan) ───────────────────
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ── /api/config — frontend uchun sozlamalarni yetkazish ──
// (Supabase kalitlari va admin parollarini frontendga o'tkazish)
// Eslatma: ANON_KEY frontendga ko'rinadi — bu Supabase'da normal holat.
// Row-Level Security (RLS) yoqilgan bo'lsa xavfsiz.
app.get('/api/config', (req, res) => {
  res.json({
    supabaseUrl:          process.env.SUPABASE_URL            || 'YOUR_SUPABASE_URL',
    supabaseAnonKey:      process.env.SUPABASE_ANON_KEY       || 'YOUR_SUPABASE_ANON_KEY',
    superAdminUsername:   process.env.SUPER_ADMIN_USERNAME     || 'admin',
    superAdminPassword:   process.env.SUPER_ADMIN_PASSWORD     || 'Admin@2024!',
    viewerAdminUsername:  process.env.VIEWER_ADMIN_USERNAME    || 'viewer',
    viewerAdminPassword:  process.env.VIEWER_ADMIN_PASSWORD    || 'Viewer@2024!',
  });
});

// ── Health check (Render/Railway uchun) ───────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// ── Root → landing page ───────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// ── /portal → asosiy test sahifasi ───────────────────────
app.get('/portal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portal.html'));
});

// ── Barcha boshqa so'rovlarni index.html ga yo'naltirish ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portal.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`   Supabase: ${process.env.SUPABASE_URL || '⚠️  sozlanmagan'}`);
});
