/** Where the Google credential lives for the length of a browser session. */
export const CREDENTIAL_KEY = "off-book-credential";

export function readCredential() {
  return sessionStorage.getItem(CREDENTIAL_KEY);
}

export function storeCredential(token) {
  sessionStorage.setItem(CREDENTIAL_KEY, token);
}

export function clearCredential() {
  sessionStorage.removeItem(CREDENTIAL_KEY);
}

/** Clear the cached credential and stop Google from silently re-selecting it. */
export function signOut() {
  window.google?.accounts?.id?.disableAutoSelect();
  clearCredential();
}
