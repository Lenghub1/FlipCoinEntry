export default function History({ items }) {
  return (
    <div className="history">
      {items.map((side, i) => (
        <div
          key={items.length - i}
          className={"chip " + (side === "B" ? "b" : "s")}
        >
          {side}
        </div>
      ))}
    </div>
  );
}
