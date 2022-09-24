export const API_URL = 'http://localhost:3002';
export type GenericObject = { [key: string]: any };
export const SEARCH_WIDTH = 350;
export const SEARCH_HEIGHT = 75;

export const stripLetters = (value: string): number => {
  if (value) {
    const splitString = value.split('/');
    return parseInt(splitString[2]);
  } else return 0;
};
