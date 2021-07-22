// function that checks if a string contains only letters
export const isAlphaString = (val: string) => /^[a-zA-Z]+$/.test(val);

// Turn enum into array of string containing enum keys
export function enumToArray(enumeration: { [key: string]: number | string }) {
  return Object.keys(enumeration).filter(isAlphaString);
}

// similar to range in python2
export const range = (n: number) => [...Array(n).keys()];

/**
 * this is template tag that does nothing, I just
 * use it to benifit from the graphql vscode extention
 * synthatx highlighting
 */

export const gql = (strings: TemplateStringsArray, ...exps: any[]) => {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < exps.length) result += exps[i];
  }
  return result;
};
