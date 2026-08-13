"use client";

import { useState } from "react";
import { uploadResume } from "@/services/api";

export default function ResumeUpload() {

  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    if (!file) {
      alert("Select file first");
      return;
    }

    try {
      const res = await uploadResume(
        file,
        localStorage.getItem("userId")
      );

      console.log("✅ Upload success:", res);
      alert("Resume uploaded");

    } catch (err) {
      console.error("❌ Upload error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        className="mb-4"
        accept=".pdf,.docx"
        onChange={(e) => {
          console.log("📂 Selected:", e.target.files[0]); // DEBUG
          setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Resume
      </button>

    </div>
  );
}