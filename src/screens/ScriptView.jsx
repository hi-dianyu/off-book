import { useEffect, useRef, useState } from "react";
import { SCRIPT } from "../data/script";

export default function ScriptView({ play, character, onBack, scrollPositions, onScroll }) {
  const [revealed, setRevealed] = useState({});
  const scrollRef = useRef(null);
  const hasMounted = useRef(false);

  // Restore scroll position on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const saved = scrollPositions[character];
    if (saved != null) {
      container.scrollTop = saved;
    }
    hasMounted.current = true;
  }, []);

  // Save scroll position on scroll
  function handleScroll(e) {
    onScroll(character, e.currentTarget.scrollTop);
  }

  function toggleReveal(index) {
    setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <div className="screen script-screen">
      <header className="top-bar">
        <button className="back-btn" onClick={onBack}>← 返回</button>
        <div className="top-bar-center">
          <span className="top-bar-title">{play.title}</span>
          <span className="top-bar-character">{character}</span>
        </div>
      </header>

      <div className="script-container" ref={scrollRef} onScroll={handleScroll}>
        <div className="script-body">
          {SCRIPT.map((entry, index) => {
            if (entry.type === "direction") {
              return (
                <p key={index} className="stage-direction">
                  {entry.text}
                </p>
              );
            }

            const isMyLine = entry.character === character;
            const isRevealed = revealed[index];

            return (
              <div
                key={index}
                className={`script-line ${isMyLine ? "my-line" : ""} ${isMyLine && !isRevealed ? "redacted" : ""}`}
                onClick={isMyLine ? () => toggleReveal(index) : undefined}
                role={isMyLine ? "button" : undefined}
                aria-label={isMyLine && !isRevealed ? "点击显示台词" : undefined}
              >
                <span className={`character-name ${isMyLine ? "my-character-name" : ""}`}>
                  {entry.character}
                </span>
                <span className="line-separator">：</span>
                <span className="line-text">{entry.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
