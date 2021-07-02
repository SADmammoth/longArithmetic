import { abs } from '../helpers/mathFunctions';
import len from '../helpers/numberLength';

export default (self, long) => {
  if (self.degree !== long.degree) {
    if (self.degree < long.degree) {
      return -1;
    } else if (self.degree > long.degree) {
      return 1;
    }
  }

  for (let i = long.number.length - 1; i >= 0; i--) {
    if (abs(self.number[i]) < abs(long.number[i])) {
      return -1;
    }
    if (abs(self.number[i]) > abs(long.number[i])) {
      return 1;
    }
  }
  return 0;
};
