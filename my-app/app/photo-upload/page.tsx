
"use client";

import { useState } from "react";

export default function PhotoUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://localhost:7210/UploadPhoto",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage("Photo uploaded successfully!");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Upload Profile Photo
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl">
        <p className="text-light-text mb-6">
          Choose a photo to upload as your profile image.
        </p>

        <div className="border-2 border-dashed border-form-border rounded-xl p-10 text-center mb-6">
          <p className="font-semibold mb-2">
            Drag and drop your image here
          </p>

          <p className="text-light-text mb-4">
            or choose a file from your computer
          </p>

          <input
            type="file"
            accept="image/*"
            className="block mx-auto"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">
            Cancel
          </button>

          <button
            className="btn"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>

        {message && (
          <p className="mt-4 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}