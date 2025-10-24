// pages/api/create-invoice.js
import dbConnect from '../../lib/mongodb';
import Order from '../../models/Order';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    if (!process.env.XENDIT_SECRET_KEY) {
      throw new Error('XENDIT_SECRET_KEY not found in environment variables');
    }

    const { amount, email, name, phone, items } = req.body;

    if (!amount || !email || !name || !phone || !items) {
      return res.status(400).json({ 
        message: 'Amount, email, name, phone, and items are required' 
      });
    }

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}`;
    const externalId = `invoice-${Date.now()}`;

    // Simpan order ke database dulu
    const order = await Order.create({
      orderId,
      externalId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      items,
      totalAmount: amount,
      paymentStatus: 'pending',
    });

    // Buat invoice ke Xendit
    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        external_id: externalId,
        amount: amount,
        payer_email: email,
        description: `Payment for order ${orderId}`,
        customer: {
          given_names: name,
          email: email,
          mobile_number: phone,
        },
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        success_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?order_id=${orderId}`,
        failure_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed?order_id=${orderId}`,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Xendit API Error:', data);
      // Hapus order jika gagal buat invoice
      await Order.findByIdAndDelete(order._id);
      return res.status(400).json(data);
    }

    // Update order dengan invoice data dari Xendit
    order.xenditInvoiceId = data.id;
    order.xenditInvoiceUrl = data.invoice_url;
    await order.save();

    return res.status(200).json({
      ...data,
      orderId,
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: error.message });
  }
}