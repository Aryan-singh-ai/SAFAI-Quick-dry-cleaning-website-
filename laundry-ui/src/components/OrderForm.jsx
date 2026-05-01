import { useState } from "react";

const priceList = {
  Shirt: 50,
  Pants: 80,
  Saree: 120,
};

export default function OrderForm({ setOrders }) {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([{ type: "Shirt", qty: 1 }]);

  const addItem = () => {
    setItems([...items, { type: "Shirt", qty: 1 }]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const total = items.reduce(
    (sum, item) => sum + item.qty * priceList[item.type],
    0
  );

  const handleSubmit = () => {
    if (!customer || !phone) return;

    const newOrder = {
      id: Date.now(),
      customer,
      phone,
      items,
      total,
      status: "RECEIVED",
    };

    setOrders((prev) => [newOrder, ...prev]);

    setCustomer("");
    setPhone("");
    setItems([{ type: "Shirt", qty: 1 }]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
      
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Create Order
      </h2>

      {/* Customer Info */}
      <div className="space-y-3 mb-4">
        <input
          placeholder="Customer Name"
          className="w-full p-2 rounded-lg border 
          bg-white dark:bg-gray-700 
          text-gray-800 dark:text-white 
          border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          className="w-full p-2 rounded-lg border 
          bg-white dark:bg-gray-700 
          text-gray-800 dark:text-white 
          border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg 
            bg-gray-50 dark:bg-gray-700"
          >
            <select
              className="flex-1 p-2 rounded-lg border 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-white 
              border-gray-300 dark:border-gray-600"
              value={item.type}
              onChange={(e) =>
                updateItem(i, "type", e.target.value)
              }
            >
              {Object.keys(priceList).map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              className="w-20 p-2 rounded-lg border 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-white 
              border-gray-300 dark:border-gray-600"
              value={item.qty}
              onChange={(e) =>
                updateItem(i, "qty", Number(e.target.value))
              }
            />

            <div className="text-sm w-16 text-gray-600 dark:text-gray-300">
              ₹{priceList[item.type]}
            </div>

            {items.length > 1 && (
              <button
                onClick={() => removeItem(i)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Item */}
      <button
        onClick={addItem}
        className="text-blue-600 dark:text-blue-400 text-sm mb-4 hover:underline"
      >
        + Add Item
      </button>

      {/* Bill Preview */}
      <div className="p-4 rounded-lg mb-4 
      bg-gray-50 dark:bg-gray-700">
        <h3 className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
          Bill Summary
        </h3>

        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-sm text-gray-700 dark:text-gray-200"
          >
            <span>
              {item.type} × {item.qty}
            </span>
            <span>
              ₹{item.qty * priceList[item.type]}
            </span>
          </div>
        ))}

        <div className="flex justify-between font-semibold mt-2 border-t pt-2 
        border-gray-300 dark:border-gray-600 
        text-gray-800 dark:text-white">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 
        text-white py-2 rounded-lg transition"
      >
        Create Order
      </button>
    </div>
  );
}