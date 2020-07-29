import testOperation from './testOperation';

describe('Long.add', () => {
  describe('Works for 10000 of [1,100] numbers', () => {
    testOperation(
      10000,
      [1, 100],
      (a, b) => parseInt(a) + parseInt(b),
      (a, b) => a.add(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });
  describe('Works for 10000 of [100,1000] numbers', () => {
    testOperation(
      10000,
      [100, 1000],
      (a, b) => parseInt(a) + parseInt(b),
      (a, b) => a.add(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });
  describe('Works for 10000 of [1000,10000] numbers', () => {
    testOperation(
      10000,
      [1000, 10000],
      (a, b) => parseInt(a) + parseInt(b),
      (a, b) => a.add(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });

  describe('Calculates sum of numbers up to 1000 digits', () => {
    let count = 1000;
    testOperation(
      1000,
      count,
      (a, b) => 0,
      (a, b) => a.add(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toMatch(new RegExp(`^[0-9]{${count},${count + 1}}$`));
        });
      }
    );
  });
});

describe('Long.multiply', () => {
  describe('Works for 10000 of [1,100] numbers', () => {
    testOperation(
      10000,
      [1, 100],
      (a, b) => parseInt(a) * parseInt(b),
      (a, b) => a.multiply(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });
  describe('Works for 10000 of [100,1000] numbers', () => {
    testOperation(
      10000,
      [100, 1000],
      (a, b) => parseInt(a) * parseInt(b),
      (a, b) => a.multiply(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });
  describe('Works for 10000 of [1000,10000] numbers', () => {
    testOperation(
      10000,
      [1000, 10000],
      (a, b) => parseInt(a) * parseInt(b),
      (a, b) => a.multiply(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });

  describe('Calculates sum of numbers up to 1000 digits', () => {
    let count = 1000;
    testOperation(
      1,
      count,
      (a, b) => 0,
      (a, b) => a.multiply(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toMatch(new RegExp(`^[0-9]{${count},${count + 1}}$`));
        });
      }
    );
  });
});
