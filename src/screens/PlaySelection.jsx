import { useState, useEffect } from "react";
import { PLAYS } from "../data/plays";

export default function PlaySelection({ onSelect }) {
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
        <span className="top-bar-title">脱稿 Off-Book</span>
      </header>

      <div className="character-selection-body">
        <div className="play-selection-heading-row">
          <h2 className="character-selection-heading">选择剧本</h2>
          <button
            type="button"
            className="import-play-btn"
            onClick={() => setImportModalOpen(true)}
          >
            导入新剧本
          </button>
        </div>
        <section className="plays-list">
          {PLAYS.map((play) => (
            <button key={play.id} className="play-card" onClick={() => onSelect(play)}>
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
              aria-label="关闭"
            >
              ×
            </button>
            <h3 id="import-modal-title" className="modal-title">
              导入新剧本
            </h3>
            <p className="modal-text">
              联系 <a href="mailto:hi.dianyu@gmail.com">hi.dianyu@gmail.com</a>
            </p>
            <p className="modal-text modal-text-en">
              Contact{" "}
              <a href="mailto:hi.dianyu@gmail.com">hi.dianyu@gmail.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
