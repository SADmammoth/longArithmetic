function Long(numberString, degree) {
  let chunk = 10;
  let number;
  let numberLength = degree;
  if (typeof numberString === 'number') {
    number = [parseInt(numberString.toString(10).slice(0, chunk))];
    if (!degree) numberLength = numberString.toString(10).length;
  } else if (numberString instanceof Array) {
    number = numberString;
  } else {
    if (!degree) numberLength = numberString.length;
    number = splitLittleEndian(numberString, chunk);
  }

  let self = {
    number,
    degree: numberLength,
  };

  let methods = {
    toString: () => {
      return [...self.number]
        .reverse()
        .map((number, index) => {
          if (index) {
            return number.toString(10).padStart(chunk, '0');
          }
          return number.toString(10);
        })
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
      let small;
      let big;
      if (long.degree < self.degree) {
        small = { ...long, number: [...long.number] };
        big = { ...self, number: [...self.number] };
      } else {
        big = { ...long, number: [...long.number] };
        small = { ...self, number: [...self.number] };
      }

      let sum = 0;
      let overflow = 0;
      let newLong = [];
      let newDegree = big.degree;
      for (let i = 0; i <= big.number.length - 1; i++) {
        if (small.number[i] === undefined) {
          sum = big.number[i] + overflow;
        } else {
          sum = small.number[i] + big.number[i] + overflow;
        }
        overflow = parseInt(sum / 10 ** chunk);

        newLong.push(getLast(sum, chunk));
      }

      if (overflow !== 0) {
        newLong.push(overflow);
        newDegree += overflow.toString(10).length;
      }
      return new Long(newLong, newDegree);
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
