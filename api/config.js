// ═══════════════════════════════════════════════════════════
//  api/config.js — Vercel Serverless Function
//  Express server.js dagi /api/config endpointining o'rnini bosadi.
//
//  Vercel Dashboard > Settings > Environment Variables ga qo'shing:
//    SUPABASE_URL       = https://xxxx.supabase.co
//    SUPABASE_ANON_KEY  = your_anon_key
// ═══════════════════════════════════════════════════════════

export default function handler(req, res) {
  // Faqat GET ruxsat beriladi
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(503).json({ error: 'Supabase sozlanmagan.' });
  }

  // Faqat anon key yuboriladi — parollar YUBORILMAYDI
  res.status(200).json({
    supabaseUrl: url,
    supabaseAnonKey: key,
  });
}
