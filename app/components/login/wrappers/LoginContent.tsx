// components/LoginContent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoginWrapper from "./LoginWrapper";

const LoginContent = () => {
  const searchParams = useSearchParams();
  const verificationCode = searchParams.get("verificationCode");

  return <LoginWrapper verificationCode={verificationCode} />;
};

export default LoginContent;
