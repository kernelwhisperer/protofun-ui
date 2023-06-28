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

it.only("Blocks since 17578049", async () => {
  // 17578853 was missing because of this:
  // Jun 28 15:59:20.301 INFO Applying 6 entity operation(s), block_hash: 0xc0cc557a37ced937546657e02ffc7af74167ceff08463a4cfb0e359493a4f8d6, block_number: 17578853, sgd: 1, subgraph_id: QmX17PtW4y49ykVacCkN6XnCPfAyCK6esGACYFNM2ifTg9, component: SubgraphInstanceManager
  // Jun 28 15:59:20.323 INFO Reverting block to get back to main chain, revert_to_ptr: #17578852 (faf4893ad50e7ea6edc0b0bd197a071e8499eb5458a0ef9b89f5b542e50bd4ce), subgraph_ptr: #17578853 (c0cc557a37ced937546657e02ffc7af74167ceff08463a4cfb0e359493a4f8d6), sgd: 1, subgraph_id: QmX17PtW4y49ykVacCkN6XnCPfAyCK6esGACYFNM2ifTg9, component: SubgraphInstanceManager
  // Jun 28 15:59:20.390 INFO Applying 5 entity operation(s), block_hash: 0xb0fc81c5e5b691b3e5a451c5d70673c7f555cabb2d44039f537d6f17c2ca1cba, block_number: 17578853, sgd: 1, subgraph_id: QmX17PtW4y49ykVacCkN6XnCPfAyCK6esGACYFNM2ifTg9, component: SubgraphInstanceManager

  // arrange
  const sdk = getBuiltGraphSDK();
  // act
  const { blocks } = await sdk.FetchBlocksSince({
    since: "1687958099",
  });
  // assert
  expect(blocks).toMatchSnapshot();
});
