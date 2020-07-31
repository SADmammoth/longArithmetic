import str from '../numberToString';
import { abs } from '../mathFunctions';

export default function toString(self, chunk) {
  let { number: selfNum, degree } = self;
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
}
