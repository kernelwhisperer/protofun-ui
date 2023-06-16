import { expect, it } from "vitest";

import { getBuiltGraphSDK } from "../.graphclient";

it("17491129", async () => {
  const sdk = getBuiltGraphSDK();
  const { block } = await sdk.FetchBlock({
    id: "0x56c1ec3f16c917d68c94f5136ba39df9585c6d1e920d5aa45e26549b30fdb4f9",
  });

  expect(block).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": "15220703343",
      "burnedFees": "143525676967769805",
      "gasFees": "175540297256373251",
      "gasUsed": "10772313",
      "id": "0x56c1ec3f16c917d68c94f5136ba39df9585c6d1e920d5aa45e26549b30fdb4f9",
      "maxGasPrice": "187531648179",
      "minGasPrice": "15220703343",
      "minerTips": "38281422137690550",
      "number": "17491129",
      "timestamp": "2023-06-16T08:11:23Z",
    }
  `);
});
