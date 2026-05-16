"use client";

import { useEffect, useState } from "react";
import TeamMemberCard from "@/Components/Team/TeamMemberCard";
import TeamInviteForm from "@/Components/Team/TeamInviteForm";
import TeamSidebar from "@/Components/Team/TeamSidebar";
import NotificationsList from "@/Components/Team/NotificationsList";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Home() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("http://localhost:5212/api/TeamMembers")
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error("Error fetching team members:", error));
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-100 text-slate-900">
      <TeamSidebar />

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6">Team</h1>

        <div className="flex gap-8 mb-8 text-sm text-gray-500">
          <p>General</p>

          <p className="bg-slate-800 text-white px-5 py-2 rounded-lg">
            Team
          </p>

          <p>Password</p>

          <p>Notification</p>
        </div>

        <TeamInviteForm />

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
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                email={member.email}
                role={member.role}
              />
            ))}
          </div>
        </div>

        <NotificationsList />
      </section>
    </main>
  );
}