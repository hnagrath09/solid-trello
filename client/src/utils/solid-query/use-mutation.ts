import { MutationObserver } from "react-query/core";

import type {
  MutationFunction,
  MutationKey,
  UseMutateFunction,
  UseMutationOptions,
  UseMutationResult,
} from "react-query/types";
import { onCleanup } from "solid-js";
import { createStore, DeepReadonly, reconcile } from "solid-js/store";
import { useQueryClient } from "./query-client-provider";
import { noop, parseMutationArgs } from "./utils";

export type UseMutationReturnType<TData, TError, TVariables, TContext> =
  UseMutationResult<
    TData | DeepReadonly<TData>,
    TError | DeepReadonly<TError>,
    TVariables | DeepReadonly<TVariables>,
    TContext | DeepReadonly<TContext>
  >;

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationReturnType<TData, TError, TVariables, TContext>;

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
): UseMutationReturnType<TData, TError, TVariables, TContext>;

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationKey: MutationKey,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey"
  >
): UseMutationReturnType<TData, TError, TVariables, TContext>;

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationKey: MutationKey,
  mutationFn?: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >
): UseMutationReturnType<TData, TError, TVariables, TContext>;

export function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  arg1:
    | MutationKey
    | MutationFunction<TData, TVariables>
    | UseMutationOptions<TData, TError, TVariables, TContext>,
  arg2?:
    | MutationFunction<TData, TVariables>
    | UseMutationOptions<TData, TError, TVariables, TContext>,
  arg3?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationReturnType<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();
  const options = parseMutationArgs(arg1, arg2, arg3);

  const observer = new MutationObserver(queryClient, options);
  // @ts-ignore
  const [state, setState] = createStore(observer.getCurrentResult());

  const unsubscribe = observer.subscribe((result) =>
    // @ts-ignore
    setState(reconcile(result))
  );

  onCleanup(() => unsubscribe());

  const mutate: UseMutateFunction<TData, TError, TVariables, TContext> = (
    variables,
    mutateOptions
  ) => observer.mutate(variables, mutateOptions).catch(noop);

  return { ...state, mutate, mutateAsync: state.mutate };
}
