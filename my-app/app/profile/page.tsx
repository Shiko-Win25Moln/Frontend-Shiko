import ProfilePhotoUpload from "@/Components/Profile/ProfilePhotoUpload";
import ProfileInfoForm from "@/Components/Profile/ProfileInfoForm";
import AchievementBadges from "@/Components/Profile/AchievementBadges";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="mb-6 text-3xl font-bold">Profile</h1>

      <div className="mb-8 flex gap-10 text-sm">
        <button className="rounded-lg bg-slate-800 px-5 py-2 text-white">
          General
        </button>
        <button className="text-gray-400">Team</button>
        <button className="text-gray-400">Password</button>
        <button className="text-gray-400">Notification</button>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-8">
        <aside className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-16 h-28 rounded-xl bg-slate-900" />

          <h2 className="text-center font-semibold">
            Hasan Mahmud
          </h2>

          <p className="mb-6 text-center text-xs text-orange-500">
            Student
          </p>

          <AchievementBadges />
        </aside>

        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <ProfilePhotoUpload />
          <ProfileInfoForm />
        </section>
      </div>
    </main>
  );
}









