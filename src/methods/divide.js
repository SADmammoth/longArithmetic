import operation from '../helpers/operation';

export default (self, long) => {
  return operation(self, long, (a, b) => a / b);
};
