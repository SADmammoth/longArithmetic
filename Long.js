function Long(numberString, degree) {
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
        (self.number[0] < 0 || self.number[self.number.length - 1] < 0
          ? '-'
          : '') +
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
      return operation(self, long, chunk, (a, b, o) => a + b + o, false);
    },
    subtract: (long) => {
      return operation(
        self,
        long,
        chunk,
        (a, b, o) => {
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
            return 10 ** chunk + res - a + 10 ** chunk;
            // if (ch(b) < chunk) {
            //   return 10 ** chunk + res;
            // }
            // return res;
          }
          return b - a + o;
          // console.log(a > b ? 10 ** chunk + ch - a + b + o : b - a + o);
          return a > b ? 10 ** chunk + ch - a + b + o : b - a + o;
        },
        true
      );
    },
    multiply: (long) => {
      return operation(self, long, chunk, (a, b) => a * b, false);
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
  };

  Object.entries(methods).forEach(([name, method]) => (self[name] = method));

  return self;
}

function getLast(int, count) {
  return int % 10 ** count;
}

function sliceInt(int, limit, chunk) {
  return int / 10 ** (chunk - limit);
}

function sliceNumber(number, limit, chunk) {
  if (limit >= chunk * number.length) {
    return number;
  }

  let int = parseInt(limit / chunk);
  let mod = limit % chunk;

  if (limit < chunk) {
    return [parseInt(sliceInt(number[0], limit))];
  }

  if (!mod) {
    return sliceByChunk();
  }

  return [
    ...number.slice(0, int),
    parseInt(sliceInt(sliceByChunk()[int], mod)),
  ];
}

function sliceByChunk() {
  return number.slice(0, int + 1);
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
  // console.log(small, big);
  let sum = 0;
  let overflow = 0;
  let newLong = [];
  let newDegree = big.degree;

  let negativeResult = big.number[0] < 0 || !comparison;
  let currentChunk;
  let i;
  let j = 1;

  for (i = 0; i < big.number.length; i++) {
    if (small.number[i] === undefined) {
      sum = big.number[i] + overflow;
      // console.log(sum);
    } else {
      // console.log('k');
      sum = numberOperation(small.number[i], big.number[i], overflow);
    }

    overflow = parseInt(sum / 10 ** chunk);
    if (negativeOverflow) {
      overflow = -overflow;
    }

    if (sum !== 0) {
      if (negativeResult) {
        sum = -abs(sum);
      } else {
        sum = abs(sum);
      }
    }
    newLong.push(getLast(sum, chunk));
  }
  if (overflow !== 0) {
    newLong.push(overflow);
    newDegree += overflow.toString(10).length;
  }

  // console.log(newLong);
  return new Long(newLong, newDegree);
}
