"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../contexts/auth.context";

const VerifyPage = (props: { email: string }) => {
  const [opt, setOpt] = useState("");

  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login-with-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.email,
        opt,
      }),
    });
    const result = await response.json();

    if (result.access_token) {
      login(result.access_token);
      router.push("/dashboard");
    } else {
      setError(result);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitForm}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Code sent to your email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="opt"
            type="text"
            placeholder="Enter code"
            value={opt}
            onChange={(e) => setOpt(e.target.value)}
          />
        </div>

        <div>{error && <p className="text-red-500 mb-2">{error}</p>}</div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;
