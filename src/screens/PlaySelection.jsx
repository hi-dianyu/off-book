import { PLAY } from "../data/script";

export default function PlaySelection({ onSelect }) {
  return (
    <div className="screen play-selection-screen">
      <header className="app-header">
        <h1 className="app-name">Cue</h1>
        <p className="app-tagline">Your lines. Your practice.</p>
      </header>

      <section className="plays-list">
        <button className="play-card" onClick={() => onSelect(PLAY)}>
          <div className="play-card-inner">
            <span className="play-title-zh">{PLAY.title}</span>
            <span className="play-title-en">{PLAY.subtitle}</span>
          </div>
          <span className="play-card-arrow">›</span>
        </button>
      </section>
    </div>
  );
}
