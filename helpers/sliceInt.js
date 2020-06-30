export default function sliceInt(int, limit, chunk) {
  return int / 10 ** (chunk - limit);
}
