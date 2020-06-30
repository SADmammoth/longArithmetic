function Long(numberString) {
  let chunk = 8;

  let number;
  if (typeof numberString === 'number') {
    console.log(numberString);
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
  };

  Object.entries(methods).forEach(([name, method]) => (self[name] = method));

  return self;
}
