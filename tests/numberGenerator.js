export default function numberGenerator(max, min, digits) {
  if (digits) {
    let result = [parseInt(Math.random() * (9 - 1) + 1).toString(10)];
    for (let i = 1; i < digits; i++) {
      result.push(parseInt(Math.random() * 9).toString(10));
    }
    return result.join('');
  }
  return parseInt(Math.random() * (max - min) + min).toString(10);
}
