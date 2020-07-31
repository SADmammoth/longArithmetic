import { ceil } from './mathFunctions';

export default function splitLittleEndian(str, chunk) {
  if (str.length <= chunk) {
    return [parseInt(str)];
  }
  let isNegative = str[0] === '-';
  let chunkCount = ceil(str.length / chunk);
  let number = new Array(chunkCount).fill('');
  let index;
  let string;
  if (isNegative) {
    str = str.slice(1);
  }
  for (let i = str.length - 1; i >= 0; i--) {
    string = str[i] + string;
    if ((str.length - i) % chunk === 0) {
      index = parseInt((str.length - i - 1) / chunk);
      number[index] = parseInt(string);
      if (isNegative) {
        number[index] = -number[index];
      }
      string = '';
    }
  }
  if (string) {
    number[index + 1] = parseInt(string);
    if (isNegative) {
      number[index + 1] = -number[index + 1];
    }
  }
  return number;
}
