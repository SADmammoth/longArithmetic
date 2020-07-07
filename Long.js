function Long(numberString, degree) {
  let chunk = 8;
  let number;
  let numberLength = degree;
  if (typeof numberString === 'number') {
    number = [parseInt(numberString.toString(10).slice(0, chunk))];
    if (!degree) numberLength = numberString.toString(10).length;
  } else {
    if (!degree) numberLength = numberString.length;
    number = splitLittleEndian(numberString, chunk);
    //.replace(/((?:^.*[^0])|(?:^))[0]+$/,'$10')
    // .match(new RegExp(`[0-9]{1,${chunk}}`, 'g'))
    // .map((el) => {
    //   console.log(el);
    //   return parseInt(el);
    // });
  }

  let self = {
    number,
    degree: numberLength,
  };

  let methods = {
    toString: () => {
      return self.number
        .map((number) => number.toString(10).padEnd(chunk, '0'))
        .reverse()
        .join('')
        .slice(0, self.degree);
    },
    slice: (limit) => {
      return new Long(sliceNumber(self.number, limit).join(''));
    },
    mutatingSlice: (limit) => {
      self.number = sliceNumber(self.number, limit);
    },
    add: (long) => {
      let small = { ...self, number: [...self.number] };
      let big = { ...long, number: [...long.number] };
      if (small.number[0].length <= chunk && big.number[0].length <= chunk) {
        return new Long(
          small.number[0] * 10 ** small.degree +
            big.number[0] * 10 ** self.degree
        );
      }
      let overflow = 0;
      let newNumber = [];
      function sum(left, right, overflow) {
        return left + right + overflow;
      }

      let prevSum = small.number[0] + big.number[0];
      let numLength = (num) => num.toString(10).length;
      let buffer;
      if (big.degree < small.degree) {
        buffer = small;
        small = big;
        big = buffer;
      }

      small.number = small.number.reverse();
      big.number = big.number.reverse();
      console.log(small, big);
      let bigLength = big.number.length;
      let smallLength = small.number.length;

      let obj;
      for (let i = 0; i <= bigLength - 1; i++) {
        obj = calcOverflow(small, big, chunk, overflow, i);
        prevSum = obj.prevSum;
        overflow = obj.overflow;
        newNumber.push(getLast(prevSum, chunk));
      }

      let newDegree = big.degree;
      if (overflow !== 0) {
        newNumber.push(overflow);
        newDegree += overflow.toString(10).length;
        return new Long(
          newNumber.reverse().join('').padEnd(newDegree, '0'),
          newDegree
        );
      }
      console.log(newNumber);
      return new Long(newNumber.reverse().join('').newDegree);
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

function calcOverflow(self, long, chunk, overflow, index) {
  let newOverflow;
  if (self.number[index] === undefined) {
    self.number[index] = 0;
  }
  let isLast =
    index === 0 &&
    (self.number[index].toString(10).length < chunk ||
      long.number[index].toString(10).length < chunk);

  let power = chunk;
  if (isLast) {
    let longLast = calcLast(long, chunk);
    let selfLast = calcLast(self, chunk);
    console.log(longLast, selfLast);
    power = longLast >= selfLast ? selfLast : longLast;
  }
  sum = long.number[index] + self.number[index] + overflow;
  newOverflow = parseInt(sum / 10 ** power);
  console.log(
    sum,
    power,
    self.number[index],
    long.number[index],
    overflow,
    newOverflow
  );

  return { prevSum: getLast(sum, power), overflow: newOverflow };
}

function calcLast(num, chunk) {
  console.log(num, chunk, 2);
  return num.degree - chunk * (num.number.length - 1);
}

function splitLittleEndian(str, chunk) {
  if (str.length <= chunk) {
    return [parseInt(str)];
  }
  let chunkCount = ceil(str.length / chunk);
  let number = new Array(chunkCount).fill('');
  let index;
  let string;
  for (let i = str.length - 1; i >= 0; i--) {
    string = str[i] + string;
    if ((str.length - i) % chunk === 0) {
      index = parseInt((str.length - i - 1) / chunk);
      number[index] = parseInt(string);
      string = '';
    }
  }
  if (string) {
    number[index + 1] = parseInt(string);
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
