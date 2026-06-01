"use client";

import { useEffect, useState } from "react";

const PROFILE_API_URL = "https://profileinfo-webapp.azurewebsites.net";
const API_KEY = "ProfileInfoSecretKey2026";

type Profile = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
  photoUrl: string | null;
};

type ProfileInfoFormProps = {
  userId: string;
};

export default function ProfileInfoForm({ userId }: ProfileInfoFormProps) {
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    userId: userId,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
    photoUrl: "",
  });

  const [message, setMessage] = useState("");

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
          (profile) => profile.userId === userId
        );

        if (currentUserProfile) {
          setProfile(currentUserProfile);
        } else {
          setProfile({
            id: 0,
            userId: userId,
            firstName: "",
            lastName: "",
            phoneNumber: "",
            description: "",
            photoUrl: "",
          });
        }
      } catch (error) {
        setMessage("Could not load profile.");
        console.error(error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      const profileToSave = {
        ...profile,
        userId: userId,
      };

      const url =
        profile.id === 0
          ? `${PROFILE_API_URL}/AddProfile`
          : `${PROFILE_API_URL}/Profiles/${profile.id}`;

      const method = profile.id === 0 ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify(profileToSave),
      });

      if (response.ok) {
        setMessage("Profile saved successfully!");

        if (method === "POST") {
          const createdProfile: Profile = await response.json();
          setProfile(createdProfile);
        }
      } else {
        setMessage("Could not save profile.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">First name *</label>

        <input
          type="text"
          value={profile.firstName}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
          placeholder="Enter first name"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Last name *</label>

        <input
          type="text"
          value={profile.lastName}
          onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })
          }
          placeholder="Enter last name"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Phone number</label>

        <input
          type="text"
          value={profile.phoneNumber}
          onChange={(e) =>
            setProfile({ ...profile, phoneNumber: e.target.value })
          }
          placeholder="Enter phone number"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold">Description</label>

        <textarea
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          placeholder="Write something..."
          className="w-full border border-gray-300 rounded-lg p-3 h-40"
        />
      </div>

      <div className="flex gap-4">
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>

      {message && <p className="mt-4 font-semibold">{message}</p>}
    </div>
  );
}