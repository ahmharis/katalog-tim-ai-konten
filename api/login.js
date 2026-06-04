export default async function handler(req, res) {
  // Hanya menerima metode GET
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { email, deviceId } = req.query;

  // Mengambil rahasia dari Environment Variable Vercel
  const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!GAS_URL) {
    return res.status(500).json({ success: false, message: 'Server Configuration Error' });
  }

  try {
    // Meneruskan request dari Vercel ke Google Apps Script
    const response = await fetch(`${GAS_URL}?action=login&email=${encodeURIComponent(email)}&deviceId=${encodeURIComponent(deviceId)}`);
    const data = await response.json();
    
    // Mengembalikan jawaban dari Google ke Browser pengguna
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghubungi server database.' });
  }
}
