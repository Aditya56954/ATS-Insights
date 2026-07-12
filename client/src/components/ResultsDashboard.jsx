import ScoreGauge from "./ScoreGauge";
import SectionAnalysis from "./SectionAnalysis";
import KeywordList from "./KeywordList";

export default function ResultsDashboard({ result }) {
  if (!result) return null;

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Scores + verdict */}
      <div className="flex flex-col items-center gap-6 border border-rule bg-ledger/60 p-6 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 flex-col justify-center gap-6 sm:flex-row sm:justify-around">
          <ScoreGauge score={result.overallScore} label="Overall score" />
          <ScoreGauge score={result.atsCompatibility} label="ATS compatibility" />
        </div>
        <div className="flex-1 border-t border-rule pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-inkfade">
            Verdict
          </h3>
          <p className="text-sm leading-relaxed text-ink">{result.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SectionAnalysis sections={result.sections} />
        <KeywordList
          matched={result.matchedKeywords}
          missing={result.missingKeywords}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-rule bg-ledger/60 p-6">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-pass">
            Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths?.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink">
                <span className="font-mono text-pass">+</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-rule bg-ledger/60 p-6">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-signal">
            Improvements
          </h3>
          <ul className="space-y-2">
            {result.improvements?.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink">
                <span className="font-mono text-signal">→</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {result.formattingIssues?.length > 0 && (
        <div className="border border-rule bg-ledger/60 p-6">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fail">
            Formatting flags
          </h3>
          <ul className="space-y-2">
            {result.formattingIssues.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink">
                <span className="font-mono text-fail">!</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
