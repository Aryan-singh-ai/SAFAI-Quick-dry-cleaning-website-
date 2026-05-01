import StatusBadge from "./StatusBadge";

export default function OrdersTable({ orders, setOrders }) {
  const updateStatus = (id) => {
    const flow = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

    const updated = orders.map((o) => {
      if (o.id === id) {
        const next =
          flow[(flow.indexOf(o.status) + 1) % flow.length];
        return { ...o, status: next };
      }
      return o;
    });

    setOrders(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Orders
      </h2>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-gray-500 dark:text-gray-400">
            <tr>
              <th className="py-2 text-left">Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b dark:border-gray-700">
                <td className="py-2">
                  <div className="text-gray-800 dark:text-white">
                    {o.customer}
                  </div>
                  <div className="text-xs text-gray-400">
                    {o.phone}
                  </div>
                </td>

                <td className="text-gray-700 dark:text-gray-200">
                  ₹{o.total}
                </td>

                <td>
                  <StatusBadge status={o.status} />
                </td>

                <td>
                  <button
                    onClick={() => updateStatus(o.id)}
                    className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                  >
                    Update →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}