import sliceInt from './helpers/sliceInt';
import sliceNumber from './helpers/sliceNumber';

export default function Long(numberString, degree) {
  let chunk = 4;

  let number;
  let numberLength = degree;
  if (typeof numberString === 'number') {
    number = [parseInt(numberString.toString(10).slice(0, chunk))];
    if (!degree) numberLength = numberString.toString(10).length;
  } else if (numberString instanceof Array) {
    if (!numberString.filter((num) => !!num).length) {
      number = [0];
      numberLength = 1;
    } else {
      number = numberString;
    }
  } else {
    numberString = numberString.replace(/^0+(?=[^0])/g, '');
    if (!degree)
      numberLength =
        numberString[0] === '-' ? numberString.length - 1 : numberString.length;

    number = splitLittleEndian(numberString, chunk);
  }

  let self = {
    number,
    degree: numberLength,
  };

  let methods = {
    toString: () => {
      return (
        (self.number[self.number.length - 1] < 0 ? '-' : '') +
        [...self.number]
          .reverse()
          .map((number, index) => {
            if (index) {
              return abs(number).toString(10).padStart(chunk, '0');
            }
            return abs(number).toString(10);
          })
          .join('')
          .slice(0, self.degree)
      );
    },
    slice: (limit) => {
      return new Long(sliceNumber(self.number, limit).join(''));
    },
    mutatingSlice: (limit) => {
      self.number = sliceNumber(self.number, limit);
    },
    add: (long) => {
      if (!self.number[self.number.length - 1]) {
        return long;
      } else if (!long.number[long.number.length - 1]) {
        return self;
      }
      let { newLong, newDegree } = operation(
        self,
        long,
        chunk,
        (i, o, small, big) => {
          let sum;
          let a = small.number[i];
          let b = big.number[i];
          if (!small.number[i]) {
            sum = b + o;
            return {
              sum: getLast(sum, chunk),
              overflow: parseInt(sum / 10 ** chunk),
            };
          }
          if (!big.number[i]) {
            sum = a + o;
            return {
              sum: getLast(sum, chunk),
              overflow: parseInt(sum / 10 ** chunk),
            };
          }
          sum = a + b + o;
          return {
            sum: getLast(sum, chunk),
            overflow: parseInt(sum / 10 ** chunk),
          };
        },
        false
      );
      return new Long(newLong, newDegree);
    },
    subtract: (long) => {
      let { newLong, newDegree } = operation(
        self,
        long.negate(),
        chunk,
        (i, o, small, big) => {
          let sum;
          let a = small.number[i];
          let b = big.number[i];
          if (a > b) {
            let ch = (b) => b.toString(10).length;
            let res = b + o;

            // while (res < a) {
            //   console.log(10 ** ch(res) + res - a, res, ch(res), chunk);
            //   res = 10 ** ch(res) + res - a + 9 * 10 ** ch(res);

            //   // console.log(10 ** ch(res) + res - a, res, ch(res), chunk);
            // }

            // for (let i = ch(b); i < chunk; i++) {
            //   res += 9 * 10 ** i;
            // }
            // console.log(res);
            sum = 10 ** chunk + res - a + 10 ** chunk;
            return {
              sum: getLast(sum, chunk),
              overflow: -parseInt(sum / 10 ** chunk),
            };
            // if (ch(b) < chunk) {
            //   return 10 ** chunk + res;
            // }
            // return res;
          }
          sum = b - a + o;
          return {
            sum: getLast(sum, chunk),
            overflow: -parseInt(sum / 10 ** chunk),
          };
        },
        true
      );
      return new Long(newLong, newDegree);
    },
    multiply: (long) => {
      if (
        !self.number[self.number.length - 1] ||
        !long.number[long.number.length - 1]
      ) {
        return new Long(0);
      }
      let sums = [];
      let { newLong, newDegree } = operation(
        self,
        long,
        chunk,
        (i, o, small, big) => {
          let sum;
          sums = [];
          // if (!small.number[small.number.length - 1]) {
          //   sum = parseInt(new Long(o.toString() + '00').toString());
          //   return {
          //     sum,
          //     overflow: 0,
          //   };
          // }
          let a = small.number[i] || 0;
          let b = big.number[i];
          big.number.forEach((num) => sums.push(a * num));

          let res = parseInt(
            sums
              .reduce((acc, el, ind) => {
                // console.log(
                //   el.toString(10) +
                //     Array(ind * chunk + i)
                //       .fill('0')
                //       .join(''),
                //   new Long(
                //     el.toString(10) +
                //       Array(ind * chunk + i)
                //         .fill('0')
                //         .join('')
                //   )
                // );
                if (!el) {
                  return acc;
                }

                return acc.add(
                  new Long(
                    el.toString(10) +
                      Array((ind + i) * chunk)
                        .fill('0')
                        .join('')
                  )
                );
              }, new Long(0))
              .toString()
          );

          return {
            sum: res,
            overflow: 0,
          };
        },
        false,
        true
      );

      return newLong.reduce((acc, el, i) => {
        return acc.add(new Long(el.toString()));
      }, new Long(0));
    },
    divide: (long) => {
      return operation(self, long, chunk, (a, b) => a / b, true);
    },
    compare: (long) => {
      let selfIsNeg = self.number[0] < 0;
      let longIsNeg = long.number[0] < 0;
      if (selfIsNeg && !longIsNeg) {
        return -1;
      }
      if (!selfIsNeg && longIsNeg) {
        return 1;
      }
      if (!self.number[0] && long.number[0] > 0) {
        return -1;
      }
      if (!long.number[0] && self.number[0] > 0) {
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
      for (let i = long.number.length - 1; i >= 0; i--) {
        // console.log(abs(self.number[i]), abs(long.number[i]));
        if (abs(self.number[i]) < abs(long.number[i])) {
          return -1;
        }
        if (abs(self.number[i]) > abs(long.number[i])) {
          return 1;
        }
      }
      return 0;
    },
    slice: (limit) => {
      return {
        number: sliceNumber(self.number, limit, chunk),
        ...methods,
      };
    },
    mutatingSlice: (limit) => {
      self.number = sliceNumber(self.number, limit, chunk);
    },
  };

  Object.entries(methods).forEach(([name, method]) => (self[name] = method));

  return self;
}

function getLast(int, count) {
  return int % 10 ** count;
}

function splitLittleEndian(str, chunk) {
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
  // console.log(str);
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

function round(num) {
  let int = parseInt(num);
  return num < int + 0.5 ? int : int + 1;
}

function ceil(num) {
  let int = parseInt(num);
  return num > int ? int + 1 : int;
}

function abs(num) {
  return num < 0 ? -num : num;
}

function operation(self, long, chunk, numberOperation, negativeOverflow) {
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

  // if (!small.number[small.number.length - 1]) {
  //   let check = numberOperation(0, 0, new Long(0), new Long(1));
  //   console.log(check);
  //   if (!check) {
  //     return { newLong: [0], newDegree: 1 };
  //   } else if (check === 1) {
  //     return { newLong: long.number, newDegree: long.degree };
  //     return check;
  //   }
  // }
  // console.log(small, big);
  let sum;
  let overflow = 0;
  let newLong = [];

  let negativeResult = big.number[0] < 0;
  let i;
  let j = 1;

  for (i = 0; i < big.number.length; i++) {
    if (small.number[i] === undefined) {
      ({ sum, overflow } = numberOperation(i, overflow, new Long(0), big));
      // console.log(sum);
    } else {
      // console.log('k');
      ({ sum, overflow } = numberOperation(i, overflow, small, big));
    }

    // if (negativeOverflow) {
    //   overflow = -overflow;
    // }

    if (sum !== 0) {
      if (negativeResult) {
        sum = -abs(sum);
      } else {
        sum = abs(sum);
      }
    }
    newLong.push(sum);
  }
  // if (overflow !== 0) {
  //   if (newLong[newLong.length - 1] < 10 ** (chunk - 1)) {
  //     newLong[newLong.length - 1] +=
  //       overflow * 10 ** newLong[newLong.length - 1].toString.length;
  //     overflow = parseInt(newLong[newLong.length - 1] / 10 ** chunk);
  //   }
  // }

  // let newDegree =
  //   big.degree +
  //   (newLong[newLong.length - 1].toString(10).length -
  //     big.number[big.number.length - 1].toString(10).length);
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

  // console.log(newLong);в
  return { newLong, newDegree };
}
