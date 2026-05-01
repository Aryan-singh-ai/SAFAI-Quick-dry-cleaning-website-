import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, DollarSign, Activity } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

const StatCard = ({ title, value, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-[#2B7A78] border border-white/10 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/50 transition-colors"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-white mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
      </div>
      <div className="p-3 bg-purple-500/20 rounded-xl text-white">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    ordersPerStatus: { RECEIVED: 0, PROCESSING: 0, READY: 0, DELIVERED: 0 },
    recentOrders: []
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/dashboard')
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'RECEIVED': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'PROCESSING': return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
      case 'READY': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
      case 'DELIVERED': return 'bg-zinc-500/20 text-white border-zinc-500/20';
      default: return 'bg-zinc-500/20 text-white border-zinc-500/20';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Overview
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white"
        >
          Welcome back. Here's what's happening today.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={`₹${data.totalRevenue.toFixed(2)}`} icon={DollarSign} delay={0.1} />
        <StatCard title="Total Orders" value={data.totalOrders} icon={Activity} delay={0.2} />
        <StatCard title="Ready for Pickup" value={data.ordersPerStatus.READY} icon={Users} delay={0.3} />
        <StatCard title="Processing" value={data.ordersPerStatus.PROCESSING} icon={BarChart3} delay={0.4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-[#2B7A78] border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
        {data.recentOrders.length === 0 ? (
          <p className="text-white text-center py-8">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-[#2B7A78] rounded-t-xl">
                <tr>
                  <th className="px-6 py-4 font-medium rounded-tl-xl">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium rounded-tr-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#2B7A78] transition-colors">
                    <td className="px-6 py-4 font-mono text-white">{order.id}</td>
                    <td className="px-6 py-4 text-white">{order.customerName}</td>
                    <td className="px-6 py-4 text-white">
                      {format(new Date(order.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">₹{order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
