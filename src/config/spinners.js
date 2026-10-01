// Three different spinners (not just coins). Each has a `land(side, prevPose)` that
// returns the next pose so it comes to rest showing the chosen side (B or S).
const norm = (x) => ((x % 360) + 360) % 360;
const to = (prev, target, spins) => prev + 360 * spins + ((norm(target) - norm(prev) + 360) % 360);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// cube rotations [x, y] that bring a face to the front (B on front/right/top, S on back/left/bottom)
const DICE = { B: [[0, 0], [0, -90], [-90, 0]], S: [[0, 180], [0, 90], [90, 0]] };

export const SPINNERS = [
  {
    id: "coin", kind: "coin", name: "Coin", spin: "End-over-end flip · 5 spins",
    start: { a: 0, b: 0 }, duration: 3000, easing: "cubic-bezier(.2,.85,.25,1)",
    land: (s, p) => ({ a: to(p.a, s === "B" ? 0 : 180, 5), b: 0 }),
  },
  {
    id: "wheel", kind: "wheel", name: "Wheel", spin: "Roulette wheel · 6 turns",
    start: { a: 0, b: 0 }, duration: 4200, easing: "cubic-bezier(.12,.75,.12,1)",
    // 8 segments of 45°: even = B, odd = S. Stop at a random spot inside a matching segment.
    land: (s, p) => {
      const idx = 2 * Math.floor(Math.random() * 4) + (s === "B" ? 0 : 1);
      const center = idx * 45 + 22.5 + (Math.random() - 0.5) * 28;
      return { a: to(p.a, 360 - center, 6), b: 0 };
    },
  },
  {
    id: "dice", kind: "dice", name: "Dice", spin: "Tumbling cube · 2 + 3 turns",
    start: { a: 0, b: 0 }, duration: 2800, easing: "cubic-bezier(.25,.8,.25,1)",
    land: (s, p) => {
      const [x, y] = pick(DICE[s]);
      return { a: to(p.a, x, 2), b: to(p.b, y, 3) };
    },
  },
];
