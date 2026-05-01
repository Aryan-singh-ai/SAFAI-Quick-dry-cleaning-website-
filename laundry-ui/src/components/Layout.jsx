import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, PlusCircle, Droplets } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout({ children }) {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
    { name: "Create Order", href: "/create", icon: PlusCircle },
  ];

  return (
    <div className="flex h-screen bg-[#3AAFA9] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/20 bg-[#2B7A78] backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Droplets className="w-6 h-6 text-purple-500 mr-2" />
          <span className="text-xl font-semibold tracking-tight">SAFAI</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-purple-500/10 text-white"
                    : "text-white hover:bg-[#2B7A78] hover:text-white"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : "text-white")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gradient-to-br from-[#3AAFA9] to-[#24706c]">
        {/* Mobile Header */}
        <div className="md:hidden h-16 border-b border-white/20 flex items-center px-4 justify-between bg-[#2B7A78] backdrop-blur-xl z-10">
          <div className="flex items-center">
            <Droplets className="w-6 h-6 text-purple-500 mr-2" />
            <span className="text-xl font-semibold">SAFAI</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
