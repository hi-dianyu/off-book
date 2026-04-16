import { useState, useEffect } from "react";
import { PLAYS, EXAMPLE_PLAYS } from "../data/plays";
import { useLang } from "../i18n";

export default function PlaySelection({ onSelect, mode }) {
  const { lang, setLang, t } = useLang();
  const [importModalOpen, setImportModalOpen] = useState(false);

  useEffect(() => {
    if (!importModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setImportModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [importModalOpen]);

  return (
    <div className="screen play-selection-screen">
      <header className="top-bar">
        <span className="top-bar-title">{t("appTitle")}</span>
        <button
          type="button"
          className="lang-toggle"
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
        >
          {lang === "en" ? "中" : "EN"}
        </button>
      </header>

      <div className="character-selection-body">
        <div className="play-selection-heading-row">
          <h2 className="character-selection-heading">{t("selectPlay")}</h2>
          {mode !== "example" && (
            <button
              type="button"
              className="import-play-btn"
              onClick={() => setImportModalOpen(true)}
            >
              {t("importPlay")}
            </button>
          )}
        </div>
        <section className="plays-list">
          {(mode === "example" ? EXAMPLE_PLAYS : PLAYS).map((play) => (
            <button
              key={play.id}
              type="button"
              className="play-card"
              disabled={play.disabled}
              onClick={() => onSelect(play)}
            >
              <div className="play-card-inner">
                <span className="play-title-zh">{play.title}</span>
                <span className="play-title-en">{play.subtitle}</span>
              </div>
              <span className="play-card-arrow">›</span>
            </button>
          ))}
        </section>
      </div>

      {importModalOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setImportModalOpen(false)}
        >
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setImportModalOpen(false)}
              aria-label={t("close")}
            >
              ×
            </button>
            <h3 id="import-modal-title" className="modal-title">
              {t("importPlay")}
            </h3>
            <p className="modal-text">
              {t("contact")}{" "}
              <a href="mailto:hi.dianyu@gmail.com">hi.dianyu@gmail.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
