import Image from "next/image";

type TeamMemberCardProps = {
  id: number;
  name: string;
  email: string;
  role: string;
  onDelete: (id: number) => void;
};

export default function TeamMemberCard({
  id,
  name,
  email,
  role,
  onDelete,
}: TeamMemberCardProps) {

  function getAvatar() {
    if (name.includes("Samantha")) {
      return "/images/authors/samantha.svg";
    }

    if (name.includes("Adam")) {
      return "/images/authors/adam.svg";
    }

    if (name.includes("Deven")) {
      return "/images/authors/johnny.svg";
    }

    if (name.includes("Annette")) {
      return "/images/authors/hasan.svg";
    }

    return "/images/authors/jasmin.svg";
  }

  return (
    <div className="grid grid-cols-[40px_1fr_120px_100px] items-center bg-gray-50 rounded-xl px-4 py-3">

      <input type="checkbox" />

      <div className="flex items-center gap-4">
        <Image
          src={getAvatar()}
          alt={name}
          width={44}
          height={44}
          className="rounded-full"
        />

        <div>
          <h3 className="font-semibold text-gray-900">
            {name}
          </h3>

          <p className="text-sm text-gray-400">
            {email}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        {role}
      </p>

      <button
        onClick={() => onDelete(id)}
        className="text-sm font-medium text-gray-700 hover:text-red-500"
      >
        Delete
      </button>
    </div>
  );
}