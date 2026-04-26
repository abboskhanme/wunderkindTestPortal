// api/health.js — Vercel Serverless Function
export default function handler(req, res) {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
}
