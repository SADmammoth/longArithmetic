import isZero from '../helpers/isZero';

export default (self, long) => {
  let selfIsNeg = self.isNegative();
  let longIsNeg = long.isNegative();
  let selfIsZero = isZero(self);
  let longIsZero = isZero(long);
  let selfIsPos = !self.isNegative() && !selfIsZero;
  let longIsPos = !long.isNegative() && !longIsZero;

  if (selfIsNeg && !longIsNeg) {
    return -1;
  }
  if (!selfIsNeg && longIsNeg) {
    return 1;
  }

  if (selfIsZero && longIsPos) {
    return -1;
  }

  if (longIsZero && selfIsPos) {
    return 1;
  }

  if (selfIsNeg && longIsNeg) {
    return self.compareModule(long) * -1;
  }

  return self.compareModule(long);
};
