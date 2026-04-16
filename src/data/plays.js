import { PLAY as GOD_OF_CARNAGE, CHARACTERS as GOC_CHARACTERS, SCRIPT as GOC_SCRIPT } from './script';
import { PLAY as DOUBT, CHARACTERS as DOUBT_CHARACTERS, SCRIPT as DOUBT_SCRIPT } from './doubt';
import { PLAY as EXAMPLE, CHARACTERS as EX_CHARACTERS, SCRIPT as EX_SCRIPT } from './example';
import { PLAY as EXAMPLE_ZH, CHARACTERS as EX_ZH_CHARACTERS, SCRIPT as EX_ZH_SCRIPT } from './example-zh';

export const EXAMPLE_PLAYS = [
  { ...EXAMPLE_ZH, characters: EX_ZH_CHARACTERS, script: EX_ZH_SCRIPT },
  { ...EXAMPLE, characters: EX_CHARACTERS, script: EX_SCRIPT },
];

export const PLAYS = [
  { ...GOD_OF_CARNAGE, characters: GOC_CHARACTERS, script: GOC_SCRIPT },
  { ...DOUBT, characters: DOUBT_CHARACTERS, script: DOUBT_SCRIPT, disabled: true },
];
