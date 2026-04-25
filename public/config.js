// ═══════════════════════════════════════════════════════════
//  CONFIG — Supabase va Admin sozlamalari
//  Bu faylni .gitignore ga qo'shish TAVSIYA ETILADI
//  yoki environment variable orqali server.js dan yuklansin
// ═══════════════════════════════════════════════════════════

const SUPABASE_URL      = 'YOUR_SUPABASE_URL';       // https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // anon/public key

// Bosh admin — to'liq huquq (qo'shish, o'chirish, parol yangilash)
const SUPER_ADMIN_USERNAME = 'admin';
const SUPER_ADMIN_PASSWORD = 'Admin@2024!';

// Viewer admin — faqat ko'rish huquqi
const VIEWER_ADMIN_USERNAME = 'viewer';
const VIEWER_ADMIN_PASSWORD = 'Viewer@2024!';
