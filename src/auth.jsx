import { useCallback, useEffect, useRef, useState } from "react";

const GSI_SRC = "https://accounts.google.com/gsi/client";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const ALLOWED_DOMAIN = import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN || "feiyutheater.org";

let gsiPromise = null;

/** Load Google Identity Services once, no matter how many callers ask for it. */
function loadGsi() {
  if (gsiPromise) return gsiPromise;
  gsiPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }
    const script = document.createElement("script");
    script.src = GSI_SRC;
    script.async = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Could not reach Google sign-in."));
    document.head.appendChild(script);
  });
  return gsiPromise;
}

/**
 * Google sign-in gate.
 *
 * The credential this returns is only a claim of identity — every request that
 * carries it is re-verified on the server, which is where the domain rule is
 * actually enforced. Nothing here is load-bearing for access control.
 */
export function SignIn({ onCredential, error: externalError }) {
  const buttonRef = useRef(null);
  const [localError, setLocalError] = useState(null);
  const configError = CLIENT_ID
    ? null
    : "VITE_GOOGLE_CLIENT_ID is not set. Add it to .env.local and restart.";
  const error = configError || localError || externalError;

  const handleResponse = useCallback(
    (response) => {
      if (response?.credential) onCredential(response.credential);
    },
    [onCredential],
  );

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;
    loadGsi()
      .then((google) => {
        if (cancelled || !buttonRef.current) return;
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleResponse,
          hd: ALLOWED_DOMAIN,
          auto_select: true,
        });
        google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
        });
      })
      .catch((err) => {
        if (!cancelled) setLocalError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [handleResponse]);

  return (
    <div className="screen signin-screen">
      <div className="signin-card">
        <h1 className="signin-title">Off-Book</h1>
        <p className="signin-subtitle">
          Sign in with your @{ALLOWED_DOMAIN} account to open the script library.
        </p>
        <div className="signin-button" ref={buttonRef} />
        {error && <p className="signin-error">{error}</p>}
      </div>
    </div>
  );
}
