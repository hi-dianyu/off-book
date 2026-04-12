import { PLAYS } from "../data/plays";

export default function PlaySelection({ onSelect }) {
  return (
    <div className="screen play-selection-screen">
      <header className="top-bar">
        <span className="top-bar-title">脱稿 Off-Book</span>
      </header>

      <div className="character-selection-body">
        <h2 className="character-selection-heading">选择剧本</h2>
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
    </div>
  );
}
