import str from '../helpers/numberToString';
import { abs } from '../helpers/mathFunctions';

export default (self) => {
  let { number: selfNum, degree, chunk } = self;
  let string = [...selfNum]
    .reverse()
    .map((number, index) => {
      if (index) {
        return str(abs(number)).padStart(chunk, '0');
      }
      return str(abs(number));
    })
    .join('')
    .slice(0, degree);

  return (self.isNegative() ? '-' : '') + string;
};
