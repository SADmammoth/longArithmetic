import { abs } from './mathFunctions';

export default function operation(self, long, numberOperation) {
  let small;
  let big;
  let comparison = self.compareModule(long) > 0;

  if (comparison) {
    small = { ...long, number: [...long.number] };
    big = { ...self, number: [...self.number] };
  } else {
    big = { ...long, number: [...long.number] };
    small = { ...self, number: [...self.number] };
  }

  let sum;
  let overflow = 0;
  let newLong = [];

  let negativeResult = big.number[0] < 0;
  let i;

  for (i = 0; i < big.number.length; i++) {
    if (small.number[i] === undefined) {
      ({ sum, overflow } = numberOperation(
        i,
        overflow,
        new self._constructor(0),
        big
      ));
    } else {
      ({ sum, overflow } = numberOperation(i, overflow, small, big));
    }

    if (sum !== 0) {
      if (negativeResult) {
        sum = -abs(sum);
      } else {
        sum = abs(sum);
      }
    }
    newLong.push(sum);
  }
  let newDegree = big.degree;
  let diff =
    newLong[newLong.length - 1].toString(10).length -
    big.number[big.number.length - 1].toString(10).length;

  if (diff > 0) {
    newDegree += diff;
  }

  if (overflow != 0) {
    newLong.push(overflow);
    newDegree += overflow.toString(10).length;
  }

  return { newLong, newDegree };
}
