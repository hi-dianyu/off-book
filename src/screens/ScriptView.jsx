import { useEffect, useRef, useState, useMemo, useCallback } from "react";

export default function ScriptView({ play, character, onBack, scrollPositions, onScroll }) {
  const [revealed, setRevealed] = useState({});
  const scrollRef = useRef(null);
  const hasMounted = useRef(false);
  const [activeScene, setActiveScene] = useState(null);

  // Extract scene info from script
  const scenes = useMemo(() => {
    const result = [];
    let sceneNum = 0;
    play.script.forEach((entry, index) => {
      if (entry.type === "direction" && /^第[一二三四五六七八九十百]+场$/.test(entry.text)) {
        sceneNum++;
        result.push({ index, text: entry.text, id: `scene-${sceneNum}` });
      }
    });
    return result;
  }, [play.script]);

  const showSceneNav = scenes.length >= 2;

  // Initialize active scene
  useEffect(() => {
    if (scenes.length > 0 && activeScene === null) {
      setActiveScene(scenes[0].id);
    }
  }, [scenes, activeScene]);

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

  // IntersectionObserver scroll-spy
  useEffect(() => {
    if (!showSceneNav) return;
    const container = scrollRef.current;
    if (!container) return;

    const headings = scenes.map(s => document.getElementById(s.id)).filter(Boolean);
    if (headings.length === 0) return;

    // Track which headings have crossed above the trigger line
    const visibleSet = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            // If heading scrolled above viewport (boundingClientRect.top < rootBounds.top)
            if (entry.boundingClientRect.top < entry.rootBounds.top) {
              visibleSet.add(entry.target.id);
            } else {
              visibleSet.delete(entry.target.id);
            }
          }
        });

        // The active scene is the last one whose heading has been scrolled past or is visible
        let active = scenes[0].id;
        for (const scene of scenes) {
          if (visibleSet.has(scene.id)) {
            active = scene.id;
          }
        }
        setActiveScene(active);
      },
      {
        root: container,
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [scenes, showSceneNav]);

  function handleScroll(e) {
    onScroll(character, e.currentTarget.scrollTop);
  }

  function toggleReveal(index) {
    setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const handleSceneJump = useCallback((e) => {
    const id = e.target.value;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Build a lookup for scene IDs by script index
  const sceneIdByIndex = useMemo(() => {
    const map = {};
    scenes.forEach((s) => { map[s.index] = s.id; });
    return map;
  }, [scenes]);

  return (
    <div className="screen script-screen">
      <header className="top-bar">
        <button className="back-btn" onClick={onBack}>← 返回</button>
        <span className="top-bar-title">{play.title}</span>
      </header>

      {showSceneNav && (
        <div className="scene-nav">
          <select
            className="scene-select"
            value={activeScene || ""}
            onChange={handleSceneJump}
          >
            {scenes.map((s) => (
              <option key={s.id} value={s.id}>{s.text}</option>
            ))}
          </select>
        </div>
      )}

      <div className="script-container" ref={scrollRef} onScroll={handleScroll}>
        <div className="script-body">
          {play.script.map((entry, index) => {
            if (entry.type === "direction") {
              const sceneId = sceneIdByIndex[index];
              if (sceneId) {
                return (
                  <p key={index} id={sceneId} className="stage-direction scene-heading">
                    {entry.text}
                  </p>
                );
              }
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
