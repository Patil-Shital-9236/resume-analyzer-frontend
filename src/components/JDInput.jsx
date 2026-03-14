"use client";

import { useState } from "react";
import { uploadResume } from "@/services/api";

export default function ResumeUpload(){

  const [file,setFile] = useState(null);

  const handleUpload = async () => {

    const formData = new FormData();

    formData.append("resume",file);
    formData.append("userId",localStorage.getItem("userId"));

    const res = await uploadResume(formData);

    console.log(res);

    alert("Resume uploaded");
  };

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Upload Resume
      </button>

    </div>
  );
}