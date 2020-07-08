(function () {
  console.time();
  let long = new Long('1234');
  let long2 = new Long('4321');
  console.log(long2,long.multiply(long2), long.multiply(long2).toString());
  console.timeLog();
})();

function generateNum(randomCount) {
  let numb = [];
  for (let i = 0; i <= randomCount; i++) {
    numb.push(Math.random().toString(10).slice(2));
  }
  return numb.join('');
}
