import Link from "next/link";
import TeamSidebar from "@/Components/Team/TeamSidebar";

const page = () => {
  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <div className="flex">
        <TeamSidebar />

        <section className="flex-1 px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="mb-2 text-sm font-semibold text-primary">
                Dashboard
              </p>

              <h1 className="text-4xl font-bold text-secondary">
                Welcome to Shiko
              </h1>

              <p className="mt-4 max-w-2xl text-light-text">
                Manage your learning, explore courses and keep track of your
                progress in one place.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-secondary">
                  Explore courses
                </h2>

                <p className="mt-3 text-sm leading-6 text-light-text">
                  Browse available courses and find the right learning path for
                  your goals.
                </p>

                <Link
                  href="/courses"
                  className="btn mt-6"
                >
                  View courses
                </Link>
              </article>

              <article className="rounded-3xl bg-white p-6 shadow-sm">


                <h2 className="text-xl font-bold text-secondary">
                  Meet the team
                </h2>

                <p className="mt-3 text-sm leading-6 text-light-text">
                  See the people behind the platform and learn more about the
                  team structure.
                </p>

                <Link
                  href="/team"
                  className="btn mt-6"
                >
                  View team
                </Link>
              </article>

              <article className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-secondary">
                  Your profile
                </h2>

                <p className="mt-3 text-sm leading-6 text-light-text">
                  Manage your profile information and prepare your personal
                  learning area.
                </p>

                <Link
                  href="/profile"
                  className="btn mt-6"
                >
                  Go to profile
                </Link>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default page