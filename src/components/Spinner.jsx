const LAYERS = 17; // coin rim thickness
const FACES = [["front", "B"], ["right", "B"], ["top", "B"], ["back", "S"], ["left", "S"], ["bottom", "S"]];
const SEGMENTS = Array.from({ length: 8 }, (_, i) => ({ c: i * 45 + 22.5, t: i % 2 ? "S" : "B" }));

export default function Spinner({ cfg, pose, result, tossing, onFlip }) {
  const style = { "--dur": cfg.duration + "ms", "--ease": cfg.easing, "--flip": "rotateX(180deg)" };
  const { a, b } = pose;
  let body;

  if (cfg.kind === "coin") {
    body = (
      <div className="coin" style={{ transform: `rotateX(${a}deg)` }} onClick={onFlip}>
        {Array.from({ length: LAYERS }, (_, i) => (
          <div key={i} className="edge" style={{ transform: `translateZ(${i - (LAYERS - 1) / 2}px)` }} />
        ))}
        <div className="face face-b">B</div>
        <div className="face face-s">S</div>
      </div>
    );
  } else if (cfg.kind === "wheel") {
    body = (
      <>
        <div className="pointer" />
        <div className="coin wheel" style={{ transform: `rotate(${a}deg)` }} onClick={onFlip}>
          {SEGMENTS.map((s) => (
            <span key={s.c} className="wheel-label"
              style={{ transform: `translate(-50%,-50%) rotate(${s.c}deg) translateY(calc(var(--size) * -.3))` }}>
              {s.t}
            </span>
          ))}
          <div className="wheel-hub" />
        </div>
      </>
    );
  } else {
    body = (
      <div className="coin" style={{ transform: `rotateX(${a}deg) rotateY(${b}deg)` }} onClick={onFlip}>
        {FACES.map(([pos, t]) => (
          <div key={pos} className={`cface cf-${pos} ${t.toLowerCase()}`}>{t}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="coin-col">
      <div className={`coin-area theme-classic kind-${cfg.kind}${tossing ? " tossing" : ""}`} style={style}>
        <div className="shadow" />
        <div className="coin-wrap">{body}</div>
      </div>
      <div className="coin-meta">
        <b>{cfg.name}</b>
        <span>{cfg.spin}</span>
        <em className={result ? result.toLowerCase() : ""}>{result ?? "–"}</em>
      </div>
    </div>
  );
}
