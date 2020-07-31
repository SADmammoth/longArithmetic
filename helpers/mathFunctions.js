function round(num) {
  let int = parseInt(num);
  return num < int + 0.5 ? int : int + 1;
}

function ceil(num) {
  let int = parseInt(num);
  return num > int ? int + 1 : int;
}

function abs(num) {
  return num < 0 ? -num : num;
}

export { round, ceil, abs };
