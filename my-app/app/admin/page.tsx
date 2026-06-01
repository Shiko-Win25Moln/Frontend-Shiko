import AdminCreatePanel from "@/Components/Admin/AdminCreatePanel";

const page = () => {
  return (
    <main className="min-h-screen bg-[#F8F8F8] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-semibold text-orange-500">
          Admin
        </p>

        <h1 className="text-4xl font-bold text-[#252B42]">
          Admin dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-[#8A8A8A]">
          Create courses, course authors, FAQs, skills and achievements.
        </p>

        <AdminCreatePanel />
      </div>
    </main>
  )
}

export default page