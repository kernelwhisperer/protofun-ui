"use client";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from "react";

import { SimpleBlock } from "../utils/client-utils";

export type BlockMapAPI = {
  getItem: (timestamp: string) => SimpleBlock;
  setItem: (block: SimpleBlock) => void;
};

const BlockMapContext = createContext<BlockMapAPI | null>(null);

export type BlockMap = Record<string, SimpleBlock>;

type BlockMapProviderProps = PropsWithChildren<{
  initialValue: BlockMap;
}>;

export const BlockMapProvider = (props: BlockMapProviderProps) => {
  const { initialValue, children } = props;
  const blockMap = useRef<BlockMap>(initialValue);

  const getItem = useCallback(
    (index: string) => blockMap.current[index],
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
