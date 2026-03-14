"use client";

export default function AnalysisResult(){

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Analysis Result
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold">Match Score</h3>
          <p className="text-2xl text-blue-600">--</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold">Missing Skills</h3>
          <p>--</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold">Suggestions</h3>
          <p>--</p>
        </div>

      </div>

    </div>

  );

}