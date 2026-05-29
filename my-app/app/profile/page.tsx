"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/Components/Team/TeamSidebar";
import ProfilePhotoUpload from "@/Components/Profile/ProfilePhotoUpload";
import ProfileInfoForm from "@/Components/Profile/ProfileInfoForm";
import AchievementBadges from "@/Components/Profile/AchievementBadges";

const PROFILE_API_URL = "https://profileinfo-webapp.azurewebsites.net";
const TEST_USER_ID = "101c140c-df61-44a7-9ccd-48c24a25a670";
const API_KEY = "ProfileInfoSecretKey2026";

type Profile = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${PROFILE_API_URL}/GetAllProfiles`, {
          headers: {
            "X-API-KEY": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data: Profile[] = await response.json();

        const currentUserProfile = data.find(
          (profile) => profile.userId === TEST_USER_ID
        );

        if (currentUserProfile) {
          setProfile(currentUserProfile);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const fullName =
    profile && (profile.firstName || profile.lastName)
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "No profile name yet";

  return (
    <div className="flex min-h-screen bg-background">
     <div className="shrink-0">
  <Sidebar />
</div>

      <main className="flex-1 p-8 text-foreground">
        <h1 className="mb-6 text-3xl font-bold">Profile</h1>

        <div className="grid grid-cols-[280px_1fr] gap-8">
          <aside className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-6 flex h-28 items-center justify-center rounded-xl bg-slate-900 text-4xl text-white">
              👤
            </div>

            <h2 className="text-center font-semibold">
              {fullName}
            </h2>

            <p className="mb-6 text-center text-xs text-orange-500">
  Profile information
</p>

<AchievementBadges />
</aside>

          <section className="rounded-2xl bg-white p-8 shadow-sm">
            <ProfilePhotoUpload />
            <ProfileInfoForm />
          </section>
        </div>
      </main>
    </div>
  );
}