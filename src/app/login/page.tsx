"use client";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../contexts/auth.context";

const LoginPage = ({
  email,
  setEmail,
  optLogin,
  setOptLogin,
  setOptSubmitted,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  optLogin: boolean;
  setOptLogin: Dispatch<SetStateAction<boolean>>;
  setOptSubmitted: Dispatch<SetStateAction<boolean>>;
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const toggleOtpLogin = () => {
    setOptLogin(!optLogin);
    error && setError(null);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (optLogin) {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setOptSubmitted(true);
      } else {
        setError(result.message);
      }
    } else {
      if (
        !password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
      ) {
        setError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password,
        }),
      });

      const result = await response.json();

      if (result.access_token) {
        login(result.access_token);
        router.push("/dashboard");
      }
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
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        {!optLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <div>{error && <p className="text-red-500 mb-2">{error}</p>}</div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="bg-white hover:bg-black-600 text-black font-bold py-2 px-4 rounded border-black border-2"
            type="button"
            onClick={toggleOtpLogin}
          >
            {!optLogin ? "OTP Login" : "Email Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
