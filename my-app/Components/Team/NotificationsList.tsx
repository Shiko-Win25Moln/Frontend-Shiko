"use client";

import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";

type Notification = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
};

type NotificationsListProps = {
  refreshTrigger: number;
};

const API_URL =
  "https://notificationswebapi20260524114831-hsgeh6g3g9f0hccj.swedencentral-01.azurewebsites.net";

export default function NotificationsList({
  refreshTrigger,
}: NotificationsListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function fetchNotifications() {
    fetch(`${API_URL}/api/Notifications`)
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) =>
        console.error("Error fetching notifications:", error)
      );
  }

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshTrigger]);

  async function handleMarkAsRead(id: number) {
    try {
      const response = await fetch(
        `${API_URL}/api/Notifications/${id}/read`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        setNotifications((previousNotifications) =>
          previousNotifications.map((notification) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl mt-8">
      <h2 className="text-2xl font-semibold mb-6">
        Notifications
      </h2>

      <div className="flex flex-col gap-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            id={notification.id}
            title={notification.title}
            message={notification.message}
            isRead={notification.isRead}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
}