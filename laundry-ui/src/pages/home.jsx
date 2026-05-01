import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardCards from "../components/DashboardCards";
import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";
import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState([]);

  return (
    <div className="flex min-h-screen 
    bg-gradient-to-br 
    from-blue-50 via-white to-purple-100 
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
    transition">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8">

        {/* Header */}
        <Header />

        {/* Dashboard Cards */}
        <div className="mb-6">
          <DashboardCards orders={orders} />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Order Form */}
          <OrderForm setOrders={setOrders} />

          {/* Orders Table */}
          <OrdersTable orders={orders} setOrders={setOrders} />

        </div>

      </div>
    </div>
  );
}