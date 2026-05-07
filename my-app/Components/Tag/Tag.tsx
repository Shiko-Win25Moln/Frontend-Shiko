type SkillProps = 
{
    id: number;
    name: string;
}

export default function Skill({name}: SkillProps) {
    return (
       <span className="w-[100px] h-[30px] flex items-center justify-center rounded-full bg-bg text-[16px] text-light-text border-1">
  {name}
</span>
    )
}