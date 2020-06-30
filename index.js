(function () {
  let long = new Long(123456781);
  long.mutatingSlice(17);
  console.log(long);
})();
