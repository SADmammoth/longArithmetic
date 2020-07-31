import numberLength from './numberLength';

import len from './numberLength';
import str from './numberToString';
import int from './stringToInt';
import isNumberArray from './isNumberArray';
import splitLittleEndian from './splitLittleEndian';

export default function numberInit(numberInput, chunk, maxDegree, degree) {
  let number;
  let numberLength = degree;
  if (typeof numberInput === 'number') {
    number = [int(str(numberInput).slice(0, chunk))];
    numberLength = len(number);
  } else if (numberInput instanceof Array) {
    if (!isNumberArray(numberInput)) {
      number = [0];
      numberLength = 1;
    } else {
      number = numberInput;
    }
  } else {
    numberInput = numberInput.replace(/^0+(?=[^0])/g, '');
    numberLength =
      numberInput[0] === '-' ? numberInput.length - 1 : numberInput.length;
    number = splitLittleEndian(numberInput, chunk);
  }

  if (numberLength > maxDegree) {
    throw Error('Max number size limit exceeded');
  }

  return { number, numberLength };
}
