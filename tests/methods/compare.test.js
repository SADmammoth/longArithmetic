import testOperation from '../helpers/testOperation';

const compare = (a, b) => {
  const newA = parseInt(a);
  const newB = parseInt(b);
  return newA === newB ? 0 : newA < newB ? -1 : 1;
};

describe('Long.compare', () => {
  describe('Works for 10 of [1,100000] numbers', () => {
    testOperation(
      10,
      [0, 100000],
      compare,
      (a, b) => a.compare(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      },
      [-100000, 0]
    );
  });

  describe('Works for 10 of [1,100000] numbers', () => {
    testOperation(
      10,
      [-100000, 0],
      compare,
      (a, b) => a.compare(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      },
      [0, 100000]
    );
  });

  describe('Works for 10 of [1,100000] numbers', () => {
    testOperation(
      10,
      [-100000, 0],
      compare,
      (a, b) => a.compare(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      },
      [-100000, 0]
    );
  });

  describe('Works for 10 of [1,100000] numbers', () => {
    testOperation(
      10,
      [0, 100000],
      compare,
      (a, b) => a.compare(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      },
      [0, 100000]
    );
  });
});
