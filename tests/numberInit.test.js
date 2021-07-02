import numberInit from '../src/helpers/numberInit';

describe('Number init', () => {
  test('Number initialized', () => {
    const numberInput = '123456789';
    const chunk = 4;
    const maxDegree = 100;
    const degree = 9;

    const { number, numberLength } = numberInit(
      numberInput,
      chunk,
      maxDegree,
      degree
    );

    expect(number).toStrictEqual([6789, 2345, 1]);
    expect(numberLength).toStrictEqual(9);
  });

  test('Negative number initialized', () => {
    const numberInput = '-123456789';
    const chunk = 4;
    const maxDegree = 100;
    const degree = 9;

    const { number, numberLength } = numberInit(
      numberInput,
      chunk,
      maxDegree,
      degree
    );

    expect(number).toStrictEqual([-6789, -2345, -1]);
    expect(numberLength).toStrictEqual(9);
  });

  test('Negative number initialized', () => {
    const numberInput = '-3251';
    const chunk = 4;
    const maxDegree = 100;
    const degree = 4;

    const { number, numberLength } = numberInit(
      numberInput,
      chunk,
      maxDegree,
      degree
    );

    expect(number).toStrictEqual([-3251]);
    expect(numberLength).toStrictEqual(4);
  });
});
