import { useState } from "react";

const INVITE_CODE = "feiyu2026";

export default function InviteCode({ onSuccess }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (code.trim() === INVITE_CODE) {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="screen invite-code-screen">
      <header className="top-bar">
        <span className="top-bar-title">脱稿 Off-Book</span>
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
            placeholder="邀请码"
            autoFocus
          />
          <button type="submit" className="invite-code-btn">
            Enter
          </button>
          <div className="invite-code-error-slot" aria-live="polite">
            {error && (
              <p className="invite-code-error" role="alert">
                邀请码不正确 Invalid code
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
