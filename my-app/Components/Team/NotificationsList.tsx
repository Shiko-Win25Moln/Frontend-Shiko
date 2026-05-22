"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
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

export default function NotificationsList({
  refreshTrigger,
}: NotificationsListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("http://localhost:5098/api/Notifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) =>
        console.error("Error fetching notifications:", error)
      );
  }, [refreshTrigger]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5098/notificationHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("Connected to SignalR notification hub"))
      .catch((error) =>
        console.error("SignalR connection error:", error)
      );

    connection.on("ReceiveNotification", (newNotification: Notification) => {
      setNotifications((previousNotifications) => [
        newNotification,
        ...previousNotifications,
      ]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  async function handleMarkAsRead(id: number) {
    try {
      const response = await fetch(
        `http://localhost:5098/api/Notifications/${id}/read`,
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