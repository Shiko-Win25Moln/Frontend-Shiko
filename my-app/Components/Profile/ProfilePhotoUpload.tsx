"use client";

import { useState } from "react";

export default function ProfilePhotoUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Upload photo
      const response = await fetch(
        "https://localhost:7210/UploadPhoto",
        {
          method: "POST",
          headers: {
            "X-API-KEY": "PhotoUploadSecretKey2026",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();

        setUploadedImageUrl(data.url);
        setMessage("Photo uploaded successfully!");

        // Create achievement automatically
        await fetch(
          "https://localhost:7286/AddAchievement",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: "test-achievement-user",
              title: "Profile Photo Uploaded",
              description: "User uploaded their first profile photo",
            }),
          }
        );
      } else {
        setMessage("Upload failed.");
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
            className="ml-3 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white"
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