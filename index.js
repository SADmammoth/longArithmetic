(function () {
  console.time();
  let long = new Long('30218');
  let long2 = new Long('512');
  console.log(long2,long.divide(long2), long.divide(long2).toString());
  console.timeLog();
})();

function generateNum(randomCount) {
  let numb = [];
  for (let i = 0; i <= randomCount; i++) {
    numb.push(Math.random().toString(10).slice(2));
  }
  return numb.join('');
}
