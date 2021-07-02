import testOperation from '../helpers/testOperation';

describe('Long.toString', () => {
  describe('Returns string representation of number', () => {
    testOperation(
      10,
      [0, 100000],
      (a) => a.toString(),
      (a) => a.toString(),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });

  describe('Returns string representation of negative number', () => {
    testOperation(
      10,
      [-100000, 0],
      (a) => a.toString(),
      (a) => a.toString(),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });
});
