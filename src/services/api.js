const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default API_BASE;

/* -------------------------
   AUTH
-------------------------- */
export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};

/* -------------------------
   RESUME UPLOAD (FINAL FIX)
-------------------------- */
export const uploadResume = async (fileOrFormData, userId) => {
  if (!fileOrFormData) {
    throw new Error("No file selected");
  }

  let bodyData;
  if (typeof FormData !== "undefined" && fileOrFormData instanceof FormData) {
    bodyData = fileOrFormData;
  } else {
    bodyData = new FormData();
    bodyData.append("resume", fileOrFormData);
    bodyData.append("userId", userId || "");
  }

  try {
    const res = await fetch(`${API_BASE}/api/resume/upload`, {
      method: "POST",
      body: bodyData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Upload backend error:", data);
      throw new Error(data.error || "Upload failed");
    }

    return data;

  } catch (err) {
    console.error("❌ Upload request failed:", err.message);
    throw err;
  }
};

/* -------------------------
   FULL ANALYSIS
-------------------------- */
export const runFullAnalysis = async (data) => {
  const res = await fetch(`${API_BASE}/api/full-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Analysis failed");
  }

  return result;
};