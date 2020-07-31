import sliceInt from './sliceInt';

export default function sliceNumber(number, limit, chunk, checkLength = false) {
  if (limit <= 0) {
    return [0];
  }

  if (limit >= chunk * number.length) {
    return number;
  }

  if (checkLength) {
    if (
      number[0].length >= chunk ||
      (number.length > 1 && number[0] !== chunk)
    ) {
      throw new Error('Invalid chunk length or number format');
    }
  }

  let int = parseInt(limit / chunk);
  let mod = limit % chunk;

  if (limit < chunk) {
    return [sliceInt(number[0], limit, chunk)];
  }

  if (!mod) {
    return sliceByChunk(number, int);
  }

  return [
    ...number.slice(0, int),
    sliceInt(sliceByChunk(number, int + 1)[int], mod, chunk),
  ];
}

function sliceByChunk(number, int) {
  return number.slice(0, int);
}
