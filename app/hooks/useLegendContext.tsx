"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { noop } from "../utils/client-utils";

export type LegendAPI = {
  setTimestamp: (block: string) => void;
  timestamp?: string;
};

const LegendContext = createContext<LegendAPI>({
  setTimestamp: noop,
});

type LegendProviderProps = PropsWithChildren<{
  initialValue: string;
}>;

export const LegendProvider = (props: LegendProviderProps) => {
  const { initialValue, children } = props;
  const [timestamp, setTimestamp] = useState<string>(initialValue);

  return (
    <LegendContext.Provider value={{ setTimestamp, timestamp }}>
      {children}
    </LegendContext.Provider>
  );
};

export const useLegend = () => useContext(LegendContext);
