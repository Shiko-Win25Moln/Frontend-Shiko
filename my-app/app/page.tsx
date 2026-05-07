import TeamMemberCard from "@/Components/Team/TeamMemberCard";
import TeamInviteForm from "@/Components/Team/TeamInviteForm";
import TeamSidebar from "@/Components/Team/TeamSidebar";

export default function Home() {
  const teamMembers = [
    {
      name: "Samantha William",
      email: "samantha@gmail.com",
      role: "Student",
    },
    {
      name: "Adam Smith",
      email: "adamsmith@gmail.com",
      role: "Student",
    },
    {
      name: "Deven Lane",
      email: "info@devenlane.com",
      role: "Student",
    },
    {
      name: "Annette Black",
      email: "account@annette.com",
      role: "Student",
    },
  ];

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

          <div className="flex flex-col gap-4">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.email}
                name={member.name}
                email={member.email}
                role={member.role}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}