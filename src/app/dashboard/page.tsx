"use client";
import React, { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>this is the dashboard!</h1>
    </div>
  );
};

export default DashboardPage;
