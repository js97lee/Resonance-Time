const LOOP_TEXT =
  'TIME OF RESONANCE ✦ 2026 ✦ REALDAY ✦ TIME OF RESONANCE ✦ 2026 ✦ REALDAY'

export default function CurvedLoopBanner() {
  return (
    <div className="curved-loop-banner">
      <span className="visually-hidden">
        TIME OF RESONANCE 2026 REALDAY
      </span>
      <div className="curved-loop-banner__inner" aria-hidden="true">
        <div className="curved-loop-banner__track">
          <span className="curved-loop-banner__segment">{LOOP_TEXT}</span>
          <span className="curved-loop-banner__segment">{LOOP_TEXT}</span>
          <span className="curved-loop-banner__segment">{LOOP_TEXT}</span>
        </div>
      </div>
    </div>
  )
}
