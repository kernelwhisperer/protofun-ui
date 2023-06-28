export type ProtocolId = "eth"; // | "comp" | "mkr" | "aave";

export const PROTOCOL_LABELS: Record<ProtocolId, string> = {
  eth: "Ethereum",
};
export const PROTOCOLS = Object.keys(PROTOCOL_LABELS) as ProtocolId[];

export function isProtocol(value: string): value is ProtocolId {
  return PROTOCOLS.includes(value as ProtocolId);
}
