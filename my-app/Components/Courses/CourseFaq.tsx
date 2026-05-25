"use client";

import { useState } from "react";

type CourseFaq = {
    id: number;
    courseId: number;
    question: string;
    answer: string;
}

type CourseFaqAccordion = {
    faqs: CourseFaq[];
}

const CourseFaq = ({ faqs }: CourseFaqAccordion) => {
    const [openFaqId, setOpenFaqId] = useState<number | null>(
        faqs.length > 0 ? faqs[0].id : null
    );

    function handleToggleFaq(faqId: number) {
        setOpenFaqId((currentOpenFaqId) => currentOpenFaqId === faqId ? null : faqId);
    };

    if (faqs.length === 0) {
        return (
        <p className="rounded-2xl bg-[#F7F7F8] p-5 text-sm text-[#8A8A8A]">
            No FAQs available for this course yet.
        </p>
        );
    }

    return (
    <div className="mt-4 space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openFaqId === faq.id;

        return (
          <div key={faq.id} className="rounded-2xl bg-[#F7F7F8] p-5">
            <button
              type="button"
              onClick={() => handleToggleFaq(faq.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <h3 className="text-sm font-semibold text-[#252B42]">
                {index + 1}. {faq.question}
              </h3>

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#A0A0A0]">
                {isOpen ? "-" : "+"}
              </span>
            </button>

            {isOpen && (
              <p className="mt-3 text-sm leading-6 text-[#8A8A8A]">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CourseFaq