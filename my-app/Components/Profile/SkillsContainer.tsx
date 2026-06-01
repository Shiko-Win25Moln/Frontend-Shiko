"use client";

import React, { useEffect, useState } from "react";
import Skill from "../Tag/Tag";

type SkillType = {
  id: number;
  name: string;
};
function SkillsContainer() {
  useEffect(() => {
    getSkills();
  }, []);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);

  const getSkills = async () => {
    try {
      const response = await fetch(
        "https://shikoskillsapi.azurewebsites.net/GetAllSkills",
      );

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("DATA:", data);

      setSkills(data);
    } catch (error) {
      console.log("FEL:", error);
    }
  };

  return (
    <div className="font-bold text-2xl">
      Skills
      <div className="flex flex-wrap gap-2 pt-3 pb-3">
        {selectedSkills.map((skill) => (
          <Skill key={skill.id} id={skill.id} name={skill.name} />
        ))}
        {showDropdown && (
          <div className="border rounded p-2 bg-white">
            {skills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => {
                  setSelectedSkills((prev) => [...prev, skill]);
                  setShowDropdown(false);
                }}
                className="cursor-pointer hover:bg-gray-100 p-1"
              >
                {skill.name}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SkillsContainer;
