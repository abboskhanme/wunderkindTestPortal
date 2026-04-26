// ═══════════════════════════════════════════════════════════
//  SERVER.JS — Maktab Test Portali Backend
//  Hosting: Railway.app
//
//  Ishga tushirish (lokal):
//    npm install
//    node server.js
//
//  Environment variables (.env yoki Railway dashboard):
//    PORT=3000
//    SUPABASE_URL=https://xxxx.supabase.co
//    SUPABASE_ANON_KEY=your_anon_key
//
//  🔒 XAVFSIZLIK:
//    - Admin parollar HECH QACHON frontendga yuborilmaydi
//    - Login tekshiruvi server tomonida Supabase orqali amalga oshiriladi
//    - Faqat SUPABASE_URL va SUPABASE_ANON_KEY frontendga beriladi
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Muhit o'zgaruvchilarini tekshirish ────────────────────
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn('⚠️  OGOHLANTIRISH: SUPABASE_URL yoki SUPABASE_ANON_KEY sozlanmagan!');
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ── /api/config — faqat Supabase kalitlarini berish ──────
// Admin parollar YUBORILMAYDI — ular server tomonida tekshiriladi
app.get('/api/config', (req, res) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(503).json({ error: 'Supabase sozlanmagan.' });
  }

  res.json({
    supabaseUrl:     url,
    supabaseAnonKey: key,
  });
});

// ── /api/login — admin loginni server tomonida tekshirish ─
// Frontend parolni serverga yuboradi → server Supabase dan tekshiradi
// Parol hech qachon frontendga qaytarilmaydi
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username va parol kiritilishi shart.' });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(503).json({ error: 'Server sozlanmagan.' });
  }

  try {
    // Supabase REST API orqali admins jadvalidan foydalanuvchini qidirish
    const response = await fetch(
      `${url}/rest/v1/admins?username=eq.${encodeURIComponent(username)}&select=username,password,role`,
      {
        headers: {
          'apikey':        key,
          'Authorization': `Bearer ${key}`,
          'Content-Type':  'application/json',
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Supabase bilan bog\'lanishda xatolik.' });
    }

    const admins = await response.json();

    if (!admins || admins.length === 0) {
      return res.status(401).json({ error: 'Login yoki parol noto\'g\'ri.' });
    }

    const admin = admins[0];

    // Parolni tekshirish (oddiy matn bilan solishtiruv)
    // Keyinchalik bcrypt ga o'tish tavsiya etiladi
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Login yoki parol noto\'g\'ri.' });
    }

    // Muvaffaqiyatli login — faqat role qaytariladi, parol QAYTARILMAYDI
    res.json({
      success: true,
      role:    admin.role, // 'superadmin' yoki 'viewer'
    });

  } catch (err) {
    console.error('Login xatosi:', err);
    res.status(500).json({ error: 'Server xatosi yuz berdi.' });
  }
});

// ── Health check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ── Sahifalar ─────────────────────────────────────────────
app.get('/',       (req, res) => res.sendFile(path.join(__dirname, 'public', 'landing.html')));
app.get('/portal', (req, res) => res.sendFile(path.join(__dirname, 'public', 'portal.html')));
app.get('*',       (req, res) => res.sendFile(path.join(__dirname, 'public', 'portal.html')));

app.listen(PORT, () => {
  console.log(`✅ Server ishga tushdi: http://localhost:${PORT}`);
  console.log(`   Supabase: ${process.env.SUPABASE_URL || '⚠️  sozlanmagan'}`);
  console.log(`   🔒 Admin login: /api/login (server tomonida Supabase orqali)`);
});
