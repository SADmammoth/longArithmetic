(function () {
  let long = new Long(Math.random().toString(10).slice(2));
  let long2 = new Long(Math.random().toString(10).slice(2));
  console.log(long, long2, long.toString(), long2.toString(), long.add(long2));
  // console.log(splitLittleEndian('1234567881232223', 4));
})();
