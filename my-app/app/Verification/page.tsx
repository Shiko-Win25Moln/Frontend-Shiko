"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [error, setError] = useState("");

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];

    updated[index] = value;

    setCode(updated);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const verifyCode = async () => {
    setError("");

    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter all digits");
      return;
    }

    try {
      const email = localStorage.getItem("verificationEmail");
      if (!email) {
        setError("no Email Found");
        return;
      }

      const response = await fetch(
        "https://shikoverificationapi.azurewebsites.net/api/email-verification/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        },
      );

      if (response.ok) {
        router.push("/auth/almost-there");
        return;
      }

      setError("Invalid verification code");
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2">
        <img
          src="/images/verification/ShikoBG.svg"
          alt=""
          className="
          w-3/4
          py-5
          pl-5
          "
        />
      </div>

      <div
        className="w-1/2 flex
        items-center
        justify-center
        min-h-screen
        "
      >
        <div>
          <h1
            className="
            text-6xl
            font-bold
            "
          >
            Verification Needed
          </h1>

          <p
            className="
            w-[600px]
            mb-15
            pt-5
            text-gray-500
            "
          >
            Please verify your account with the verification code that has been
            sent to your specified email address.
          </p>

          <label
            className="
            font-bold
            text-3xl
            "
          >
            Enter your Verification Code
          </label>

          <div
            className="
            flex
            gap-5
            mt-5
            mb-6
            "
          >
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                className="
                    w-20
                    h-20
                    border
                    rounded-xl
                    text-center
                    text-5xl
                    outline-none
                    "
              />
            ))}
          </div>

          {error && (
            <p
              className="
                text-red-500
                mb-4
                "
            >
              {error}
            </p>
          )}

          <button
            onClick={verifyCode}
            className="
            bg-[#ED5735]
            py-4
            w-[600px]
            rounded-xl
            text-white
            font-semibold
            mt-10
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
