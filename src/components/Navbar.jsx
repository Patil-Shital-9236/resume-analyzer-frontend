"use client";
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AI Resume Analyzer</h1>
      <div className="flex gap-4">
        <a href="/login" className="hover:underline">Login</a>
        <a href="/register" className="hover:underline">Register</a>
      </div>
    </nav>
  );
}