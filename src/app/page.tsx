"use client";
import { useState } from "react";
import LoginPage from "./login/page";
import VerifyPage from "./verify-otp/page";
import { AuthProvider } from "./contexts/auth.context";

export default function Home() {
  const [otpLogin, setOtpLogin] = useState(false);
  const [optSubmitted, setOptSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div>
      {otpLogin && optSubmitted ? (
        <VerifyPage email={email} />
      ) : (
        <LoginPage
          email={email}
          setEmail={setEmail}
          optLogin={otpLogin}
          setOptLogin={setOtpLogin}
          setOptSubmitted={setOptSubmitted}
        />
      )}
    </div>
  );
}
