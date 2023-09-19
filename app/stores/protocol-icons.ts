import { SvgIconComponent } from "@mui/icons-material"
import { ProtocolId } from "protofun"

import AaveIcon from "../../public/assets/aave.svg"
import CompIcon from "../../public/assets/comp.svg"
import EthereumIcon from "../../public/assets/eth.svg"
import MakerIcon from "../../public/assets/mkr.svg"

export type IconData = {
  icon: SvgIconComponent
  iconPadding?: string
}

export const PROTOCOL_ICON_MAP: Record<ProtocolId, IconData> = {
  aave: {
    icon: AaveIcon,
    iconPadding: "12px",
  },
  // btc: {
  //   icon: BitcoinIcon,
  //   iconPadding: "5px",
  // },
  comp: {
    icon: CompIcon,
    iconPadding: "12px",
  },
  eth: {
    icon: EthereumIcon,
    iconPadding: "16px",
  },
  mkr: {
    icon: MakerIcon,
    iconPadding: "12px",
  },
}
