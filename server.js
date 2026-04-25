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
//
//  ⚠️  MUHIM XAVFSIZLIK ESLATMASI:
//    Admin login/parollar endi Supabase DB da saqlanadi.
//    Bu yerda hech qanday parol bo'lmasligi kerak!
//    Faqat SUPABASE_URL va SUPABASE_ANON_KEY kerak.
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn('⚠️  OGOHLANTIRISH: SUPABASE_URL yoki SUPABASE_ANON_KEY sozlanmagan!');
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Frontendga FAQAT Supabase kalitlarini berish — parollar YUBORILMAYDI
app.get('/api/config', (req, res) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return res.status(503).json({ error: 'Supabase sozlanmagan.' });
  }
  res.json({ supabaseUrl: url, supabaseAnonKey: key });
});

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'landing.html')));
app.get('/portal', (req, res) => res.sendFile(path.join(__dirname, 'public', 'portal.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'portal.html')));

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`   Supabase: ${process.env.SUPABASE_URL || '⚠️  sozlanmagan'}`);
  console.log(`   🔒 Admin login/parollar: Supabase DB (admins jadvali)`);
});
