type NotificationCardProps = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  time?: string;
  onMarkAsRead: (id: number) => void;
};

export default function NotificationCard({
  id,
  title,
  message,
  isRead,
  time = "Now",
  onMarkAsRead,
}: NotificationCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border ${
        isRead ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-400">
          {time}
        </p>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {message}
      </p>

      {!isRead && (
        <button
          onClick={() => onMarkAsRead(id)}
          className="text-sm text-orange-500 font-medium hover:text-orange-600"
        >
          Mark as read
        </button>
      )}
    </div>
  );
}