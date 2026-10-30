import { useMemo } from "react";
import { useOrderlyConfig } from "./useOrderlyConfig";

/** Layouts render below OrderlyAppProvider; provider setup must not read its flags. */
export function useScaffoldConfig() {
  const { scaffold } = useOrderlyConfig();

  return useMemo(
    () => ({
      ...scaffold,
    }),
    [scaffold],
  );
}
