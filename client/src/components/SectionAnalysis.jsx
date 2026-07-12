export default function SectionAnalysis({ sections = [] }) {
  return (
    <div className="border border-rule bg-ledger/60 p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-inkfade">
        Section checklist
      </h3>
      <ul className="divide-y divide-rule">
        {sections.map((s, i) => (
          <li key={i} className="flex items-start gap-3 py-3">
            <span
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border font-mono text-[10px] font-bold ${
                s.present
                  ? "border-pass bg-pass/10 text-pass"
                  : "border-fail bg-fail/10 text-fail"
              }`}
            >
              {s.present ? "✓" : "✕"}
            </span>
            <div>
              <p className="font-mono text-sm font-medium text-ink">{s.name}</p>
              <p className="mt-0.5 text-xs text-inkfade">{s.feedback}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
