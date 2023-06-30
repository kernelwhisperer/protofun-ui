import { SvgIconComponent } from "@mui/icons-material";

import AaveIcon from "../components/HomePage/assets/aave.svg";
import CompIcon from "../components/HomePage/assets/compound.svg";
import EthereumIcon from "../components/HomePage/assets/ethereum.svg";
import MakerIcon from "../components/HomePage/assets/maker.svg";

export type ProtocolId = "eth" | "comp" | "mkr" | "aave";

export type Protocol = {
  enabled?: boolean;
  icon: SvgIconComponent;
  iconPadding?: string;
  id: ProtocolId;
  title: string;
};

export const PROTOCOL_MAP: Record<ProtocolId, Protocol> = {
  aave: {
    icon: AaveIcon,
    iconPadding: "12px",
    id: "aave",
    title: "Aave",
  },
  // btc: {
  //   enabled: false,
  //   icon: BitcoinIcon,
  //   iconPadding: "5px",
  //   id: "btc",
  //   title: "Bitcoin",
  // },
  comp: {
    icon: CompIcon,
    iconPadding: "12px",
    id: "comp",
    title: "Compound",
  },
  eth: {
    enabled: true,
    icon: EthereumIcon,
    iconPadding: "16px",
    id: "eth",
    title: "Ethereum",
  },
  mkr: {
    icon: MakerIcon,
    iconPadding: "12px",
    id: "mkr",
    title: "MakerDAO",
  },
};
export const PROTOCOL_IDS = Object.keys(PROTOCOL_MAP) as ProtocolId[];
export const PROTOCOLS = Object.values(PROTOCOL_MAP).sort((a, b) => {
  if (a.enabled === b.enabled) {
    return 0;
  } else if (a.enabled && !b.enabled) {
    return -1;
  } else {
    return 1;
  }
});

export function isProtocolId(value: string): value is ProtocolId {
  return value in PROTOCOL_MAP;
}
