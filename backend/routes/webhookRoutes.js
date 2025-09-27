// backend/routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/xendit', async (req, res) => {
  try {
    console.log('[WEBHOOK] Headers:', req.headers);
    console.log('[WEBHOOK] Body received:', JSON.stringify(req.body, null, 2));

    const incomingToken = req.headers['x-callback-token'];
    if (incomingToken !== process.env.XENDIT_CALLBACK_TOKEN) {
      console.error('[WEBHOOK] GAGAL: Token callback tidak valid.');
      console.error('[WEBHOOK] Token yang diterima:', incomingToken);
      console.error('[WEBHOOK] Token yang diharapkan:', process.env.XENDIT_CALLBACK_TOKEN);
      return res.status(401).send('Invalid callback token');
    }

    const payload = req.body;
    
    // PERBAIKAN: Gunakan status langsung dari payload, bukan event
    console.log(`[WEBHOOK] Status invoice: ${payload.status}`);
    console.log(`[WEBHOOK] External ID: ${payload.external_id}`);

    // Cek jika status adalah PAID (pembayaran berhasil)
    if (payload && payload.status === 'PAID') {
      const externalId = payload.external_id;
      console.log(`[WEBHOOK] Pembayaran diterima untuk externalId: "${externalId}"`);

      // Cari order di database
      const order = await Order.findOne({ externalId: externalId });
      console.log(`[WEBHOOK] Order ditemukan:`, order);

      if (!order) {
        console.error(`[WEBHOOK] GAGAL: Pesanan dengan externalId "${externalId}" tidak ditemukan.`);
        return res.status(404).send('Order not found');
      }

      if (order.status === 'PAID') {
        console.log(`[WEBHOOK] INFO: Status pesanan "${externalId}" sudah LUNAS.`);
        return res.status(200).send('Webhook already processed');
      }

      // Update status menjadi LUNAS
      order.status = 'PAID';
      await order.save();
      
      // Verifikasi update
      const updatedOrder = await Order.findOne({ externalId: externalId });
      console.log(`[WEBHOOK] SUKSES: Status pesanan berhasil diupdate menjadi LUNAS`);
      console.log(`[WEBHOOK] Order updated:`, updatedOrder);
    } else {
      console.log(`[WEBHOOK] Status bukan PAID, mengabaikan. Status: ${payload.status}`);
    }

    res.status(200).send('Webhook processed successfully');
  } catch (error) {
    console.error('[WEBHOOK] GAGAL: Terjadi error saat memproses webhook.', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;