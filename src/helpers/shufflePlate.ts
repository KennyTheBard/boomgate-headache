import { getRandomInt } from "./getRandomInt";

const commonMistakes: Record<string, string[]> = {
  "1": ["I", "J"],
  "2": ["Z"],
  "3": ["E"],
  "4": ["A"],
  "5": ["S"],
  "6": ["G"],
  "7": ["T", "F"],
  "8": ["B"],
  "9": ["P"],
  "0": ["O", "Q"],
  A: ["4"],
  B: ["8"],
  C: ["G"],
  D: ["0"],
  E: ["3"],
  F: ["7"],
  G: ["6", "C"],
  H: ["4", "11"],
  I: ["1", "J"],
  J: ["1", "I"],
  K: ["4"],
  L: ["1", "7"],
  M: ["N"],
  N: ["M", "11"],
  O: ["0", "Q"],
  P: ["9"],
  Q: ["0", "O"],
  S: ["5"],
  T: ["7"],
  U: ["V"],
  V: ["U"],
  W: ["VV"],
  Y: ["V"],
  Z: ["2"],
};

/**
 * Return a possible different plate.
 * @param plate
 * @param threshold 0-100, where 100 means that there will always be a character read wrong
 */
export const shufflePlate = (plate: string, threshold: number): string => {
  const characters = plate.toUpperCase().split("").map(c => c.trim()).filter(c => !!c.length);
  const shuffleIndex = getRandomInt(0, characters.length - 1);
  if (getRandomInt(0, 100) < threshold) {
    const ch = characters[shuffleIndex];
    const options = commonMistakes[ch];
    if (options) {
        characters[shuffleIndex] = options[getRandomInt(0, options.length - 1)];
    }
  }
  return characters.join('');
};
