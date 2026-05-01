export default function Dashboard({ orders }) {
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statusCount = {
    RECEIVED: 0,
    PROCESSING: 0,
    READY: 0,
    DELIVERED: 0,
  };

  orders.forEach((o) => statusCount[o.status]++);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card title="Orders" value={totalOrders} />
      <Card title="Revenue" value={`₹${revenue}`} />
      <Card title="Processing" value={statusCount.PROCESSING} />
      <Card title="Delivered" value={statusCount.DELIVERED} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}