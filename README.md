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
npm run dev
```

Then open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

| Command        | Purpose                    |
|----------------|----------------------------|
| `npm run dev`  | Dev server with hot reload |
| `npm run build`| Production build to `dist/`|
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint                 |

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
    script.js             # 杀戮之神 / God of Carnage
    doubt.js              # 怀疑 / Doubt: A Parable
```

## Adding or editing a play

1. Add a module under `src/data/` that exports:

   - `PLAY` — `{ id, title, subtitle }`
   - `CHARACTERS` — array of character names (strings)
   - `SCRIPT` — array of blocks with `type: 'direction' | 'line'`

2. For `line` entries, use `character` and `text`, or `parts` (array of strings) for a single line split into multiple paragraphs.

3. Import that module in `src/data/plays.js` and append an object to `PLAYS` with `characters` and `script` set from your exports.

Scene navigation appears when direction lines match the pattern `第…场` (e.g. `第一场`). Other directions are shown as normal stage text.

## License

Private project (`"private": true` in `package.json`). Adjust if you open-source it later.
