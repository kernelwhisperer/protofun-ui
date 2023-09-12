import { expect, it } from "vitest"

import { getBuiltGraphSDK } from "../.graphclient"

it("17491129", async () => {
  // arrange
  const sdk = getBuiltGraphSDK()
  // act
  const { block } = await sdk.FetchBlock({
    id: "0x56c1ec3f16c917d68c94f5136ba39df9585c6d1e920d5aa45e26549b30fdb4f9",
  })
  // assert
  // https://etherscan.io/block/17491129
  expect(block).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": "15220703343",
      "burnedFees": "143525676967769805",
      "firstGasPrice": "15270703343",
      "gasFees": "175540297256373251",
      "gasUsed": "10772313",
      "id": "0x56c1ec3f16c917d68c94f5136ba39df9585c6d1e920d5aa45e26549b30fdb4f9",
      "lastGasPrice": "15220703343",
      "maxGasPrice": "187531648179",
      "minGasPrice": "15220703343",
      "minerTips": "38281422137690550",
      "number": "17491129",
      "timestamp": "1686903083",
      "txnCount": 166,
    }
  `)
})

it("17491130", async () => {
  // arrange
  const sdk = getBuiltGraphSDK()
  // act
  const { block } = await sdk.FetchBlock({
    id: "0x7c61c61cb8628c41f38a995578629eba8e457a115c8305e6b5df9a75c6bd33ba",
  })
  // assert
  expect(block).toMatchInlineSnapshot(`
      {
        "baseFeePerGas": "14684466930",
        "burnedFees": "289953757057677300",
        "firstGasPrice": "14684466930",
        "gasFees": "331920824240939139",
        "gasUsed": "19923677",
        "id": "0x7c61c61cb8628c41f38a995578629eba8e457a115c8305e6b5df9a75c6bd33ba",
        "lastGasPrice": "14684466930",
        "maxGasPrice": "64684466930",
        "minGasPrice": "14684466930",
        "minerTips": "67229008650148535",
        "number": "17491130",
        "timestamp": "1686903095",
        "txnCount": 241,
      }
    `)
})
