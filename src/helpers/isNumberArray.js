export default function isNumberArray(numberInput) {
  return !!numberInput.filter((num) => typeof num === 'number').length;
}
