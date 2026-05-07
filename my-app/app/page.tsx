export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-10">Team</h1>

      <section className="mb-10">
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
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Team members
        </h2>

        <div className="border p-4 rounded mb-4">
          <p className="font-bold">Samantha William</p>
          <p>samantha@gmail.com</p>
          <p>Student</p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-bold">Adam Smith</p>
          <p>adamsmith@gmail.com</p>
          <p>Student</p>
        </div>
      </section>
    </main>
  );
}