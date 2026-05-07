export default function TeamInviteForm() {
  return (
    <div className="bg-white p-6 rounded-xl mb-10">
      <h2 className="text-2xl font-semibold mb-4">
        Invite team member
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="name@example.com"
          className="border p-3 rounded w-80"
        />

        <button className="bg-orange-500 text-white px-6 py-3 rounded">
          Send Invite
        </button>
      </div>

      <p className="mt-3 text-sm font-medium">
        + Add another
      </p>
    </div>
  );
}