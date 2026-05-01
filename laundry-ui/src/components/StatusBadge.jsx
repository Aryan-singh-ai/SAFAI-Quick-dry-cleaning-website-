export default function StatusBadge({ status }) {
  const styles = {
    RECEIVED: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
    PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    READY: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}