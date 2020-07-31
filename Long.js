import sliceNumber from './helpers/methods/sliceNumber';
import getOverflow from './helpers/getOverflow';
import getLast from './helpers/getLast';
import operation from './helpers/operation';
import { abs } from './helpers/mathFunctions';
import numberInit from './helpers/numberInit';
import isZero from './helpers/isZero';
import len from './helpers/numberLength';
import str from './helpers/numberToString';
import int from './helpers/stringToInt';
import toString from './helpers/methods/toString';

let config = {
  chunk: 4,
  maxDegree: 1000,
};

export default function Long(numberInput, degree) {
  let { chunk, maxDegree } = config;

  let { number, numberLength } = numberInit(
    numberInput,
    chunk,
    maxDegree,
    degree
  );

  let self = {
    number,
    degree: numberLength,
  };

  self.number.last = self.number[self.number.length - 1];

  let methods = {
    toString: () => {
      return toString(self, chunk);
    },

    isNegative: () => {
      return self.number.last < 0;
    },

    slice: (limit) => {
      return new Long(sliceNumber(self.number, limit).join(''));
    },

    mutatingSlice: (limit) => {
      self.number = sliceNumber(self.number, limit);
    },

    add: (long) => {
      if (!self.number.last) {
        return long;
      } else if (!long.number.last) {
        return self;
      }

      function returnRes(sum) {
        return {
          sum: getLast(sum, chunk),
          overflow: getOverflow(sum, chunk),
        };
      }

      let { newLong, newDegree } = operation(
        self,
        long,
        (index, overflow, small, big) => {
          let a = small.number[index];
          let b = big.number[index];

          if (!a) {
            return returnRes(b + overflow);
          }

          if (!b) {
            return returnRes(a + overflow);
          }

          return returnRes(a + b + overflow);
        }
      );

      return new Long(newLong, newDegree);
    },

    subtract: (long) => {
      let { newLong, newDegree } = operation(
        self,
        long.negate(),
        (index, overflow, small, big) => {
          let sum;
          let a = small.number[index];
          let b = big.number[index];

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

      return new Long(newLong, newDegree);
    },

    multiply: (long) => {
      if (!self.number.last || !long.number.last) {
        return new Long(0);
      }

      let sums = [];

      let { newLong } = operation(self, long, (index, overflow, small, big) => {
        sums = [];
        let a = small.number[index] || 0;

        big.number.forEach((num) => sums.push(a * num));

        let res = int(
          sums
            .reduce((acc, sum, sumIndex) => {
              if (!sum) {
                return acc;
              }

              return acc.add(
                new Long(str(sum).padEnd((sumIndex + index) * chunk))
              );
            }, new Long(0))
            .toString()
        );

        return {
          sum: res,
          overflow: 0,
        };
      });

      return newLong.reduce((acc, el, i) => {
        return acc.add(new Long(str(el)));
      }, new Long(0));
    },

    divide: (long) => {
      return operation(self, long, (a, b) => a / b);
    },

    compare: (long) => {
      let selfIsNeg = self.isNegative();
      let longIsNeg = long.isNegative();
      let selfIsZero = isZero(self);
      let longIsZero = isZero(long);
      let selfIsPos = !self.isNegative() && !selfIsZero;
      let longIsPos = !long.isNegative() && !longIsZero;

      if (selfIsNeg && !longIsNeg) {
        return -1;
      }
      if (!selfIsNeg && longIsNeg) {
        return 1;
      }

      if (selfIsZero && longIsPos) {
        return -1;
      }

      if (longIsZero && selfIsPos) {
        return 1;
      }

      return self.compareModule(long);
    },

    negate: () => {
      return { ...self, number: [...self.number.map((num) => -num)] };
    },

    compareModule: (long) => {
      if (self.degree !== long.degree) {
        if (self.degree < long.degree) {
          return -1;
        } else if (self.degree > long.degree) {
          return 1;
        } else {
          return 0;
        }
      }

      for (let i = len(long); i >= 0; i--) {
        if (abs(self.number[i]) < abs(long.number[i])) {
          return -1;
        }
        if (abs(self.number[i]) > abs(long.number[i])) {
          return 1;
        }
      }
      return 0;
    },
  };

  Object.entries(methods).forEach(([name, method]) => (self[name] = method));

  return self;
}

export { config };
