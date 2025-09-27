// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { Xendit } = require('xendit-node');

const x = new Xendit({
  secretKey: process.env.XENDIT_API_KEY,
});

const { Invoice } = x;

router.post('/create-invoice', async (req, res) => {
  try {
    const { amount, items } = req.body;
    const externalId = `invoice-${Date.now()}`;

    // Simpan pesanan ke database dengan status PENDING
    const newOrder = new Order({
      items: items.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
      totalAmount: amount,
      externalId: externalId,
    });
    await newOrder.save();
    console.log('[PAYMENT] Order baru disimpan ke DB:', newOrder.externalId);

    // Buat invoice menggunakan Xendit SDK
    const invoice = await Invoice.createInvoice({
      data: {
        externalId: externalId,
        amount: amount,
        successRedirectUrl: `http://localhost:3000/success?order_id=${externalId}`,
        items: items.map(item => ({
          name: item.name,
          quantity: item.qty,
          price: item.price,
        })),
        customer: {
          givenNames: 'Pelanggan',
          surname: 'Prasmul',
          email: 'test@prasetiyamulya.ac.id',
        },
      }
    });

    // Di fungsi POST /create-invoice, ganti bagian response:
    res.json({ 
      invoiceUrl: invoice.invoiceUrl,
      externalId: externalId // PASTIKAN INI DITAMBAHKAN
    });

  } catch (error) {
    console.error('[PAYMENT] Gagal membuat invoice Xendit:', error);
    res.status(500).json({ error: error.message || 'Terjadi kesalahan internal' });
  }
});


  // Tambahkan sebelum module.exports
  router.get('/check-status/:externalId', async (req, res) => {
    try {
      const { externalId } = req.params;
      const order = await Order.findOne({ externalId: externalId });
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.json({ 
        status: order.status,
        externalId: order.externalId,
        totalAmount: order.totalAmount,
        items: order.items
      });
    } catch (error) {
      console.error('[PAYMENT] Gagal check status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;