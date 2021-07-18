// function that checks if a string contains only letters
export const isAlphaString = (val: string) => /^[a-zA-Z]+$/.test(val);

// Turn enum into array of string containing enum keys
export function enumToArray(enumeration: { [key: string]: number | string }) {
  return Object.keys(enumeration).filter(isAlphaString);
}
