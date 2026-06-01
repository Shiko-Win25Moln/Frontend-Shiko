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

              
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <article className="rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-secondary">
                  Start your learning journey
                </h2>

                <p className="mt-3 text-sm leading-6 text-light-text">
                  Create an account to explore courses, follow your progress and access your personal learning area.
                </p>

                <Link
                  href="/auth/sign-in"
                  className="btn mt-6"
                >
                  Sign Up
                </Link>
              </article>

              <article className="rounded-3xl bg-white p-6 shadow-sm">


                <h2 className="text-xl font-bold text-secondary">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-light-text">
                  Sign in to continue learning, manage your courses and pick up where you left off.
                </p>

                <Link
                  href="/auth/login"
                  className="btn mt-6"
                >
                  Sign In
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