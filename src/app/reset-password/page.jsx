"use client";
import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";

export default function Page() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", color: "#6b7280" }}>
        Loading...
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}