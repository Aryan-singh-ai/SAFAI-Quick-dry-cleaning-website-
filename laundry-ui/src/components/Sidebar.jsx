export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-5">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Laundry
      </h1>

      <nav className="flex flex-col gap-4">
        <button className="text-left font-medium text-blue-600 dark:text-blue-400">
          Dashboard
        </button>
        <button className="text-left text-gray-600 dark:text-gray-300">
          Orders
        </button>
      </nav>
      
    </div>
  );
}
