import { useStore } from "@nanostores/react";
import { useCallback, useRef } from "react";
import { useInterval } from "usehooks-ts";

import { $liveMode } from "../stores/metric-page";
import { SimpleBlock } from "../utils/block-utils";
import { sdk } from "../utils/client-utils";

export function useNewBlocksSub(
  initialTimestamp: string,
  onNewBlock: (block: SimpleBlock) => void,
  active: boolean
) {
  const lastTimestamp = useRef<string>(initialTimestamp);
  const liveMode = useStore($liveMode);
  console.log("📜 LOG > liveMode:", liveMode, active);

  const tryFetch = useCallback(async () => {
    console.log("📜 LOG > useLatestBlocks > since", lastTimestamp.current);
    const { blocks } = await sdk.FetchBlocksSince({
      since: lastTimestamp.current,
    });
    console.log("📜 LOG > useLatestBlocks > response", blocks);

    if (blocks.length) {
      lastTimestamp.current = blocks[blocks.length - 1].timestamp;
      blocks.forEach(onNewBlock);
    }
  }, [onNewBlock]);

  useInterval(
    tryFetch,
    // Delay in milliseconds or null to stop it
    // 12 * 1000
    liveMode && active ? 5 * 1000 : null // TODO
  );
}
