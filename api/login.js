export default async function handler(req, res) {
  // Ambil parameter email dan deviceId yang dikirim dari HTML
  const { email, deviceId } = req.query;

  // Mengambil URL Rahasia dari pengaturan Environment Vercel
  const GAS_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

  // Jika Environment Variable belum diisi di Vercel
  if (!GAS_URL) {
    return res.status(500).json({ 
      success: false, 
      message: "Sistem Error: Variabel GOOGLE_APPS_SCRIPT_URL belum disetel di Vercel!" 
    });
  }

  try {
    // Meneruskan permintaan secara diam-diam ke Google Apps Script
    const targetUrl = `${GAS_URL}?action=login&email=${encodeURIComponent(email)}&deviceId=${encodeURIComponent(deviceId)}`;
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
        throw new Error("Google Script menolak permintaan.");
    }

    const data = await response.json();
    
    // Kembalikan jawaban JSON dari Google ke frontend HTML
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Gagal terhubung ke Database Google. Pastikan URL Apps Script sudah benar." 
    });
  }
}
