import { useRef, useState } from "react";

export default function UploadCard({ onAnalyze, loading, error }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(f.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onAnalyze(file, jobDescription);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl border border-rule bg-ledger/60 p-6 shadow-[4px_4px_0_0_#1F2421]"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-inkfade">
          01 — Upload document
        </h2>
        <span className="font-mono text-[10px] text-inkfade">PDF / DOCX · 5MB max</span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex h-40 cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed transition-colors ${
          dragActive ? "border-signal bg-signal/5" : "border-rule bg-paper"
        }`}
      >
        {loading && <div className="scan-beam" />}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {file ? (
          <div className="text-center">
            <p className="font-mono text-sm font-medium text-ink">{file.name}</p>
            <p className="mt-1 font-mono text-[10px] text-inkfade">
              {(file.size / 1024).toFixed(0)} KB · click to replace
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-mono text-sm text-ink">Drop resume here</p>
            <p className="mt-1 font-mono text-[10px] text-inkfade">
              or click to browse
            </p>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-inkfade">
          02 — Target role <span className="normal-case text-inkfade/70">(optional)</span>
        </h2>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste a job description to match keywords against a specific role..."
          rows={4}
          className="w-full resize-none border border-rule bg-paper p-3 font-mono text-xs text-ink placeholder:text-inkfade/60 focus:border-signal focus:outline-none"
        />
      </div>

      {error && (
        <p className="mt-4 border border-fail bg-fail/10 p-3 font-mono text-xs text-fail">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!file || loading}
        className="mt-5 w-full bg-ink py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-signalDark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "Scanning…" : "Run ATS scan"}
      </button>
    </form>
  );
}
