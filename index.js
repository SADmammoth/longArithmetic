(function () {
  let long = new Long('8000000000');
  let long2 = new Long('10000000000');
  console.log(long.toString(), long2.toString(), long.add(long2).toString());
})();
