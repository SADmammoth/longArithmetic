(function () {
  for (let i = 0; i < 100; i++) {
    // console.time();
    let one = generateNum(1, 1, 100000);
    let two = generateNum(1, 1, 100000);
    // let one = '003';
    // let two = 55;
    let long = new Long(one);
    let long2 = new Long(two);
    // console.log(+one - two);
    // console.log(long.subtract(long2).toString());
    let res = parseInt(long.add(long2).toString());
    let expected = parseInt(one) + parseInt(two);
    if (expected !== res) {
      console.log('BAD', one, two, expected, res, long.add(long2));
      // alert('bad', one, two);
    }
    // console.timeLog();
  }
})();

function generateNum(randomCount, max, min) {
  let numb = [];
  for (let i = 0; i < randomCount; i++) {
    numb.push(
      parseInt(Math.random() * (max - min) + min).toString(10)
      // .slice(2)
    );
  }
  return numb.join('');
}
