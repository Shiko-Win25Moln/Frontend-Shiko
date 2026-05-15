"use client";

import { useState } from "react";

export default function TeamInviteForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleInvite() {
    if (!email) {
      setMessage("Please enter an email");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:7180/api/Invitations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          id: 0,
          email: email,
          status: "Pending",
        }),
        }
      );

      if (response.ok) {
        setMessage(`Invitation sent to ${email}`);
        setEmail("");
      } else {
        setMessage("Failed to send invitation");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        Invite team member
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded w-80"
        />

        <button
          onClick={handleInvite}
          className="bg-orange-500 text-white px-6 py-3 rounded"
        >
          Send Invite
        </button>
      </div>

      <p className="mt-3 text-sm font-medium">
        + Add another
      </p>

      {message && (
        <p className="mt-4 text-sm text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}