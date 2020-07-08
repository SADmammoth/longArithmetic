(function () {
  console.time();
  let long = new Long('12345678');
  let long2 = new Long('-98765432');
  console.log(long2,long.add(long2), long.add(long2).toString());
  console.timeLog();
})();

function generateNum(randomCount) {
  let numb = [];
  for (let i = 0; i <= randomCount; i++) {
    numb.push(Math.random().toString(10).slice(2));
  }
  return numb.join('');
}
