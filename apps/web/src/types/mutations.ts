type MutationParams<T> = {
  onSuccess?: (data: T) => void;
  onError?: () => void;
};

export type { MutationParams };
