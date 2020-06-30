function Long(numberString) {
  let chunk = 8;

  let number;
  if (typeof numberString === 'number') {
    number = [parseInt(numberString.toString(10).slice(0, chunk))];
  } else {
    number = numberString
      .match(new RegExp(`[0-9]{1,${chunk}}`, 'g'))
      .map((el) => parseInt(el));
  }

  let self = {
    number,
  };

  let methods = {
    toString: () => {
      return self.number.join('');
    },
    slice: (limit) => {
      return {
        number: sliceNumber(self.number, limit),
        ...methods,
      };
    },
    mutatingSlice: (limit) => {
      self.number = sliceNumber(self.number, limit);
    },
  };

  Object.entries(methods).forEach(([name, method]) => (self[name] = method));

  return self;
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
