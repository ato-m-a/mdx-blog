const switchCase = <T extends string | number, R = VoidFunction>(value: T, cases: Record<T, R>) =>
  cases[value];

export default switchCase;
