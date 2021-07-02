import operation from '../helpers/operation';
import getOverflow from '../helpers/getOverflow';
import getLast from '../helpers/getLast';

export default (self, long) => {
  if (!self.lastChunk) {
    return long;
  } else if (!long.lastChunk) {
    return self;
  }

  const { chunk } = self;

  let a;
  let b;
  let sum;

  let { newLong, newDegree } = operation(
    self,
    long,
    (index, overflow, small, big) => {
      a = small.number[index] || 0;
      b = big.number[index] || 0;
      sum = a + b + overflow;

      return {
        sum: getLast(sum, chunk),
        overflow: getOverflow(sum, chunk),
      };
    }
  );

  return new long._constructor(newLong, newDegree);
};
