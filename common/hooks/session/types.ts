export type MutationOptions<T = undefined> = {
  onSuccess?: T extends undefined ? VoidFunction : (data: T) => void;
  onError?: VoidFunction;
};
