import { useState } from "react";
import { useLang } from "../i18n";

const INVITE_CODE = "feiyu2026";
const EXAMPLE_CODE = "example";

export default function InviteCode({ onSuccess }) {
  const { lang, setLang, t } = useLang();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = code.trim().toLowerCase();
    if (trimmed === INVITE_CODE) {
      onSuccess("full");
    } else if (trimmed === EXAMPLE_CODE) {
      onSuccess("example");
    } else {
      setError(true);
    }
  }

  return (
    <div className="screen invite-code-screen">
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

      <div className="invite-code-body">
        <form className="invite-code-form" onSubmit={handleSubmit}>
          <input
            className={"invite-code-input" + (error ? " invite-code-input-error" : "")}
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder={t("placeholder")}
            autoFocus
          />
          <button type="submit" className="invite-code-btn">
            {t("enter")}
          </button>
          <p className="invite-code-hint">
            {t("exampleHint")}
          </p>
          <div className="invite-code-error-slot" aria-live="polite">
            {error && (
              <p className="invite-code-error" role="alert">
                {t("invalidCode")}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
