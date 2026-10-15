"use client";

import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

type Options<TItem, TVars, TData> = {
  fn: (vars: TVars) => Promise<TData>;
  listKey: QueryKey;
  update: (list: TItem[], vars: TVars) => TItem[];
  message: string;
  refresh?: QueryKey[];
};

export function useOptimisticMutation<TItem, TVars, TData>({
  fn,
  listKey,
  update,
  message,
  refresh = [],
}: Options<TItem, TVars, TData>) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onMutate: async (vars: TVars) => {
      await qc.cancelQueries({ queryKey: listKey });
      const previous = qc.getQueriesData<TItem[]>({ queryKey: listKey });
      qc.setQueriesData<TItem[]>({ queryKey: listKey }, (old) =>
        old ? update(old, vars) : old,
      );
      return { previous };
    },
    onError: (e, _vars, ctx) => {
      // rollback
      ctx?.previous.forEach(([key, data]) => qc.setQueryData(key, data));
      toast.error(e.message);
    },
    onSuccess: () => toast.success(message),
    onSettled: () => {
      [listKey, ...refresh].forEach((queryKey) =>
        qc.invalidateQueries({ queryKey }),
      );
    },
  });
}
