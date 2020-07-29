import numberGenerator from './numberGenerator';
import Long from '../Long';

export default function testOperation(
  numbersCount,
  numberRange = [1, 10],
  originalOperation,
  implementedOperation,
  assert
) {
  for (let i = 0; i < numbersCount; i++) {
    let number1, number2;

    if (typeof numberRange === 'number') {
      number1 = numberGenerator(0, 0, numberRange);
      number2 = numberGenerator(0, 0, numberRange);
    } else {
      number1 = numberGenerator(...numberRange);
      number2 = numberGenerator(...numberRange);
    }

    let long1 = new Long(number1);
    let long2 = new Long(number2);

    let actual = implementedOperation(long1, long2).toString();
    let expected = originalOperation(number1, number2).toString();

    assert(expected, actual, `${number1}, ${number2}`);
  }
}
