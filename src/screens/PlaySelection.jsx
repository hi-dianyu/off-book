import { PLAY } from "../data/script";

export default function PlaySelection({ onSelect }) {
  return (
    <div className="screen play-selection-screen">
      <header className="top-bar">
        <span className="top-bar-title">脱稿 Off-Book</span>
      </header>

      <div className="character-selection-body">
        <h2 className="character-selection-heading">选择剧本</h2>
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
    </div>
  );
}
