import { SPINNERS } from "../config/spinners.js";

const pct = (n, d) => (d ? (n / d) * 100 : 0);

export default function Stats({ tally }) {
  const flips = tally.rounds * SPINNERS.length;
  const buys = SPINNERS.reduce((s, c) => s + tally.coins[c.id].B, 0);
  const buyPct = pct(buys, flips);
  const side = !flips || buyPct === 50 ? "neutral" : buyPct > 50 ? "buy" : "sell";
  const label = side === "neutral" ? "NEUTRAL" : side === "buy" ? "BUY" : "SELL";
  const shown = side === "sell" ? 100 - buyPct : buyPct;

  return (
    <section className="stats">
      <div className={"avg " + side}>
        <span>Average decision</span>
        <strong>{flips ? `${label} ${shown.toFixed(1)}%` : "No flips yet"}</strong>
        <small>
          {flips} flips · {tally.rounds} rounds · majority vote B {tally.verdict.B} / S {tally.verdict.S}
        </small>
      </div>

      <div className="bar" aria-hidden="true">
        <i style={{ width: (flips ? buyPct : 50) + "%" }} />
      </div>

      <table>
        <thead>
          <tr><th>Spinner</th><th>Buy</th><th>Sell</th><th>Buy %</th></tr>
        </thead>
        <tbody>
          {SPINNERS.map((c) => {
            const { B, S } = tally.coins[c.id];
            return (
              <tr key={c.id}>
                <td>{c.name}</td><td>{B}</td><td>{S}</td>
                <td>{B + S ? pct(B, B + S).toFixed(1) + "%" : "–"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
