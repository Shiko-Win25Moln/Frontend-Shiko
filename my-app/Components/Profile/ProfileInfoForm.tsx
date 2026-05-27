"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
};

export default function ProfileInfoForm() {
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
       const response = await fetch(
  "https://localhost:7084/GetAllProfiles",
  {
    headers: {
      "X-API-KEY": "ProfileInfoSecretKey2026",
    },
  }
);

if (!response.ok) {
  throw new Error("Failed to load profile");
}

const data: Profile[] = await response.json();

if (data.length > 0) {
  setProfile(data[0]);
}

        if (data.length > 0) {
          setProfile(data[0]);
        }
      } catch (error) {
        setMessage("Could not load profile.");
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const url =
        profile.id === 0
          ? "https://localhost:7084/AddProfile"
          : `https://localhost:7084/Profiles/${profile.id}`;

      const method = profile.id === 0 ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "ProfileInfoSecretKey2026",
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setMessage("Profile saved successfully!");
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
        <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">
          Cancel
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>

      {message && (
        <p className="mt-4 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}
