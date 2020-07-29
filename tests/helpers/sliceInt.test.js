import sliceInt from '../helpers/sliceInt';

describe('sliceInt', () => {
  test('Slices digits of integer correctly (valid input)', () => {
    let integer = 123456789;
    let limit = 5;
    let chunk = 9;

    let actual = sliceInt(integer, limit, chunk);

    let expected = 12345;

    expect(actual).toBe(expected);
  });
  test('Slices digits of integer correctly (valid input, calculated length)', () => {
    let integer = 123456789;
    let limit = 5;

    let actual = sliceInt(integer, limit);

    let expected = 12345;

    expect(actual).toBe(expected);
  });
  test('Slices digits of integer correctly (invalid input)', () => {
    let integer = 123456789;
    let limit = 5;
    let chunk = 10;
    sliceInt(integer, limit, chunk);

    let actual = () => sliceInt(integer, limit, chunk, true);

    expect(actual).toThrow(Error);
  });
  test('Works for limit 0', () => {
    let integer = 123456789;
    let limit = 0;
    let chunk = 10;

    let actual = sliceInt(integer, limit, chunk);

    let expected = 0;

    expect(actual).toBe(expected);
  });
  test('Works for negative limit', () => {
    let integer = 123456789;
    let limit = -2;
    let chunk = 10;

    let actual = sliceInt(integer, limit, chunk);

    let expected = 0;

    expect(actual).toBe(expected);
  });
});
