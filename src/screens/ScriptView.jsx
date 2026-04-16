import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useLang } from "../i18n";

export default function ScriptView({ play, character, onBack, scrollPositions, onScroll }) {
  const { lang, setLang, t } = useLang();
  const [revealed, setRevealed] = useState({});
  const scrollRef = useRef(null);
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

  /** Last scene whose heading top is at or above a trigger line in the scroll container (full recomputation each call — avoids stale IntersectionObserver state). */
  const updateActiveFromScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || scenes.length === 0) return;

    const rootRect = container.getBoundingClientRect();
    const triggerLine = rootRect.top + Math.min(rootRect.height * 0.2, 88);

    let active = scenes[0].id;
    for (const scene of scenes) {
      const el = document.getElementById(scene.id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= triggerLine) {
        active = scene.id;
      }
    }
    setActiveScene(active);
  }, [scenes]);

  // Restore scroll position once on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const saved = scrollPositions[character];
    if (saved != null) {
      container.scrollTop = saved;
    }
  }, []);

  // Keep dropdown aligned with scroll position (mount, scene list changes)
  useEffect(() => {
    if (!showSceneNav) return;
    requestAnimationFrame(() => {
      updateActiveFromScroll();
    });
  }, [showSceneNav, scenes, updateActiveFromScroll]);

  function handleScroll(e) {
    onScroll(character, e.currentTarget.scrollTop);
    if (!showSceneNav) return;
    updateActiveFromScroll();
  }

  function toggleReveal(index) {
    setRevealed((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const handleSceneJump = useCallback((e) => {
    const id = e.target.value;
    setActiveScene(id);
    const el = document.getElementById(id);
    if (!el) return;
    // Instant jump avoids intermediate scroll positions (smooth scroll made the dropdown
    // label cycle through every scene heading as it passed the trigger line).
    el.scrollIntoView({ block: "start", behavior: "instant" });
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
        <button className="back-btn" onClick={onBack}>{t("back")}</button>
        <div className="top-bar-main">
          <span className="top-bar-title">{play.title}</span>
          {showSceneNav && (
            <select
              className="scene-select"
              value={activeScene || ""}
              onChange={handleSceneJump}
              aria-label={t("jumpToScene")}
            >
              {scenes.map((s) => (
                <option key={s.id} value={s.id}>{s.text}</option>
              ))}
            </select>
          )}
        </div>
        <button
          type="button"
          className="lang-toggle"
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
        >
          {lang === "en" ? "中" : "EN"}
        </button>
      </header>

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

            // Handle lines with parts (long monologues split into segments)
            if (entry.parts) {
              return (
                <div key={index} className="script-line-group">
                  {entry.parts.map((part, partIdx) => {
                    const partKey = `${index}-${partIdx}`;
                    const isPartRevealed = revealed[partKey];
                    return (
                      <div
                        key={partKey}
                        className={`script-line ${isMyLine ? "my-line" : ""} ${isMyLine && !isPartRevealed ? "redacted" : ""}`}
                        onClick={isMyLine ? () => toggleReveal(partKey) : undefined}
                        role={isMyLine ? "button" : undefined}
                        aria-label={isMyLine && !isPartRevealed ? t("clickToReveal") : undefined}
                      >
                        {partIdx === 0 && (
                          <>
                            <span className={`character-name ${isMyLine ? "my-character-name" : ""}`}>
                              {entry.character}
                            </span>
                            <span className="line-separator">：</span>
                          </>
                        )}
                        <span className="line-text">{part}</span>
                      </div>
                    );
                  })}
                </div>
              );
            }

            const isRevealed = revealed[index];

            return (
              <div
                key={index}
                className={`script-line ${isMyLine ? "my-line" : ""} ${isMyLine && !isRevealed ? "redacted" : ""}`}
                onClick={isMyLine ? () => toggleReveal(index) : undefined}
                role={isMyLine ? "button" : undefined}
                aria-label={isMyLine && !isRevealed ? t("clickToReveal") : undefined}
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
