import CourseList from "@/Components/Courses/CourseList";

const courses = () => {
  return (
    <main className="min-h-screen bg-[#F8F8F8] px-6 py-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold text-primary">Courses</p>

          <h1 className="text-4xl font-bold text-secondary">
            Explore our courses
          </h1>

          <p className="mt-4 max-w-2xl text-light-text">
            Browse available courses and find the right learning path for you.
          </p>
        </div>

        <CourseList />
      </section>
    </main>
  )
}

export default courses