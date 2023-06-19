import { expect, it } from "vitest";

import { getBuiltGraphSDK } from "../.graphclient";

it("17491129 - gas price for each txn", async () => {
  // arrange
  const sdk = getBuiltGraphSDK();
  // act
  const { txns } = await sdk.TxnsByBlock({
    number: "17491129",
  });
  // assert
  expect(txns.map((x) => x.gasPrice)).toMatchSnapshot();
});

it("17491130 - gas price for each txn", async () => {
  // arrange
  const sdk = getBuiltGraphSDK();
  // act
  const { txns } = await sdk.TxnsByBlock({
    number: "17491130",
  });
  // assert
  expect(txns.map((x) => x.gasPrice)).toMatchSnapshot();
});
