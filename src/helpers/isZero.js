export default function isZero(long, index) {
  if (index) {
    return !long.number[index];
  }
  return !long.lastChunk;
}
