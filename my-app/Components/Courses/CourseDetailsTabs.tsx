"use client";

import { useState } from "react";
import CourseFaq from "./CourseFaq";

type CourseFaqType = {
    id: number;
    courseId: number;
    question: string;
    answer: string;
};

type CourseDetailsTabsProps = {
    faqs: CourseFaqType[];
};

const CourseDetailsTabs = ({ faqs }: CourseDetailsTabsProps) => {
    const [activeTab, setActiveTab] = useState<"faqs">("faqs");
  return (
    <section className="mt-8">
        <div className="flex gap-2">
            <button
                type="button"
                onClick={() => setActiveTab("faqs")}
                className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    activeTab === "faqs"
                    ? "bg-[#252B42] text-white"
                    : "bg-[#F2F2F2] text-[#AAAAAA]"
                }`}
                >
                FAQs
            </button>
        </div>
        <div className="mt-4">
            {activeTab === "faqs" && <CourseFaq faqs={faqs} />}
        </div>
    </section>
  )
}

export default CourseDetailsTabs