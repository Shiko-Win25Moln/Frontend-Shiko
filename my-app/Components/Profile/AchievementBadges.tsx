"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Achievement = {
  id: number;
  profileId: number;
  name: string;
};

const ACHIEVEMENTS_API_URL = "https://achievements-webapp.azurewebsites.net";
const PROFILE_ID = 1;

const achievementImages: Record<string, string> = {
  "First Login": "/images/achievements/A1.svg",
  "First Course": "/images/achievements/A2.svg",
  "Profile Photo Uploaded": "/images/achievements/A3.svg",
  "Completed 5 Courses": "/images/achievements/A4.svg",
  "Top Student": "/images/achievements/A5.svg",
};

export default function AchievementBadges() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `${ACHIEVEMENTS_API_URL}/profiles/${PROFILE_ID}/achievements`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch achievements.");
        }

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
    <section>
      <h2 className="mb-4 text-xl font-semibold">
        Achievements
      </h2>

      <div className="flex flex-wrap gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4ED] shadow-sm"
            title={achievement.name}
          >
            <Image
              src={
                achievementImages[achievement.name] ||
                "/images/achievements/A1.svg"
              }
              alt={achievement.name}
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
  );
}