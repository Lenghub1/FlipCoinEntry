import { useCallback, useEffect, useRef, useState } from "react";
import { SPINNERS } from "../config/spinners.js";

const rand = () => (Math.random() < 0.5 ? "B" : "S");
const verdictOf = (sides) => {
  const buys = sides.filter((s) => s === "B").length;
  return { side: buys * 2 > sides.length ? "B" : "S", buys, total: sides.length };
};
const blank = () => ({
  rounds: 0,
  verdict: { B: 0, S: 0 },
  coins: Object.fromEntries(SPINNERS.map((c) => [c.id, { B: 0, S: 0 }])),
});
function addRounds(t, rounds) {
  const n = { rounds: t.rounds + rounds.length, verdict: { ...t.verdict }, coins: {} };
  SPINNERS.forEach((c) => (n.coins[c.id] = { ...t.coins[c.id] }));
  rounds.forEach((r) => {
    r.forEach((s, i) => n.coins[SPINNERS[i].id][s]++);
    n.verdict[verdictOf(r).side]++;
  });
  return n;
}

export default function useCoins() {
  const poseRef = useRef(Object.fromEntries(SPINNERS.map((c) => [c.id, c.start])));
  const [poses, setPoses] = useState(poseRef.current);
  const [results, setResults] = useState({});
  const [busy, setBusy] = useState(false);
  const [tally, setTally] = useState(blank);
  const [history, setHistory] = useState([]);
  const [last, setLast] = useState(null);
  const busyRef = useRef(false);
  const timers = useRef([]);

  const record = useCallback((rounds) => {
    const v = verdictOf(rounds[rounds.length - 1]);
    setTally((t) => addRounds(t, rounds));
    setHistory((h) => [v.side, ...h].slice(0, 10));
    setLast(v);
  }, []);

  const flip = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setResults({});
    const sides = SPINNERS.map(rand);

    const next = {};
    SPINNERS.forEach((c, i) => { next[c.id] = c.land(sides[i], poseRef.current[c.id]); });
    poseRef.current = next;
    setPoses(next);

    // each coin reveals its result when its own spin ends
    let done = 0;
    SPINNERS.forEach((c, i) => {
      timers.current.push(
        setTimeout(() => {
          setResults((p) => ({ ...p, [c.id]: sides[i] }));
          if (++done === SPINNERS.length) {
            record([sides]);
            busyRef.current = false;
            setBusy(false);
          }
        }, c.duration + 120)
      );
    });
  }, [record]);

  // instant, un-animated rounds to see the long-run average
  const simulate = useCallback((n = 100) => {
    if (busyRef.current) return;
    record(Array.from({ length: n }, () => SPINNERS.map(rand)));
  }, [record]);

  const reset = useCallback(() => {
    if (busyRef.current) return;
    setTally(blank());
    setHistory([]);
    setLast(null);
    setResults({});
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        flip();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      timers.current.forEach(clearTimeout);
    };
  }, [flip]);

  return { poses, results, busy, tally, history, last, flip, simulate, reset };
}
