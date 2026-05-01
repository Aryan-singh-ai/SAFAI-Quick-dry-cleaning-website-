export default function DashboardCards({ orders }) {
  const totalOrders = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const processing = orders.filter(o => o.status === "PROCESSING").length;
  const delivered = orders.filter(o => o.status === "DELIVERED").length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card title="Total Orders" value={totalOrders} />
      <Card title="Revenue" value={`₹${revenue}`} />
      <Card title="Processing" value={processing} />
      <Card title="Delivered" value={delivered} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
        {value}
      </h2>
    </div>
  );
}