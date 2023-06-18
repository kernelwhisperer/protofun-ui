"use client";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from "react";

import { noop, SimpleBlock } from "../utils/client-utils";

export type BlockMapAPI = {
  getItem: (timestamp?: string) => SimpleBlock | void;
  setItem: (block: SimpleBlock) => void;
};

const BlockMapContext = createContext<BlockMapAPI>({
  getItem: noop,
  setItem: noop,
});

export type BlockMap = Record<string, SimpleBlock>;

type BlockMapProviderProps = PropsWithChildren<{
  initialValue: BlockMap;
}>;

export const BlockMapProvider = (props: BlockMapProviderProps) => {
  const { initialValue, children } = props;
  const blockMap = useRef<BlockMap>(initialValue);

  const getItem = useCallback(
    (timestamp?: string) =>
      timestamp ? blockMap.current[timestamp] : undefined,
    [blockMap]
  );

  const setItem = useCallback(
    (block: SimpleBlock) => {
      blockMap.current[block.timestamp] = block;
    },
    [blockMap]
  );

  return (
    <BlockMapContext.Provider value={{ getItem, setItem }}>
      {children}
    </BlockMapContext.Provider>
  );
};

export const useBlockMap = () => useContext(BlockMapContext);
