import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export const analyzeResume = (file, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", file);
  if (jobDescription) formData.append("jobDescription", jobDescription);

  return api.post("/resumes/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getResumeHistory = () => api.get("/resumes");
export const getResumeById = (id) => api.get(`/resumes/${id}`);
export const deleteResume = (id) => api.delete(`/resumes/${id}`);

export default api;
