(function () {
  console.time();
  let long = new Long(generateNum(600000));
  let long2 = new Long(generateNum(600000));
  console.log(long.add(long2).toString());
  console.timeLog();
})();

function generateNum(randomCount) {
  let numb = [];
  for (let i = 0; i <= randomCount; i++) {
    numb.push(Math.random().toString(10).slice(2));
  }
  return numb.join('');
}
