function Long(numberString, degree) {
  let chunk = 8;
  let number;
  let numberLength = degree;
  if (typeof numberString === 'number') {
    number = [parseInt(numberString.toString(10).slice(0, chunk))];
    if (!degree) numberLength = numberString.toString(10).length;
  } else {
    if (!degree) numberLength = numberString.length;
    number = numberString
      //.replace(/((?:^.*[^0])|(?:^))[0]+$/,'$10')
      .match(new RegExp(`[0-9]{1,${chunk}}`, 'g'))
      .map((el) => parseInt(el));
  }

  let self = {
    number,
    degree: numberLength,
  };

  let methods = {
    toString: () => {
      return self.number.join('');
    },
    slice: (limit) => {
      return new Long(sliceNumber(self.number, limit).join(''));
    },
    mutatingSlice: (limit) => {
      self.number = sliceNumber(self.number, limit);
    },
    add: (long) => {
      if (self.number[0].length <= chunk && long.number[0].length <= chunk) {
        return new Long(
          self.number[0] * 10 ** self.degree + long.number[0] * 10 ** sf.degree
        );
      }
      let overflow = 0;
      let newNumber = [];

      function sum(left, right, overflow) {
        return left + right + overflow;
      }

      let prevSum =
        self.number[self.number.length - 1] +
        long.number[long.number.length - 1];
      let numLength = (num) => num.toString(10).length;
      let newDegree;
      if (long.degree <= self.degree) {
        newDegree = self.degree;
      } else {
        newDegree = long.degree;
      }

      if (
        self.number[self.number.length - 1] === 0 &&
        long.number[long.number.length - 1] !== 0
      ) {
        let power = self.degree - chunk * (self.number.length - 1);
        console.log(power, self.degree);
        prevSum =
          10 ** power + long.number[long.number.length - 1] - 10 ** power;
        console.log();
        overflow = parseInt(prevSum / 10 ** power);
      } else {
        overflow = parseInt(prevSum / 10 ** chunk);
      }
      newNumber.push(getLast(prevSum, chunk));
      console.log(overflow, newNumber, long.number[long.number.length - 1]);
      for (let i = self.number.length - 2; i >= 0; i--) {
        prevSum = self.number[i] + long.number[i] + overflow;
        overflow = parseInt(prevSum / 10 ** chunk);
        newNumber.push(getLast(prevSum, chunk));
      }

      console.log(overflow, newNumber);

      if (overflow !== 0) {
        newNumber.push(overflow);
        newDegree += overflow.toString(10).length;
      }

      return new Long(newNumber.reverse().join(''), newDegree);
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
