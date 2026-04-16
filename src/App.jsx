import { useState, useRef } from "react";
import { LangProvider } from "./i18n";
import InviteCode from "./screens/InviteCode";
import PlaySelection from "./screens/PlaySelection";
import CharacterSelection from "./screens/CharacterSelection";
import ScriptView from "./screens/ScriptView";

export default function App() {
  const [screen, setScreen] = useState("invite-code");
  const [mode, setMode] = useState(null);
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

  function handleInviteSuccess(inviteMode) {
    setMode(inviteMode);
    setScreen("play-selection");
  }

  let content;
  if (screen === "invite-code") {
    content = <InviteCode onSuccess={handleInviteSuccess} />;
  } else if (screen === "play-selection") {
    content = <PlaySelection onSelect={handlePlaySelect} mode={mode} />;
  } else if (screen === "character-selection") {
    content = (
      <CharacterSelection
        play={selectedPlay}
        onSelect={handleCharacterSelect}
        onBack={handleBackToPlays}
      />
    );
  } else {
    content = (
      <ScriptView
        play={selectedPlay}
        character={selectedCharacter}
        onBack={handleBackToCharacters}
        scrollPositions={scrollPositions.current}
        onScroll={handleScroll}
      />
    );
  }

  return <LangProvider>{content}</LangProvider>;
}
