// lib/sendWhatsApp.js
// Simple wrapper to send WhatsApp message via an HTTP API (example: Fonnte/Twilio)
// Set environment variables: process.env.WA_API_URL and process.env.WA_API_KEY

export default async function sendWhatsApp(to, message) {
  if (!process.env.WA_API_URL || !process.env.WA_API_KEY) {
    console.warn('WA API not configured. Set WA_API_URL and WA_API_KEY in .env.local');
    return { ok: false, error: 'WA not configured' };
  }

  try {
    const res = await fetch(process.env.WA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WA_API_KEY}`,
      },
      body: JSON.stringify({
        to, // +628...
        message, // plain text
      }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error('sendWhatsApp error', err);
    return { ok: false, error: err.message };
  }
}
