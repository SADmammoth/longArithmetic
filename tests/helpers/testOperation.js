import numberGenerator from './numberGenerator';
import Long from '../../src/Long';

export default function testOperation(
  numbersCount,
  numberRange = [1, 10],
  originalOperation,
  implementedOperation,
  assert,
  secondNumberRange
) {
  for (let i = 0; i < numbersCount; i++) {
    let number1, number2;

    if (typeof numberRange === 'number') {
      number1 = numberGenerator(0, 0, numberRange);
    } else {
      number1 = numberGenerator(...numberRange);
    }

    if (!secondNumberRange) secondNumberRange = numberRange;

    if (typeof secondNumberRange === 'number') {
      number2 = numberGenerator(0, 0, secondNumberRange);
    } else {
      number2 = numberGenerator(...secondNumberRange);
    }

    let long1 = new Long(number1);
    let long2 = new Long(number2);

    let actual = implementedOperation(long1, long2).toString();
    let expected = originalOperation(number1, number2).toString();

    assert(expected, actual, `${number1}, ${number2}`);
  }
}
