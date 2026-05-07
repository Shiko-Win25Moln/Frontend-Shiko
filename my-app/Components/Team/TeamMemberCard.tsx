type TeamMemberCardProps = {
  name: string;
  email: string;
  role: string;
};

export default function TeamMemberCard({
  name,
  email,
  role,
}: TeamMemberCardProps) {
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <p className="font-bold">{name}</p>
        <p>{email}</p>
        <p>{role}</p>
      </div>

      <button className="text-red-500 font-semibold">
        Delete
      </button>
    </div>
  );
}