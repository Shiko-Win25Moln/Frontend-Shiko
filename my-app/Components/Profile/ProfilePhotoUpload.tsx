"use client";

import { useEffect, useState } from "react";

const PHOTO_UPLOAD_API_URL = "https://photoupload-webapp.azurewebsites.net";
const PROFILE_API_URL = "https://profileinfo-webapp.azurewebsites.net";
const ACHIEVEMENTS_API_URL = "https://achievements-webapp.azurewebsites.net";

const TEST_USER_ID = "101c140c-df61-44a7-9ccd-48c24a25a670";
const PROFILE_API_KEY = "ProfileInfoSecretKey2026";
const PHOTO_API_KEY = "PhotoUploadSecretKey2026";

type Profile = {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
  photoUrl: string;
};

export default function ProfilePhotoUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${PROFILE_API_URL}/GetAllProfiles`, {
          headers: {
            "X-API-KEY": PROFILE_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load profile.");
        }

        const data: Profile[] = await response.json();

        const currentUserProfile = data.find(
          (profile) => profile.userId === TEST_USER_ID
        );

        if (currentUserProfile) {
          setProfile(currentUserProfile);
          setUploadedImageUrl(currentUserProfile.photoUrl || "");
        }
      } catch (error) {
        setMessage("Could not load profile photo.");
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose a file first.");
      return;
    }

    if (!profile) {
      setMessage("Profile must be created before uploading a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const uploadResponse = await fetch(`${PHOTO_UPLOAD_API_URL}/UploadPhoto`, {
        method: "POST",
        headers: {
          "X-API-KEY": PHOTO_API_KEY,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        setMessage("Upload failed.");
        return;
      }

      const uploadData = await uploadResponse.json();
      const photoUrl = uploadData.url;

      const updatedProfile = {
        ...profile,
        photoUrl,
      };

      const savePhotoResponse = await fetch(
        `${PROFILE_API_URL}/Profiles/${profile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": PROFILE_API_KEY,
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!savePhotoResponse.ok) {
        setMessage("Photo uploaded, but could not save it to profile.");
        return;
      }

      setProfile(updatedProfile);
      setUploadedImageUrl(photoUrl);
      setMessage("Photo uploaded successfully!");

      const achievementsResponse = await fetch(
        `${ACHIEVEMENTS_API_URL}/profiles/${profile.id}/achievements`
      );

      if (achievementsResponse.ok) {
        const achievements = await achievementsResponse.json();

        const hasPhotoAchievement = achievements.some(
          (achievement: { name: string }) =>
            achievement.name === "Profile Photo Uploaded"
        );

        if (!hasPhotoAchievement) {
          await fetch(`${ACHIEVEMENTS_API_URL}/AddAchievement`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileId: profile.id,
              name: "Profile Photo Uploaded",
            }),
          });
        }
      }
    } catch (error) {
      setMessage("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        {uploadedImageUrl ? (
          <img
            src={uploadedImageUrl}
            alt="Uploaded profile"
            className="h-16 w-16 rounded-full object-cover border"
          />
        ) : (
          <div className="h-16 w-16 rounded-xl border bg-gray-50 flex items-center justify-center text-gray-400">
            👤
          </div>
        )}

        <div>
          <input
            id="profile-photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          <label
            htmlFor="profile-photo-upload"
            className="inline-block cursor-pointer rounded-md border px-4 py-2 text-sm font-medium"
          >
            Upload photo
          </label>

          {selectedFile && (
            <button
  onClick={handleUpload}
  className="btn ml-3"
>
  Save photo
</button>
          )}
        </div>
      </div>

      {message && (
        <p className="mt-3 text-sm font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}