export default function sliceInt(int, limit, chunk, checkLength = false) {
  if (limit <= 0) {
    return 0;
  }

  let numberLength = chunk;
  if (!chunk) {
    numberLength = calcLength(int);
  } else if (checkLength) {
    if (calcLength(int) !== chunk) {
      throw new Error('Chunk length is less than number length');
    }
  }
  return parseInt(int / 10 ** (numberLength - limit));
}

function calcLength(int) {
  return int.toString(10).length;
}
