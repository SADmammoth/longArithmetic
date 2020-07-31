import sliceNumber from '../../helpers/methods/sliceNumber';

describe('sliceNumber', () => {
  test('Returns original number, when limit is more than number length', () => {
    let number = [123, 456, 789];
    let limit = 10;
    let chunk = 3;

    let actual = sliceNumber(number, limit, chunk);

    let expected = number;

    expect(actual).toBe(expected);
  });
  test('Slices number correct, when limit is less than chunk', () => {
    let number = [123, 456, 789];
    let limit = 2;
    let chunk = 3;

    let actual = sliceNumber(number, limit, chunk);

    let expected = [12];

    expect(actual).toStrictEqual(expected);
  });
  test('Slices number correct, when limit is divider of chunk', () => {
    let number = [123, 456, 789];
    let limit = 6;
    let chunk = 3;

    let actual = sliceNumber(number, limit, chunk);

    let expected = [123, 456];

    expect(actual).toStrictEqual(expected);
  });
  test('Slices number correct, when limit is not divider of chunk', () => {
    let number = [123, 456, 789];
    let limit = 4;
    let chunk = 3;

    let actual = sliceNumber(number, limit, chunk);

    let expected = [123, 4];

    expect(actual).toStrictEqual(expected);
  });
  test('Slices number correct, when limit is 0', () => {
    let number = [123, 456, 789];
    let limit = 0;
    let chunk = 3;

    let actual = sliceNumber(number, limit, chunk);

    let expected = [0];

    expect(actual).toStrictEqual(expected);
  });
  test('Slices number correct, when limit is negative', () => {
    let number = [123, 456, 789];
    let limit = -10;
    let chunk = 3;

    let actual = sliceNumber(number, limit, chunk);

    let expected = [0];

    expect(actual).toStrictEqual(expected);
  });
});
