import Long from '../../src/Long';
import testOperation from '../helpers/testOperation';

describe('Long.negate', () => {
  describe('Negates positive numbers', () => {
    testOperation(
      10,
      [0, 100000],
      (a) => '-' + a,
      (a) => a.negate().toString(),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });

  describe('Negates negative numbers', () => {
    testOperation(
      10,
      [-100000, 0],
      (a) => a.toString().slice(1),
      (a) => a.negate().toString(),
      (expected, actual, message) => {
        test(message, () => {
          expect(actual).toBe(expected);
        });
      }
    );
  });

  test('Present negative number in correct form', () => {
    const long = new Long('123456789');

    expect(long.negate().number).toStrictEqual([-6789, -2345, -1]);
  });

  test('Present positive number in correct form', () => {
    const long = new Long('-123456789');
    expect(long.negate().number).toStrictEqual([6789, 2345, 1]);
  });
});
