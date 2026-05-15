import Image from "next/image";

const achievements = [
  "/images/achievements/A1.svg",
  "/images/achievements/A2.svg",
  "/images/achievements/A3.svg",
  "/images/achievements/A4.svg",
  "/images/achievements/A5.svg",
];

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <section className="max-w-sm">
        <h1 className="mb-4 text-xl font-semibold">
          Achievements
        </h1>

        <div className="flex gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4ED] shadow-sm"
            >
              <Image
                src={achievement}
                alt="Achievement badge"
                width={28}
                height={28}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}