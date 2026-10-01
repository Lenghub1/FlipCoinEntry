# FlipCoinModel Entry (React)

React + Vite port of the original single-file HTML coin flipper (B = Buy, S = Sell).

```bash
npm install
npm run dev      # start dev server
npm run build    # production build in /dist
```

Flip with the button, by clicking the coin, or with Space / Enter.

## Structure
- `src/App.jsx` – layout and wiring
- `src/hooks/useCoins.js` – multi-coin flip logic, tally, keyboard handling
- `src/components/Spinner.jsx` – coin, wheel and dice renderers
- `src/components/ResultBadge.jsx`, `History.jsx` – readouts
- `src/styles.css` – original styles, unchanged

## Spinners
- Three different spinners (`src/config/spinners.js`): Coin (end-over-end flip), Wheel (8-segment roulette, B/S alternating), Dice (tumbling cube, B/S on opposite-colored faces).
- Each spinner's `land(side, pose)` computes where it stops so the chosen side ends up showing. Add a new spinner by adding an entry and a render branch in `Spinner.jsx`.
- Each round spins all three; the majority decides Buy/Sell. The stats panel shows the average across all individual results. "Simulate 100 rounds" adds instant rounds.
- Spin type is visual only: every result is an independent 50/50 `Math.random()`.
