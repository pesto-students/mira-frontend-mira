export interface IcustomEventObj<T = string> {
  target: {
    name: string;
    value: T;
  };
}
