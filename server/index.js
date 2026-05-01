const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
let orders = [];

// Helper to generate a short ID
const generateId = () => crypto.randomBytes(3).toString('hex').toUpperCase();

// Prices (could be moved to DB or config)
const PRICES = {
  Shirt: 5,
  Pants: 7,
  Saree: 15,
  Suit: 20,
  Dress: 12
};

// 1. Create Order
app.post('/api/orders', (req, res) => {
  const { customerName, phoneNumber, garments } = req.body;

  if (!customerName || !phoneNumber || !garments || !Array.isArray(garments) || garments.length === 0) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  let totalAmount = 0;
  const processedGarments = garments.map(g => {
    // If the client provides a price, use it, otherwise fallback to configured price or 0
    const pricePerItem = g.pricePerItem || PRICES[g.type] || 0;
    const itemTotal = pricePerItem * g.quantity;
    totalAmount += itemTotal;
    return {
      type: g.type,
      quantity: g.quantity,
      pricePerItem,
      total: itemTotal
    };
  });

  // Calculate estimated delivery (3 days from now)
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

  const newOrder = {
    id: `ORD-${generateId()}`,
    customerName,
    phoneNumber,
    garments: processedGarments,
    totalAmount,
    status: 'RECEIVED',
    createdAt: new Date().toISOString(),
    estimatedDeliveryDate: estimatedDeliveryDate.toISOString()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// 2. View Orders (with optional filters)
app.get('/api/orders', (req, res) => {
  const { status, search } = req.query;
  
  let filteredOrders = orders;

  if (status) {
    filteredOrders = filteredOrders.filter(o => o.status === status);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredOrders = filteredOrders.filter(o => 
      o.customerName.toLowerCase().includes(searchLower) ||
      o.phoneNumber.includes(searchLower) ||
      o.id.toLowerCase().includes(searchLower)
    );
  }

  // Sort by newest first
  filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(filteredOrders);
});

// 3. Update Order Status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  res.json(order);
});

// 4. Basic Dashboard Stats
app.get('/api/dashboard', (req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  const ordersPerStatus = {
    RECEIVED: 0,
    PROCESSING: 0,
    READY: 0,
    DELIVERED: 0
  };

  orders.forEach(o => {
    if (ordersPerStatus[o.status] !== undefined) {
      ordersPerStatus[o.status]++;
    }
  });

  // Recent orders for the dashboard view
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  res.json({
    totalOrders,
    totalRevenue,
    ordersPerStatus,
    recentOrders
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
