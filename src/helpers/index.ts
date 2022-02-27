export function percentual(number = 0) {
  return number / 100;
}

export function normalize(number = 0) {
  return 1 + percentual(number);
}

export function randomString() {
  return (Math.random() + 1).toString(16).substring(2);
}
