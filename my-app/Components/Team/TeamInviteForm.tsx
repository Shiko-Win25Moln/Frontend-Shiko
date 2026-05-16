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
        "http://localhost:5212/api/Invitations",
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
    <div className="bg-white p-8 rounded-2xl mb-10">
      
      <div className="flex justify-between gap-10">
        
        <div className="max-w-xs">
          <h2 className="text-2xl font-semibold mb-2">
            Invite team member
          </h2>

          <p className="text-sm text-gray-400">
            Get your study group up and running faster by
            inviting your team to collaborate.
          </p>
        </div>

        <div className="flex-1">
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 p-3 rounded-lg w-full"
            />

            <button
              onClick={handleInvite}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg whitespace-nowrap"
            >
              Send Invite
            </button>
          </div>

          <p className="mt-4 text-sm font-medium">
            + Add another
          </p>

          {message && (
            <p className="mt-4 text-sm text-green-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}