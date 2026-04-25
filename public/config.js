// ═══════════════════════════════════════════════════════════
//  CONFIG — Supabase va Admin sozlamalari
//  Bu faylni .gitignore ga qo'shish TAVSIYA ETILADI
//  yoki environment variable orqali server.js dan yuklansin
// ═══════════════════════════════════════════════════════════

const SUPABASE_URL   = 'https://ecxllkqajkntnikwbpgl.supabase.co';       // https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_9pEOR9DF5kddUproD5NTjQ_MnFFUmee';  // anon/public key

// Bosh admin — to'liq huquq (qo'shish, o'chirish, parol yangilash)
const SUPER_ADMIN_USERNAME = 'admin';
const SUPER_ADMIN_PASSWORD = 'admin';

// Viewer admin — faqat ko'rish huquqi
const VIEWER_ADMIN_USERNAME = 'viewer';
const VIEWER_ADMIN_PASSWORD = 'viewer';
