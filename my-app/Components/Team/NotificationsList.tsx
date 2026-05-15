"use client";

import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";

type Notification = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
};

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("https://localhost:7281/api/Notifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>

      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            message={notification.message}
          />
        ))}
      </div>
    </div>
  );
}