import { useCallback, useEffect, useState, useRef } from "react";
import { LangProvider } from "./i18n";
import { SignIn } from "./auth";
import { clearCredential, readCredential, signOut, storeCredential } from "./auth-session";
import PlaySelection from "./screens/PlaySelection";
import CharacterSelection from "./screens/CharacterSelection";
import ScriptView from "./screens/ScriptView";

export default function App() {
  const [credential, setCredential] = useState(readCredential);
  const [plays, setPlays] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [screen, setScreen] = useState("play-selection");
  const [selectedPlay, setSelectedPlay] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const scrollPositions = useRef({});

  const handleCredential = useCallback((token) => {
    storeCredential(token);
    setAuthError(null);
    setCredential(token);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    setCredential(null);
    setPlays(null);
  }, []);

  // The library lives behind the API, so it is fetched once per signed-in session
  // rather than bundled with the app.
  useEffect(() => {
    if (!credential) return;
    let cancelled = false;

    fetch("/api/plays", { headers: { Authorization: `Bearer ${credential}` } })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(body.error || "Could not load the script library.");
        return body;
      })
      .then((body) => {
        if (!cancelled) setPlays(body.plays);
      })
      .catch((err) => {
        if (cancelled) return;
        // A rejected or expired credential is worth nothing — drop it so the
        // user lands back on a clean sign-in screen rather than a broken app.
        clearCredential();
        setCredential(null);
        setAuthError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [credential]);

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

  if (!credential) {
    return (
      <LangProvider>
        <SignIn onCredential={handleCredential} error={authError} />
      </LangProvider>
    );
  }

  if (!plays) {
    return (
      <LangProvider>
        <div className="screen signin-screen">
          <p className="signin-subtitle">Loading scripts…</p>
        </div>
      </LangProvider>
    );
  }

  let content;
  if (screen === "play-selection") {
    content = <PlaySelection plays={plays} onSelect={handlePlaySelect} onSignOut={handleSignOut} />;
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
