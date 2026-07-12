import { useState } from "react";
import UploadCard from "./components/UploadCard";
import ResultsDashboard from "./components/ResultsDashboard";
import { analyzeResume } from "./api";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (file, jobDescription) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { data } = await analyzeResume(file, jobDescription);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while scanning your resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-rule bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <h1 className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-ink">
              Resume Scan
            </h1>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-inkfade">
            ATS Analysis Engine
          </span>
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-12">
        {!result && (
          <div className="mb-2 text-center">
            <h2 className="font-mono text-2xl font-bold text-ink sm:text-3xl">
              Will your resume clear the gate?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-inkfade">
              Upload your resume for a full ATS-style audit — parsing
              compatibility, keyword coverage, section structure, and
              concrete fixes.
            </p>
          </div>
        )}

        <UploadCard onAnalyze={handleAnalyze} loading={loading} error={error} />

        {result && (
          <>
            <button
              onClick={() => setResult(null)}
              className="font-mono text-xs uppercase tracking-widest text-inkfade underline underline-offset-4 hover:text-signal"
            >
              ← Scan another resume
            </button>
            <ResultsDashboard result={result} />
          </>
        )}
      </main>

      <footer className="border-t border-rule py-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-inkfade">
          MERN + Claude · Resume Scan
        </p>
      </footer>
    </div>
  );
}
