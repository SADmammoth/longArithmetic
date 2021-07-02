import sliceNumber from '../helpers/sliceNumber';

export default (self, limit) => {
  return new long._constructor(sliceNumber(self.number, limit).join(''));
};
