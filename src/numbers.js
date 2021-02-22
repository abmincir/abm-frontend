export const persianNumbersRegex = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
  englishNumberRegex = [
    /0/g,
    /1/g,
    /2/g,
    /3/g,
    /4/g,
    /5/g,
    /6/g,
    /7/g,
    /8/g,
    /9/g,
  ],
  englishNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  toEnglish = (str: string): string => {
    for (let i = 0; i < 10; i++) {
      str = str.replace(persianNumbersRegex[i], `${englishNumbers[i]}`);
    }
    return str;
  },
  toPersian = (input: string | number): string | undefined => {
    if (!input) return undefined;
    let str = `${input}`;
    for (let i = 0; i < 10; i++) {
      str = str.replace(englishNumberRegex[i], `${persianNumbers[i]}`);
    }
    return `${str}`;
  };
