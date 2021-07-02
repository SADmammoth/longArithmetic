export default (self) => {
  return new self._constructor([...self.number.map((num) => num * -1)]);
};
