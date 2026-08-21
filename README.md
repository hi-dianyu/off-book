# 脱稿 Off-Book

A small web app for **off-book rehearsal**: pick a play and a role, then run lines with the rest of the script easy to peek at when you need it. Built for practicing memorized theatre text on a phone or laptop.

## What you can do

- **Choose a play** from the list (each entry has a Chinese title and English subtitle).
- **Choose your character** to focus that part in the script view.
- **Read the script** with stage directions and dialogue; **tap** non–your-line blocks to hide or reveal them so you are not reading everyone’s lines at once.
- **Jump between scenes** when the script marks scenes (e.g. “第一场”, “第二场”); the bar highlights the scene you are in while scrolling.
- **Scroll position is remembered per character** in the session, so switching roles does not lose your place.

## Tech stack

- [React](https://react.dev/) 19 · [Vite](https://vite.dev/) 8
- Plain JSX (no router; screen state lives in `App.jsx`)
- ESLint (`npm run lint`)

## Getting started

**Requirements:** Node.js 18+ (or whatever version you use locally; the repo targets current Node LTS).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local` with your Google OAuth client ID before the app will open — see [Access control](#access-control).

Then open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

| Command        | Purpose                    |
|----------------|----------------------------|
| `npm run dev`  | Dev server with hot reload |
| `npm run build`| Production build to `dist/`|
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint                 |

## Access control

The app is limited to Google Workspace accounts on a single domain (`feiyutheater.org`).

The script library is **not** part of the client bundle. It is served by `api/plays.js`, which
verifies the caller's Google ID token against Google's public keys and checks that the account is
a verified member of the allowed domain. An unauthenticated visitor receives the app shell and no
play text of any kind, so scripts cannot be lifted out of the served JavaScript.

Setup:

1. In the [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create an
   OAuth 2.0 **Web application** client. Add your deployed origin and `http://localhost:5173` to
   the authorised JavaScript origins. No client secret is needed.
2. Put the client ID in `.env.local` (see `.env.example`).
3. Set the same values as environment variables on your host:

   | Variable | Purpose |
   |----------|---------|
   | `VITE_GOOGLE_CLIENT_ID` | Client ID, baked into the frontend at build time |
   | `GOOGLE_CLIENT_ID` | Client ID, used by the API to validate the token audience |
   | `ALLOWED_EMAIL_DOMAIN` | Workspace domain permitted to sign in |
   | `VITE_ALLOWED_EMAIL_DOMAIN` | Same domain, for wording on the sign-in screen |

To allow a different domain, change `ALLOWED_EMAIL_DOMAIN` — no code change required.

## Project layout

```
src/
  App.jsx                 # Flow: play → character → script
  screens/
    PlaySelection.jsx     # Play list
    CharacterSelection.jsx
    ScriptView.jsx        # Script UI, reveal toggles, scene nav
  data/
    plays.js              # Registers all plays
    earnest.js            # The Importance of Being Earnest (Wilde)
    ideal-husband.js      # An Ideal Husband (Wilde)
    dolls-house.js        # A Doll's House (Ibsen)
    hamlet.js             # Hamlet (Shakespeare)
```

All bundled plays are public-domain opening-scene excerpts.

## Adding a play with an AI coding agent (recommended)

This repo ships an `add-script` skill. The same `SKILL.md` is provided in both
skill locations so it works out of the box with:

- **Claude Code** — [`.claude/skills/add-script/SKILL.md`](.claude/skills/add-script/SKILL.md)
- **Codex** — [`.agents/skills/add-script/SKILL.md`](.agents/skills/add-script/SKILL.md)

With the agent running in the project root, paste a script (or point at a PDF)
and ask:

> load this script into the app

The agent converts it to the data format, splits long monologues, separates
stage directions, creates the `src/data/<id>.js` file, and registers it in
`src/data/plays.js` for you. Source scripts should be public domain or your own.

> The two `SKILL.md` files are identical — if you edit one, copy it to the other.

## Adding or editing a play manually

1. Add a module under `src/data/` that exports:

   - `PLAY` — `{ id, title, subtitle }`
   - `CHARACTERS` — array of character names (strings)
   - `SCRIPT` — array of blocks with `type: 'direction' | 'line'`

2. For `line` entries, use `character` and `text`, or `parts` (array of strings) for a single line split into multiple paragraphs.

3. Import that module in `src/data/plays.js` and append an object to `PLAYS` with `characters` and `script` set from your exports.

Scene navigation appears when direction lines match the pattern `第…场` (e.g. `第一场`). Other directions are shown as normal stage text.

## License

[MIT](LICENSE) © Dian Yu

Bundled play texts are public-domain opening-scene excerpts.
