// https://gist.github.com/KEIII/a7d09b745db1590a4e1c5a6601781add

export type Some<T> = { _tag: "Some"; some: T };
export type None = { _tag: "None" };
export type Option<T> = Some<T> | None;
const Some = <T>(some: T): Option<T> => ({ _tag: "Some", some });
const None = <T>(): Option<T> => ({ _tag: "None" });
export const Option = Object.freeze({ Some, None });

