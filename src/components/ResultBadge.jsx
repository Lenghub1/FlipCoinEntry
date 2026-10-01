export default function ResultBadge({ busy, last }) {
  const cls = !busy && last ? (last.side === "B" ? " buy" : " sell") : "";
  let text = "Tap to flip";
  if (busy) text = "Flipping…";
  else if (last) {
    const n = last.side === "B" ? last.buys : last.total - last.buys;
    text = `${last.side === "B" ? "B · Buy" : "S · Sell"} (${n} of ${last.total})`;
  }
  return <div key={busy ? "busy" : last ? last.side + last.buys + Math.random() : "idle"} className={"result" + cls}>{text}</div>;
}
