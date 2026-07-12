export default function KeywordList({ matched = [], missing = [] }) {
  return (
    <div className="border border-rule bg-ledger/60 p-6">
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-inkfade">
        Keyword scan
      </h3>

      <div className="mb-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-pass">
          Matched ({matched.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {matched.length ? (
            matched.map((kw, i) => (
              <span
                key={i}
                className="border border-pass/40 bg-pass/10 px-2 py-1 font-mono text-[11px] text-pass"
              >
                {kw}
              </span>
            ))
          ) : (
            <span className="text-xs text-inkfade">None detected</span>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-fail">
          Missing ({missing.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {missing.length ? (
            missing.map((kw, i) => (
              <span
                key={i}
                className="border border-fail/40 bg-fail/10 px-2 py-1 font-mono text-[11px] text-fail"
              >
                {kw}
              </span>
            ))
          ) : (
            <span className="text-xs text-inkfade">None — great coverage</span>
          )}
        </div>
      </div>
    </div>
  );
}
