import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    let url = 'http://localhost:3001/api/orders';
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (statusFilter) params.append('status', statusFilter);
    if (params.toString()) url += `?${params.toString()}`;

    axios.get(url)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/api/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RECEIVED': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'PROCESSING': return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
      case 'READY': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
      case 'DELIVERED': return 'bg-zinc-500/20 text-white border-zinc-500/20';
      default: return 'bg-zinc-500/20 text-white border-zinc-500/20';
    }
  };

  const statuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            Orders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white"
          >
            Manage and track all laundry orders.
          </motion.p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
          <input
            type="text"
            placeholder="Search by ID, name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#2B7A78] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-white"
          />
        </div>
        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#2B7A78] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'none' }}
          >
            <option value="" className="bg-[#120a1c]">All Statuses</option>
            {statuses.map(s => (
              <option key={s} value={s} className="bg-[#120a1c]">{s}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#2B7A78] border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white uppercase bg-[#2B7A78] border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Order Details</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Est. Delivery</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-white">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-white">No orders found matching your criteria.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#2B7A78] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-white font-medium mb-1">{order.id}</div>
                      <div className="text-xs text-white">
                        {order.garments.length} items ({order.garments.reduce((acc, g) => acc + g.quantity, 0)} total)
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium mb-1">{order.customerName}</div>
                      <div className="text-xs text-white">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-white">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-white" />
                        {format(new Date(order.estimatedDeliveryDate), "MMM d, yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-full border outline-none cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                          style={{ appearance: 'none', textAlign: 'center' }}
                        >
                          {statuses.map(s => (
                            <option key={s} value={s} className="bg-[#120a1c] text-white text-left">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
