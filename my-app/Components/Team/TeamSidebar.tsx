import Link from "next/link";


export default function TeamSidebar() {
  return (
    <aside className="w-64 bg-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-10">Shiko</h1>

      <nav className="flex flex-col gap-3 text-sm">
        <Link
          href="/"
          className="px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          Dashboard
        </Link>
    
        <Link
          href={`/courses`}
          className="px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          Courses
        </Link>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={`/profile`}
            className="px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Profile
          </Link>

          <Link
            href={`/team`}
            className="px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Team
          </Link>

          <Link
            href={`/admin`}
            className="px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Admin
          </Link>

          <Link
            href={`/logout`}
            className="px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Log Out
          </Link>
        </div>
      </nav>
    </aside>
  );
}