import testOperation from '../helpers/testOperation';

describe('Long.add', () => {
  describe('Works for 10 of [1,100000] numbers', () => {
    testOperation(
      10,
      [1, 100000],
      (a, b) => parseInt(a) + parseInt(b),
      (a, b) => a.add(b),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });
});
