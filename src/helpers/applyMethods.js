export default function applyMethods(self, methods) {
  const newSelf = { ...self };
  Object.entries(methods).forEach(
    ([name, method]) => (newSelf[name] = (...args) => method(newSelf, ...args))
  );

  return newSelf;
}
