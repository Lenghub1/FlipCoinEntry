import Spinner from "./components/Spinner.jsx";
import ResultBadge from "./components/ResultBadge.jsx";
import History from "./components/History.jsx";
import Stats from "./components/Stats.jsx";
import useCoins from "./hooks/useCoins.js";
import { SPINNERS } from "./config/spinners.js";

export default function App() {
  const { poses, results, busy, tally, history, last, flip, simulate, reset } = useCoins();
  const glow = !busy && last ? (last.side === "B" ? " buy" : " sell") : "";

  return (
    <main className="stage">
      <div className={"glow" + glow} />
      <h1>FlipCoinModel <span>Entry</span></h1>
      <p className="sub">B = Buy &nbsp;·&nbsp; S = Sell &nbsp;·&nbsp; majority of 3 spinners decides</p>

      <div className="coins">
        {SPINNERS.map((c) => (
          <Spinner key={c.id} cfg={c} pose={poses[c.id]} result={results[c.id]} tossing={busy} onFlip={flip} />
        ))}
      </div>

      <ResultBadge busy={busy} last={last} />
      <button className="btn" onClick={flip} disabled={busy}>Spin all</button>

      <div className="tools">
        <button onClick={() => simulate(100)} disabled={busy}>Simulate 100 rounds</button>
        <button onClick={reset} disabled={busy}>Reset</button>
      </div>

      <History items={history} />
      <Stats tally={tally} />
    </main>
  );
}
