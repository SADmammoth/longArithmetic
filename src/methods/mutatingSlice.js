import sliceNumber from '../helpers/sliceNumber';

export default (self, limit) => {
  self.number = sliceNumber(self.number, limit);
};
