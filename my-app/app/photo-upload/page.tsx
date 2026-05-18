
export default function PhotoUploadPage() {
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
          />
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-500 font-semibold">
            Cancel
          </button>

          <button className="btn">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}