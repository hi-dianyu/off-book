---
name: add-script
description: Load a new play script into the off-book app from a PDF or pasted English text. Use when the user wants to add/import a play, convert a script into the app's data format, or asks to "load a script".
---

# Add a script

Convert a play script (PDF or pasted English text) into a new data file and register it.

## Steps

1. **Get the script.** If a PDF, read it. If pasted text, use it directly.

2. **Ask for `title` and `subtitle`** if not obvious from the script. `title` is the play name, `subtitle` is the act/scene or a short tag (e.g. "Act 2, Scene 2").

3. **Create `src/data/<id>.js`** where `<id>` is a kebab-case slug of the title. Follow the format below exactly.

4. **Register it** in `src/data/plays.js`: add an import and append to the `PLAYS` array.

5. **Verify** with `npm run dev` — the play appears on the selection screen and opens correctly.

## File format

```js
export const PLAY = {
  id: '<kebab-case-id>',
  title: 'Play Title',
  subtitle: 'Act / Scene',
};

export const CHARACTERS = ['Name1', 'Name2'];

export const SCRIPT = [
  { type: 'direction', text: 'Stage direction here.' },
  { type: 'line', character: 'Name1', text: 'A short single line.' },
  {
    type: 'line',
    character: 'Name2',
    parts: [
      'First sentence or two of a long speech.',
      'Next chunk.',
      'Final chunk.',
    ],
  },
];
```

## Rules

- **Directions** (stage directions, entrances/exits, anything not spoken) → `{ type: 'direction', text: '...' }`. Pull them out of dialogue into their own entries.
- **Spoken lines** → `{ type: 'line', character: '...', text: '...' }`.
- **Long monologues** → split into `parts: [...]` instead of `text`. Break at sentence boundaries into chunks of roughly 1–3 sentences each. Use `parts` whenever a speech is more than ~2 sentences / ~200 characters.
- `CHARACTERS` must list every speaking character, in order of first appearance.
- Escape apostrophes in single-quoted strings (`\'`).

## Registration in plays.js

```js
import { PLAY as MY_PLAY, CHARACTERS as MY_CHARS, SCRIPT as MY_SCRIPT } from './<id>';

export const PLAYS = [
  // ...existing
  { ...MY_PLAY, characters: MY_CHARS, script: MY_SCRIPT },
];
```
