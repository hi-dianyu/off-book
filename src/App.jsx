import { useState, useRef } from "react";
import PlaySelection from "./screens/PlaySelection";
import CharacterSelection from "./screens/CharacterSelection";
import ScriptView from "./screens/ScriptView";

export default function App() {
  const [screen, setScreen] = useState("play-selection");
  const [selectedPlay, setSelectedPlay] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const scrollPositions = useRef({});

  function handlePlaySelect(play) {
    setSelectedPlay(play);
    setScreen("character-selection");
  }

  function handleCharacterSelect(character) {
    setSelectedCharacter(character);
    setScreen("script");
  }

  function handleBackToPlays() {
    setScreen("play-selection");
    setSelectedPlay(null);
    setSelectedCharacter(null);
  }

  function handleBackToCharacters() {
    setScreen("character-selection");
  }

  function handleScroll(character, scrollTop) {
    scrollPositions.current[character] = scrollTop;
  }

  if (screen === "play-selection") {
    return <PlaySelection onSelect={handlePlaySelect} />;
  }

  if (screen === "character-selection") {
    return (
      <CharacterSelection
        play={selectedPlay}
        onSelect={handleCharacterSelect}
        onBack={handleBackToPlays}
      />
    );
  }

  return (
    <ScriptView
      play={selectedPlay}
      character={selectedCharacter}
      onBack={handleBackToCharacters}
      scrollPositions={scrollPositions.current}
      onScroll={handleScroll}
    />
  );
}
