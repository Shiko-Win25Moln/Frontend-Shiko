import NotificationCard from "./NotificationCard";

const notifications = [
  {
    title: "Invitation sent",
    message: "Your invitation was sent successfully.",
    time: "2 min ago",
  },
  {
    title: "New team member",
    message: "Adam Smith joined the team.",
    time: "10 min ago",
  },
];

export default function NotificationsList() {
  return (
    <div className="bg-white p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6">
        Notifications
      </h2>

      <div className="flex flex-col gap-4">
        {notifications.map((notification, index) => (
          <NotificationCard
            key={index}
            title={notification.title}
            message={notification.message}
            time={notification.time}
          />
        ))}
      </div>
    </div>
  );
}