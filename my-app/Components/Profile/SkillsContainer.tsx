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
    getProfile();
  }, []);
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>([]);
  const PROFILE_API_URL = "https://profileinfo-webapp.azurewebsites.net";
  const TEST_USER_ID = "101c140c-df61-44a7-9ccd-48c24a25a670";
  const API_KEY = "ProfileInfoSecretKey2026";

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
      console.log("Wrong:", error);
    }
  };

  const getUserSkills = async (profileId: number) => {
    try {
      const response = await fetch(
        `https://shikoskillsapi.azurewebsites.net/UserSkills/${profileId}`,
      );

      const data = await response.json();

      setSelectedSkills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${PROFILE_API_URL}/GetAllProfiles`, {
        headers: {
          "X-API-KEY": API_KEY,
        },
      });

      const profiles = await response.json();

      const currentUserProfile = profiles.find(
        (profile: any) => profile.userId === TEST_USER_ID,
      );

      if (currentUserProfile) {
        setProfileId(currentUserProfile.id);

        getUserSkills(currentUserProfile.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeSkill = async (skillId: number) => {
    if (!profileId) return;

    try {
      const respone = await fetch(
        `https://shikoskillsapi.azurewebsites.net/userSkilss/${profileId}/${skillId}`,
        {
          method: "DELETE",
        },
      );

    
      if (respone.ok) {
        setSelectedSkills((prev) =>
          prev.filter((skill) => skill.id !== skillId),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-bold text-2xl">
      Skills
      <div className="flex flex-wrap gap-2 pt-3 pb-3">
        {selectedSkills.map((skill) => (
          <div key={skill.id} className="gap-1">
            <Skill id={skill.id} name={skill.name} />

            <button
              onClick={() => removeSkill(skill.id)}
              className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
        {showDropdown && (
          <div className="border rounded p-2 bg-white">
            {skills.map((skill) => (
              <div
                key={skill.id}
                onClick={async () => {
                  if (!profileId) return;

                  try {
                    await fetch(
                      "https://shikoskillsapi.azurewebsites.net/AddUserSkill",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          profileId: profileId,
                          skillId: skill.id,
                        }),
                      },
                    );

                    setSelectedSkills((prev) => [...prev, skill]);
                    setShowDropdown(false);
                  } catch (error) {
                    console.log(error);
                  }
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
