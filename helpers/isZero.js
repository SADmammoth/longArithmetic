import Long from '../Long';

export default function isZero(long, index) {
  if (index) {
    return !long.number[index];
  }
  return !long.number.last;
}
