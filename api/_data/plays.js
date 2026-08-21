import { PLAY as EARNEST, CHARACTERS as EARNEST_CHARACTERS, SCRIPT as EARNEST_SCRIPT } from './earnest.js';
import { PLAY as IDEAL_HUSBAND, CHARACTERS as IDEAL_CHARACTERS, SCRIPT as IDEAL_SCRIPT } from './ideal-husband.js';
import { PLAY as DOLLS_HOUSE, CHARACTERS as DOLLS_CHARACTERS, SCRIPT as DOLLS_SCRIPT } from './dolls-house.js';
import { PLAY as HAMLET, CHARACTERS as HAMLET_CHARACTERS, SCRIPT as HAMLET_SCRIPT } from './hamlet.js';
import { PLAY as ALMOND_TOFU, CHARACTERS as ALMOND_TOFU_CHARACTERS, SCRIPT as ALMOND_TOFU_SCRIPT } from './almond-tofu-heart.js';

export const PLAYS = [
  { ...EARNEST, characters: EARNEST_CHARACTERS, script: EARNEST_SCRIPT },
  { ...IDEAL_HUSBAND, characters: IDEAL_CHARACTERS, script: IDEAL_SCRIPT },
  { ...DOLLS_HOUSE, characters: DOLLS_CHARACTERS, script: DOLLS_SCRIPT },
  { ...HAMLET, characters: HAMLET_CHARACTERS, script: HAMLET_SCRIPT },
  { ...ALMOND_TOFU, characters: ALMOND_TOFU_CHARACTERS, script: ALMOND_TOFU_SCRIPT },
];
