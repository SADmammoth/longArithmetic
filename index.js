(function () {
  let count = 0;
  let all = 1;
  for (let i = 0; i < all; i++) {
    console.time();
    let one = generateNum(1000, 1, 10);
    let two = generateNum(1000, 1, 10);
    // let one = '231';
    // let two = '351';
    let long = new Long(one);
    let long2 = new Long(two);
    // console.log(+one - two);
    // console.log(long.subtract(long2).toString());
    let res = parseInt(long.multiply(long2).toString());
    if (+one * two !== res) {
      count++;
      console.log('BAD', one, two, +one * two, res, long.multiply(long2));
      // alert('bad', one, two);
    }
    console.timeLog();
  }
  console.log(all - count + ' of ' + all);
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
