import TeamMemberCard from "@/Components/Team/TeamMemberCard";

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
      <aside className="w-64 bg-white p-6">
        <h1 className="text-3xl font-bold mb-10">Shiko</h1>

        <nav className="flex flex-col gap-4 text-sm">
          <p>Dashboard</p>
          <p>Courses</p>
          <p>Calendar</p>
          <p>Live Class</p>

          <div className="mt-10 flex flex-col gap-4">
            <p>Profile</p>
            <p className="text-orange-500 font-bold">Team</p>
            <p>Settings</p>
          </div>
        </nav>
      </aside>

      <section className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-10">Team</h1>

        <div className="bg-white p-6 rounded-xl mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Invite team member
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="name@example.com"
              className="border p-3 rounded w-80"
            />

            <button className="bg-orange-500 text-white px-6 py-3 rounded">
              Send Invite
            </button>
          </div>

          <p className="mt-3 text-sm font-medium">+ Add another</p>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Team members</h2>

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