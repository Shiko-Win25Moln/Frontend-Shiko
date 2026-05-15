type NotificationCardProps = {
  title: string;
  message: string;
  time?: string;
};

export default function NotificationCard({
  title,
  message,
  time = "Now",
}: NotificationCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{time}</p>
      </div>

      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}