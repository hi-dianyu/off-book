import { useEffect, useState } from "react";
import { useLang } from "../i18n";

export default function CharacterSelection({ play, onSelect, onBack }) {
  const { lang, setLang, t } = useLang();
  /** Avoid false :hover on the first row when the pointer is still where the play card was. */
  const [hoverStylesActive, setHoverStylesActive] = useState(false);

  useEffect(() => {
    setHoverStylesActive(false);
    const enable = () => setHoverStylesActive(true);
    window.addEventListener("mousemove", enable, { passive: true });
    return () => window.removeEventListener("mousemove", enable);
  }, [play.id]);

  return (
    <div className="screen character-selection-screen">
      <header className="top-bar">
        <button className="back-btn" onClick={onBack}>{t("back")}</button>
        <span className="top-bar-title">{play.title}</span>
        <button
          type="button"
          className="lang-toggle"
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
        >
          {lang === "en" ? "中" : "EN"}
        </button>
      </header>

      <div className="character-selection-body">
        <h2 className="character-selection-heading">{t("selectCharacter")}</h2>
        <div
          className={
            "character-list" + (hoverStylesActive ? "" : " character-list--hover-gated")
          }
        >
          {play.characters.map((character) => (
            <button
              key={character}
              className="character-btn"
              onClick={() => onSelect(character)}
            >
              {character}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
