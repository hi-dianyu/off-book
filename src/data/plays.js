import { PLAY as EARNEST, CHARACTERS as EARNEST_CHARACTERS, SCRIPT as EARNEST_SCRIPT } from './earnest';
import { PLAY as IDEAL_HUSBAND, CHARACTERS as IDEAL_CHARACTERS, SCRIPT as IDEAL_SCRIPT } from './ideal-husband';
import { PLAY as DOLLS_HOUSE, CHARACTERS as DOLLS_CHARACTERS, SCRIPT as DOLLS_SCRIPT } from './dolls-house';
import { PLAY as HAMLET, CHARACTERS as HAMLET_CHARACTERS, SCRIPT as HAMLET_SCRIPT } from './hamlet';

export const PLAYS = [
  { ...EARNEST, characters: EARNEST_CHARACTERS, script: EARNEST_SCRIPT },
  { ...IDEAL_HUSBAND, characters: IDEAL_CHARACTERS, script: IDEAL_SCRIPT },
  { ...DOLLS_HOUSE, characters: DOLLS_CHARACTERS, script: DOLLS_SCRIPT },
  { ...HAMLET, characters: HAMLET_CHARACTERS, script: HAMLET_SCRIPT },
];
