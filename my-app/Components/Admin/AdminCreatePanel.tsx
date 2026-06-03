"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type JwtPayload = {
  role?: string;
  exp?: number;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

function getRole(decoded: JwtPayload) {
  return (
    decoded.role ??
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  );
}

export default function AdminCreatePanel() {
  const [checked, setChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [authorName, setAuthorName] = useState("");
  const [authorImage, setAuthorImage] = useState("");

  const [courseTitle, setCourseTitle] = useState("");
  const [courseImageUrl, setCourseImageUrl] = useState("");
  const [courseAuthorId, setCourseAuthorId] = useState("");

  const [faqCourseId, setFaqCourseId] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const [skillName, setSkillName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setChecked(true);
      return;
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const role = getRole(decoded);

        setIsAdmin(role === "Admin" || role === "Administrator");
    } catch {
    setIsAdmin(false);
    }

    setChecked(true);
  }, []);

  const createAuthor = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/admin/course-authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        authorName,
        authorImage,
      }),
    });

    if (!response.ok) {
      alert("Could not create course author.");
      return;
    }

    alert("Course author created!");
    setAuthorName("");
    setAuthorImage("");
  };

  const createCourse = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: courseTitle,
        imageUrl: courseImageUrl,
        courseAuthorId: Number(courseAuthorId),
      }),
    });

    if (!response.ok) {
      alert("Could not create course.");
      return;
    }

    alert("Course created!");
    setCourseTitle("");
    setCourseImageUrl("");
    setCourseAuthorId("");
  };

  const createFaq = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/admin/course-faqs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId: Number(faqCourseId),
        question: faqQuestion,
        answer: faqAnswer,
      }),
    });

    if (!response.ok) {
      alert("Could not create FAQ.");
      return;
    }

    alert("FAQ created!");
    setFaqCourseId("");
    setFaqQuestion("");
    setFaqAnswer("");
  };

    const createSkill = async () => {
        const response = await fetch("https://shikoskillsapi.azurewebsites.net/AddSkills", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            name: skillName,
            }),
        });

    if (!response.ok) {
        const errorText = await response.text();
        alert(`Could not create skill. Status: ${response.status}. ${errorText}`);
        return;
    }

    alert("Skill created!");
    setSkillName("");
    };

  if (!checked) {
    return <p className="mt-10 text-[#8A8A8A]">Loading...</p>;
  }

  if (!isAdmin) {
    return (
      <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#252B42]">
          Not authorized
        </h2>
        <p className="mt-3 text-[#8A8A8A]">
          You must be an admin to access this page.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-2">
      <article className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#252B42]">
          Create course author
        </h2>

        <div className="mt-6 space-y-4">
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Author name"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <input
            value={authorImage}
            onChange={(e) => setAuthorImage(e.target.value)}
            placeholder="Author image URL"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <button
            onClick={createAuthor}
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Create author
          </button>
        </div>
      </article>

      <article className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#252B42]">
          Create course
        </h2>

        <div className="mt-6 space-y-4">
          <input
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course title"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <input
            value={courseImageUrl}
            onChange={(e) => setCourseImageUrl(e.target.value)}
            placeholder="Course image URL"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <input
            value={courseAuthorId}
            onChange={(e) => setCourseAuthorId(e.target.value)}
            placeholder="Course author id"
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <button
            onClick={createCourse}
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Create course
          </button>
        </div>
      </article>

      <article className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[#252B42]">
          Create FAQ
        </h2>

        <div className="mt-6 space-y-4">
          <input
            value={faqCourseId}
            onChange={(e) => setFaqCourseId(e.target.value)}
            placeholder="Course id"
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <input
            value={faqQuestion}
            onChange={(e) => setFaqQuestion(e.target.value)}
            placeholder="Question"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <textarea
            value={faqAnswer}
            onChange={(e) => setFaqAnswer(e.target.value)}
            placeholder="Answer"
            className="min-h-32 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
          />

          <button
            onClick={createFaq}
            className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Create FAQ
          </button>
        </div>
      </article>
      <article className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#252B42]">
                Create skill
            </h2>

            <div className="mt-6 space-y-4">
                <input
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                placeholder="Skill name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
                />

                <button
                onClick={createSkill}
                className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
                >
                Create skill
                </button>
            </div>
        </article>

      
    </section>
  );
}