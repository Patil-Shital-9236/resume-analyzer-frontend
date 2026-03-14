"use client";

import { useState } from "react";
import { runFullAnalysis } from "@/services/api";

export default function JobDescriptionInput(){

  const [jd,setJD] = useState("");

  const analyze = async () => {

    const data = {

      userId: localStorage.getItem("userId"),
      jobDescription: jd

    };

    const res = await runFullAnalysis(data);

    console.log(res);

    alert("Analysis completed");

  };

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Paste Job Description
      </h2>

      <textarea
        rows="6"
        className="border w-full p-3 rounded"
        placeholder="Paste Job Description here..."
        onChange={(e)=>setJD(e.target.value)}
      />

      <button
        onClick={analyze}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Run Analysis
      </button>

    </div>

  );

}