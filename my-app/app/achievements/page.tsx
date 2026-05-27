"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Achievement = {
  id: number;
  title: string;
};

const achievementImages = [
  "/images/achievements/A1.svg",
  "/images/achievements/A2.svg",
  "/images/achievements/A3.svg",
  "/images/achievements/A4.svg",
  "/images/achievements/A5.svg",
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          "https://localhost:7286/GetAllAchievements"
        );

        const data = await response.json();

        setAchievements(data);
      } catch (error) {
        setMessage("Could not load achievements.");
        console.error(error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <section className="max-w-sm">
        <h1 className="mb-4 text-xl font-semibold">
          Achievements
        </h1>

        <div className="flex gap-4 flex-wrap">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4ED] shadow-sm"
              title={achievement.title}
            >
              <Image
                src={
                  achievementImages[
                    index % achievementImages.length
                  ]
                }
                alt="Achievement badge"
                width={28}
                height={28}
              />
            </div>
          ))}
        </div>

        {message && (
          <p className="mt-4 font-semibold">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}