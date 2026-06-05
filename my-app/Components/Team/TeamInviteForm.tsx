"use client";

import { useState } from "react";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type TeamInviteFormProps = {
  onInviteSent: (email: string) => void;
  onTeamMemberAdded: (member: TeamMember) => void;
};

const INVITATIONS_API_URL =
  "https://teaminvitationswebapi20260524113439-dfbreeduc6gteegu.swedencentral-01.azurewebsites.net";

const TEAM_MEMBERS_API_URL =
  "https://teammemberswebapi20260524090131-etfebsb9dpgwephm.swedencentral-01.azurewebsites.net";

const NOTIFICATIONS_API_URL =
  "https://notificationswebapi20260524114831-hsgeh6g3g9f0hccj.swedencentral-01.azurewebsites.net";

export default function TeamInviteForm({
  onInviteSent,
  onTeamMemberAdded,
}: TeamInviteFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleInvite() {
    if (!email.trim()) {
      setMessage("Please enter an email");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email");
      return;
    }

    setIsSending(true);
    setMessage("");

    try {
      const invitationResponse = await fetch(
        `${INVITATIONS_API_URL}/api/Invitations`,
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

      if (!invitationResponse.ok) {
        setMessage("Failed to send invitation");
        return;
      }

      const newMemberResponse = await fetch(
        `${TEAM_MEMBERS_API_URL}/api/TeamMembers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 0,
            name: email.split("@")[0],
            email: email,
            role: "Student",
          }),
        }
      );

      if (!newMemberResponse.ok) {
        setMessage("Invitation sent, but member was not added");
        return;
      }

      const newMember = await newMemberResponse.json();

      await fetch(`${NOTIFICATIONS_API_URL}/api/Notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          title: "Invitation sent",
          message: `Invitation sent to ${email}.`,
          isRead: false,
        }),
      });

      onTeamMemberAdded(newMember);
      onInviteSent(email);

      setMessage(`Invitation sent to ${email}`);
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setIsSending(false);
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
            Get your study group up and running faster by inviting your team to
            collaborate.
          </p>
        </div>

        <div className="flex-1">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 p-3 rounded-lg w-full"
            />

            <button
              onClick={handleInvite}
              disabled={isSending}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-6 py-3 rounded-lg whitespace-nowrap"
            >
              {isSending ? "Sending..." : "Send Invite"}
            </button>
          </div>


          {message && (
            <p className="mt-4 text-sm text-green-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}