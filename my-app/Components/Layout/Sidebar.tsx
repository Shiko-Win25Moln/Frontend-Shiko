export default function TeamSidebar() {
  return (
    <aside className="w-64 bg-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-10">Shiko</h1>

      <nav className="flex flex-col gap-3 text-sm">
        <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
          Dashboard
        </p>

        <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
          Courses
        </p>

        <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
          Calendar
        </p>

        <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
          Live Class
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
            Profile
          </p>

          <p className="px-3 py-2 rounded-lg bg-orange-50 text-orange-500 font-bold">
            Team
          </p>

          <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
            Settings
          </p>

          <p className="px-3 py-2 rounded-lg hover:bg-gray-100">
            Help Center
          </p>

          <p className="px-3 py-2 rounded-lg text-orange-500 font-semibold">
            Log Out
          </p>
        </div>
      </nav>
    </aside>
  );
}