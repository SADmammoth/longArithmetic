import operation from '../helpers/operation';
import getOverflow from '../helpers/getOverflow';
import getLast from '../helpers/getLast';

export default (long) => {
  let a;
  let b;
  let { newLong, newDegree } = operation(
    self,
    long.negate(),
    (index, overflow, small, big) => {
      let sum;
      a = small.number[index];
      b = big.number[index];

      if (a > b) {
        let res = b + overflow;
        sum = 10 ** chunk + res - a;
        return {
          sum: getLast(sum, chunk),
          overflow: -(getOverflow(sum, chunk) + 1),
        };
      }

      sum = b - a + o;
      return {
        sum: getLast(sum, chunk),
        overflow: -getOverflow(sum, chunk),
      };
    }
  );

  return new long._constructor(newLong, newDegree);
};
