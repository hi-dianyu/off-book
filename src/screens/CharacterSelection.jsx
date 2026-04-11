import { CHARACTERS } from "../data/script";

export default function CharacterSelection({ play, onSelect, onBack }) {
  return (
    <div className="screen character-selection-screen">
      <header className="top-bar">
        <button className="back-btn" onClick={onBack}>← 返回</button>
        <span className="top-bar-title">{play.title}</span>
      </header>

      <div className="character-selection-body">
        <h2 className="character-selection-heading">选择角色</h2>
        <div className="character-list">
          {CHARACTERS.map((character) => (
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
