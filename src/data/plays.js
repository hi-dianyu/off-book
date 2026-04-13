import { PLAY as GOD_OF_CARNAGE, CHARACTERS as GOC_CHARACTERS, SCRIPT as GOC_SCRIPT } from './script';
import { PLAY as DOUBT, CHARACTERS as DOUBT_CHARACTERS, SCRIPT as DOUBT_SCRIPT } from './doubt';

export const PLAYS = [
  { ...GOD_OF_CARNAGE, characters: GOC_CHARACTERS, script: GOC_SCRIPT },
  { ...DOUBT, characters: DOUBT_CHARACTERS, script: DOUBT_SCRIPT, disabled: true },
];
