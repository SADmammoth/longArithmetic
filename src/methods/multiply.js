import operation from '../helpers/operation';
import int from '../helpers/stringToInt';
import str from '../helpers/stringToInt';

export default (long) => {
  const Long = long._constructor;

  if (!self.lastChunk || !long.lastChunk) {
    return new Long(0);
  }

  let sums = [];
  let a;

  let { newLong } = operation(self, long, (index, overflow, small, big) => {
    sums = [];
    a = small.number[index] || 0;

    big.number.forEach((num) => sums.push(a * num));

    let res = int(
      str(
        sums.reduce((acc, sum, sumIndex) => {
          if (!sum) {
            return acc;
          }

          return acc.add(new Long(str(sum).padEnd((sumIndex + index) * chunk)));
        }, new Long(0))
      )
    );

    return {
      sum: new Long(str(res)).add(new Long(str(overflow))),
      overflow: res,
    };
  });

  return newLong[0];
};
