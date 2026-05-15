export default function ProfilePage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            First name
          </label>

          <input
            type="text"
            placeholder="Enter first name"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Last name
          </label>

          <input
            type="text"
            placeholder="Enter last name"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Phone number
          </label>

          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            placeholder="Write something..."
            className="w-full border border-gray-300 rounded-lg p-3 h-40"
          />
        </div>

       <div className="flex gap-4">
  <button
    className="px-6 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold"
  >
    Cancel
  </button>

  <button className="btn">
    Save
  </button>
</div>
      </div>
    </div>
  );
}