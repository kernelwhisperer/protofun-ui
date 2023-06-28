import { expect, it } from "vitest";

import { queryCandles } from "../app/utils/candle-utils";

it("Minute candles", async () => {
  // act
  const candles = await queryCandles("Minute", "1687010580");
  // assert
  expect(candles).toMatchSnapshot();
});

it("Hour candles", async () => {
  // act
  const candles = await queryCandles("Hour", "1687010580");
  // assert
  expect(candles).toMatchSnapshot();
});

it("Day candles", async () => {
  // act
  const candles = await queryCandles("Day", "1687010580");
  // assert
  expect(candles).toMatchSnapshot();
});

it("Week candles", async () => {
  // act
  const candles = await queryCandles("Week", "1687010580");
  // assert
  expect(candles).toMatchSnapshot();
});
