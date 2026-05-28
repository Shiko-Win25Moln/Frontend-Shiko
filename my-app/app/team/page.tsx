"use client";

import { useEffect, useState } from "react";
import TeamMemberCard from "@/Components/Team/TeamMemberCard";
import TeamInviteForm from "@/Components/Team/TeamInviteForm";
import Sidebar from "@/Components/Layout/Sidebar";
import NotificationsList from "@/Components/Team/NotificationsList";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Home() {
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>([]);

  const [refreshNotifications, setRefreshNotifications] = useState(0);
  const [activeTab, setActiveTab] = useState("team");

  useEffect(() => {
    fetch(
      "https://teammemberswebapi20260524090131-etfebsb9dpgwephm.swedencentral-01.azurewebsites.net/api/TeamMembers"
    )
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) =>
        console.error("Error fetching team members:", error)
      );
  }, []);

  async function handleDelete(id: number) {
    const memberToDelete = teamMembers.find(
      (member) => member.id === id
    );

    const confirmed = confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `https://teammemberswebapi20260524090131-etfebsb9dpgwephm.swedencentral-01.azurewebsites.net/api/TeamMembers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setTeamMembers((previousMembers) =>
          previousMembers.filter(
            (member) => member.id !== id
          )
        );

        await fetch(
          "https://notificationswebapi20260524114831-hsgeh6g3g9f0hccj.swedencentral-01.azurewebsites.net/api/Notifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: 0,
              title: "Team member removed",
              message: `${
                memberToDelete?.name ?? "A team member"
              } was removed from the team.`,
              isRead: false,
            }),
          }
        );

        setRefreshNotifications(
          (previousValue) => previousValue + 1
        );
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  }

  function handleInviteSent() {
    setRefreshNotifications(
      (previousValue) => previousValue + 1
    );
  }

  function handleTeamMemberAdded(newMember: TeamMember) {
    setTeamMembers((previousMembers) => [
      ...previousMembers,
      newMember,
    ]);
  }

  return (
    <main className="flex min-h-screen bg-gray-100 text-slate-900">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">
          Team
        </h1>

        <div className="flex gap-8 mb-8 text-sm text-gray-500">
          <button>
            General
          </button>

          <button
            onClick={() => setActiveTab("team")}
            className={
              activeTab === "team"
                ? "bg-slate-800 text-white px-5 py-2 rounded-lg"
                : ""
            }
          >
            Team
          </button>

          <button>
            Password
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={
              activeTab === "notifications"
                ? "bg-slate-800 text-white px-5 py-2 rounded-lg"
                : ""
            }
          >
            Notification
          </button>
        </div>

        {activeTab === "team" && (
          <>
            <TeamInviteForm
              onInviteSent={handleInviteSent}
              onTeamMemberAdded={handleTeamMemberAdded}
            />

            <div className="bg-white p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">
                Team members
              </h2>

              <div className="mb-4 px-2">
                <div className="grid grid-cols-[40px_1fr_120px_100px] text-sm text-gray-400 font-medium">
                  <div>
                    <input type="checkbox" />
                  </div>

                  <p>Name</p>

                  <p>Role</p>

                  <div></div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {teamMembers.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No team members found
                  </p>
                ) : (
                  teamMembers.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      email={member.email}
                      role={member.role}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <NotificationsList
            refreshTrigger={refreshNotifications}
          />
        )}
      </section>
    </main>
  );
}