import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const uploadDir = path.join(process.cwd(), '/public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('❌ Upload error:', err);
        return res.status(500).json({ message: 'Upload failed', error: err });
      }

      // 🔹 Ambil file image dari hasil upload (bisa array atau object)
      const fileData = Array.isArray(files.image)
        ? files.image[0]
        : files.image;

      if (!fileData) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // 🔹 Deteksi nama file & lokasi sementara
      const tempPath = fileData.filepath || fileData.path;
      const originalName =
        fileData.originalFilename ||
        fileData.originalFileName ||
        fileData.newFilename ||
        path.basename(tempPath || '');

      if (!tempPath || !originalName) {
        console.error('❌ File path or name undefined:', fileData);
        return res.status(500).json({ message: 'Invalid file data' });
      }

      // 🔹 Pindahkan ke folder upload final
      const newPath = path.join(uploadDir, originalName);
      fs.renameSync(tempPath, newPath);

      const fileUrl = `/uploads/${originalName}`;
      console.log('✅ File uploaded:', fileUrl);

      return res.status(200).json({ message: 'Upload success', fileUrl });
    });
  } catch (error) {
    console.error('❌ Upload handler error:', error);
    return res.status(500).json({ message: error.message });
  }
}
