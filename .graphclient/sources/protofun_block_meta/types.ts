// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace ProtofunBlockMetaTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BaseFeePerGasDayCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type BaseFeePerGasDayCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BaseFeePerGasDayCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BaseFeePerGasDayCandle_filter>>>;
};

export type BaseFeePerGasDayCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type BaseFeePerGasHourCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type BaseFeePerGasHourCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BaseFeePerGasHourCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BaseFeePerGasHourCandle_filter>>>;
};

export type BaseFeePerGasHourCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type BaseFeePerGasMinuteCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  /**  The highest value of base fee per gas within the minute  */
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type BaseFeePerGasMinuteCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BaseFeePerGasMinuteCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BaseFeePerGasMinuteCandle_filter>>>;
};

export type BaseFeePerGasMinuteCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type BaseFeePerGasWeekCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type BaseFeePerGasWeekCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BaseFeePerGasWeekCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BaseFeePerGasWeekCandle_filter>>>;
};

export type BaseFeePerGasWeekCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type Block = {
  id: Scalars['Bytes'];
  number: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  gasUsed: Scalars['BigInt'];
  baseFeePerGas: Scalars['BigInt'];
  txns: Array<Txn>;
  txnCount: Scalars['Int'];
  minGasPrice: Scalars['BigInt'];
  maxGasPrice: Scalars['BigInt'];
  firstGasPrice: Scalars['BigInt'];
  lastGasPrice: Scalars['BigInt'];
  gasFees: Scalars['BigInt'];
  burnedFees: Scalars['BigInt'];
  minerTips: Scalars['BigInt'];
};


export type BlocktxnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Txn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Txn_filter>;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['BigInt']>;
  number_not?: InputMaybe<Scalars['BigInt']>;
  number_gt?: InputMaybe<Scalars['BigInt']>;
  number_lt?: InputMaybe<Scalars['BigInt']>;
  number_gte?: InputMaybe<Scalars['BigInt']>;
  number_lte?: InputMaybe<Scalars['BigInt']>;
  number_in?: InputMaybe<Array<Scalars['BigInt']>>;
  number_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseFeePerGas?: InputMaybe<Scalars['BigInt']>;
  baseFeePerGas_not?: InputMaybe<Scalars['BigInt']>;
  baseFeePerGas_gt?: InputMaybe<Scalars['BigInt']>;
  baseFeePerGas_lt?: InputMaybe<Scalars['BigInt']>;
  baseFeePerGas_gte?: InputMaybe<Scalars['BigInt']>;
  baseFeePerGas_lte?: InputMaybe<Scalars['BigInt']>;
  baseFeePerGas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  baseFeePerGas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txns_?: InputMaybe<Txn_filter>;
  txnCount?: InputMaybe<Scalars['Int']>;
  txnCount_not?: InputMaybe<Scalars['Int']>;
  txnCount_gt?: InputMaybe<Scalars['Int']>;
  txnCount_lt?: InputMaybe<Scalars['Int']>;
  txnCount_gte?: InputMaybe<Scalars['Int']>;
  txnCount_lte?: InputMaybe<Scalars['Int']>;
  txnCount_in?: InputMaybe<Array<Scalars['Int']>>;
  txnCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  minGasPrice?: InputMaybe<Scalars['BigInt']>;
  minGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  minGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  minGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  minGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  minGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  minGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxGasPrice?: InputMaybe<Scalars['BigInt']>;
  maxGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  maxGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  maxGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  maxGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  maxGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  maxGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstGasPrice?: InputMaybe<Scalars['BigInt']>;
  firstGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  firstGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  firstGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  firstGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  firstGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  firstGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  firstGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastGasPrice?: InputMaybe<Scalars['BigInt']>;
  lastGasPrice_not?: InputMaybe<Scalars['BigInt']>;
  lastGasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  lastGasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  lastGasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  lastGasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  lastGasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastGasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasFees?: InputMaybe<Scalars['BigInt']>;
  gasFees_not?: InputMaybe<Scalars['BigInt']>;
  gasFees_gt?: InputMaybe<Scalars['BigInt']>;
  gasFees_lt?: InputMaybe<Scalars['BigInt']>;
  gasFees_gte?: InputMaybe<Scalars['BigInt']>;
  gasFees_lte?: InputMaybe<Scalars['BigInt']>;
  gasFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedFees?: InputMaybe<Scalars['BigInt']>;
  burnedFees_not?: InputMaybe<Scalars['BigInt']>;
  burnedFees_gt?: InputMaybe<Scalars['BigInt']>;
  burnedFees_lt?: InputMaybe<Scalars['BigInt']>;
  burnedFees_gte?: InputMaybe<Scalars['BigInt']>;
  burnedFees_lte?: InputMaybe<Scalars['BigInt']>;
  burnedFees_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedFees_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minerTips?: InputMaybe<Scalars['BigInt']>;
  minerTips_not?: InputMaybe<Scalars['BigInt']>;
  minerTips_gt?: InputMaybe<Scalars['BigInt']>;
  minerTips_lt?: InputMaybe<Scalars['BigInt']>;
  minerTips_gte?: InputMaybe<Scalars['BigInt']>;
  minerTips_lte?: InputMaybe<Scalars['BigInt']>;
  minerTips_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minerTips_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Block_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Block_filter>>>;
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Block_orderBy =
  | 'id'
  | 'number'
  | 'timestamp'
  | 'gasUsed'
  | 'baseFeePerGas'
  | 'txns'
  | 'txnCount'
  | 'minGasPrice'
  | 'maxGasPrice'
  | 'firstGasPrice'
  | 'lastGasPrice'
  | 'gasFees'
  | 'burnedFees'
  | 'minerTips';

export type MinGasPriceDayCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type MinGasPriceDayCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MinGasPriceDayCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MinGasPriceDayCandle_filter>>>;
};

export type MinGasPriceDayCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type MinGasPriceHourCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type MinGasPriceHourCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MinGasPriceHourCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MinGasPriceHourCandle_filter>>>;
};

export type MinGasPriceHourCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type MinGasPriceMinuteCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type MinGasPriceMinuteCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MinGasPriceMinuteCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MinGasPriceMinuteCandle_filter>>>;
};

export type MinGasPriceMinuteCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

export type MinGasPriceWeekCandle = {
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  open?: Maybe<Scalars['BigInt']>;
  high?: Maybe<Scalars['BigInt']>;
  low?: Maybe<Scalars['BigInt']>;
  close?: Maybe<Scalars['BigInt']>;
};

export type MinGasPriceWeekCandle_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open?: InputMaybe<Scalars['BigInt']>;
  open_not?: InputMaybe<Scalars['BigInt']>;
  open_gt?: InputMaybe<Scalars['BigInt']>;
  open_lt?: InputMaybe<Scalars['BigInt']>;
  open_gte?: InputMaybe<Scalars['BigInt']>;
  open_lte?: InputMaybe<Scalars['BigInt']>;
  open_in?: InputMaybe<Array<Scalars['BigInt']>>;
  open_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high?: InputMaybe<Scalars['BigInt']>;
  high_not?: InputMaybe<Scalars['BigInt']>;
  high_gt?: InputMaybe<Scalars['BigInt']>;
  high_lt?: InputMaybe<Scalars['BigInt']>;
  high_gte?: InputMaybe<Scalars['BigInt']>;
  high_lte?: InputMaybe<Scalars['BigInt']>;
  high_in?: InputMaybe<Array<Scalars['BigInt']>>;
  high_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low?: InputMaybe<Scalars['BigInt']>;
  low_not?: InputMaybe<Scalars['BigInt']>;
  low_gt?: InputMaybe<Scalars['BigInt']>;
  low_lt?: InputMaybe<Scalars['BigInt']>;
  low_gte?: InputMaybe<Scalars['BigInt']>;
  low_lte?: InputMaybe<Scalars['BigInt']>;
  low_in?: InputMaybe<Array<Scalars['BigInt']>>;
  low_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close?: InputMaybe<Scalars['BigInt']>;
  close_not?: InputMaybe<Scalars['BigInt']>;
  close_gt?: InputMaybe<Scalars['BigInt']>;
  close_lt?: InputMaybe<Scalars['BigInt']>;
  close_gte?: InputMaybe<Scalars['BigInt']>;
  close_lte?: InputMaybe<Scalars['BigInt']>;
  close_in?: InputMaybe<Array<Scalars['BigInt']>>;
  close_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MinGasPriceWeekCandle_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MinGasPriceWeekCandle_filter>>>;
};

export type MinGasPriceWeekCandle_orderBy =
  | 'id'
  | 'timestamp'
  | 'open'
  | 'high'
  | 'low'
  | 'close';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  block?: Maybe<Block>;
  blocks: Array<Block>;
  txn?: Maybe<Txn>;
  txns: Array<Txn>;
  baseFeePerGasMinuteCandle?: Maybe<BaseFeePerGasMinuteCandle>;
  baseFeePerGasMinuteCandles: Array<BaseFeePerGasMinuteCandle>;
  baseFeePerGasHourCandle?: Maybe<BaseFeePerGasHourCandle>;
  baseFeePerGasHourCandles: Array<BaseFeePerGasHourCandle>;
  baseFeePerGasDayCandle?: Maybe<BaseFeePerGasDayCandle>;
  baseFeePerGasDayCandles: Array<BaseFeePerGasDayCandle>;
  baseFeePerGasWeekCandle?: Maybe<BaseFeePerGasWeekCandle>;
  baseFeePerGasWeekCandles: Array<BaseFeePerGasWeekCandle>;
  minGasPriceMinuteCandle?: Maybe<MinGasPriceMinuteCandle>;
  minGasPriceMinuteCandles: Array<MinGasPriceMinuteCandle>;
  minGasPriceHourCandle?: Maybe<MinGasPriceHourCandle>;
  minGasPriceHourCandles: Array<MinGasPriceHourCandle>;
  minGasPriceDayCandle?: Maybe<MinGasPriceDayCandle>;
  minGasPriceDayCandles: Array<MinGasPriceDayCandle>;
  minGasPriceWeekCandle?: Maybe<MinGasPriceWeekCandle>;
  minGasPriceWeekCandles: Array<MinGasPriceWeekCandle>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryblockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryblocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Block_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Block_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytxnArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytxnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Txn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Txn_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasMinuteCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasMinuteCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasMinuteCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasMinuteCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasHourCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasHourCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasHourCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasHourCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasDayCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasDayCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasDayCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasDayCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasWeekCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybaseFeePerGasWeekCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasWeekCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasWeekCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceMinuteCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceMinuteCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceMinuteCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceMinuteCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceHourCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceHourCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceHourCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceHourCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceDayCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceDayCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceDayCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceDayCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceWeekCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryminGasPriceWeekCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceWeekCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceWeekCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  block?: Maybe<Block>;
  blocks: Array<Block>;
  txn?: Maybe<Txn>;
  txns: Array<Txn>;
  baseFeePerGasMinuteCandle?: Maybe<BaseFeePerGasMinuteCandle>;
  baseFeePerGasMinuteCandles: Array<BaseFeePerGasMinuteCandle>;
  baseFeePerGasHourCandle?: Maybe<BaseFeePerGasHourCandle>;
  baseFeePerGasHourCandles: Array<BaseFeePerGasHourCandle>;
  baseFeePerGasDayCandle?: Maybe<BaseFeePerGasDayCandle>;
  baseFeePerGasDayCandles: Array<BaseFeePerGasDayCandle>;
  baseFeePerGasWeekCandle?: Maybe<BaseFeePerGasWeekCandle>;
  baseFeePerGasWeekCandles: Array<BaseFeePerGasWeekCandle>;
  minGasPriceMinuteCandle?: Maybe<MinGasPriceMinuteCandle>;
  minGasPriceMinuteCandles: Array<MinGasPriceMinuteCandle>;
  minGasPriceHourCandle?: Maybe<MinGasPriceHourCandle>;
  minGasPriceHourCandles: Array<MinGasPriceHourCandle>;
  minGasPriceDayCandle?: Maybe<MinGasPriceDayCandle>;
  minGasPriceDayCandles: Array<MinGasPriceDayCandle>;
  minGasPriceWeekCandle?: Maybe<MinGasPriceWeekCandle>;
  minGasPriceWeekCandles: Array<MinGasPriceWeekCandle>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionblockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionblocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Block_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Block_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontxnArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontxnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Txn_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Txn_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasMinuteCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasMinuteCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasMinuteCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasMinuteCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasHourCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasHourCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasHourCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasHourCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasDayCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasDayCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasDayCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasDayCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasWeekCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbaseFeePerGasWeekCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BaseFeePerGasWeekCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BaseFeePerGasWeekCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceMinuteCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceMinuteCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceMinuteCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceMinuteCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceHourCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceHourCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceHourCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceHourCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceDayCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceDayCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceDayCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceDayCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceWeekCandleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionminGasPriceWeekCandlesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MinGasPriceWeekCandle_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MinGasPriceWeekCandle_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Txn = {
  id: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  block: Block;
  index: Scalars['Int'];
  timestamp: Scalars['BigInt'];
  gasUsed: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  gasFee: Scalars['BigInt'];
  txnType: Scalars['Int'];
  maxPriorityFeePerGas: Scalars['BigInt'];
  burnedFee: Scalars['BigInt'];
  minerTip: Scalars['BigInt'];
};

export type Txn_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block?: InputMaybe<Scalars['String']>;
  block_not?: InputMaybe<Scalars['String']>;
  block_gt?: InputMaybe<Scalars['String']>;
  block_lt?: InputMaybe<Scalars['String']>;
  block_gte?: InputMaybe<Scalars['String']>;
  block_lte?: InputMaybe<Scalars['String']>;
  block_in?: InputMaybe<Array<Scalars['String']>>;
  block_not_in?: InputMaybe<Array<Scalars['String']>>;
  block_contains?: InputMaybe<Scalars['String']>;
  block_contains_nocase?: InputMaybe<Scalars['String']>;
  block_not_contains?: InputMaybe<Scalars['String']>;
  block_not_contains_nocase?: InputMaybe<Scalars['String']>;
  block_starts_with?: InputMaybe<Scalars['String']>;
  block_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_starts_with?: InputMaybe<Scalars['String']>;
  block_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  block_ends_with?: InputMaybe<Scalars['String']>;
  block_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_not_ends_with?: InputMaybe<Scalars['String']>;
  block_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  block_?: InputMaybe<Block_filter>;
  index?: InputMaybe<Scalars['Int']>;
  index_not?: InputMaybe<Scalars['Int']>;
  index_gt?: InputMaybe<Scalars['Int']>;
  index_lt?: InputMaybe<Scalars['Int']>;
  index_gte?: InputMaybe<Scalars['Int']>;
  index_lte?: InputMaybe<Scalars['Int']>;
  index_in?: InputMaybe<Array<Scalars['Int']>>;
  index_not_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasFee?: InputMaybe<Scalars['BigInt']>;
  gasFee_not?: InputMaybe<Scalars['BigInt']>;
  gasFee_gt?: InputMaybe<Scalars['BigInt']>;
  gasFee_lt?: InputMaybe<Scalars['BigInt']>;
  gasFee_gte?: InputMaybe<Scalars['BigInt']>;
  gasFee_lte?: InputMaybe<Scalars['BigInt']>;
  gasFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  txnType?: InputMaybe<Scalars['Int']>;
  txnType_not?: InputMaybe<Scalars['Int']>;
  txnType_gt?: InputMaybe<Scalars['Int']>;
  txnType_lt?: InputMaybe<Scalars['Int']>;
  txnType_gte?: InputMaybe<Scalars['Int']>;
  txnType_lte?: InputMaybe<Scalars['Int']>;
  txnType_in?: InputMaybe<Array<Scalars['Int']>>;
  txnType_not_in?: InputMaybe<Array<Scalars['Int']>>;
  maxPriorityFeePerGas?: InputMaybe<Scalars['BigInt']>;
  maxPriorityFeePerGas_not?: InputMaybe<Scalars['BigInt']>;
  maxPriorityFeePerGas_gt?: InputMaybe<Scalars['BigInt']>;
  maxPriorityFeePerGas_lt?: InputMaybe<Scalars['BigInt']>;
  maxPriorityFeePerGas_gte?: InputMaybe<Scalars['BigInt']>;
  maxPriorityFeePerGas_lte?: InputMaybe<Scalars['BigInt']>;
  maxPriorityFeePerGas_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxPriorityFeePerGas_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedFee?: InputMaybe<Scalars['BigInt']>;
  burnedFee_not?: InputMaybe<Scalars['BigInt']>;
  burnedFee_gt?: InputMaybe<Scalars['BigInt']>;
  burnedFee_lt?: InputMaybe<Scalars['BigInt']>;
  burnedFee_gte?: InputMaybe<Scalars['BigInt']>;
  burnedFee_lte?: InputMaybe<Scalars['BigInt']>;
  burnedFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minerTip?: InputMaybe<Scalars['BigInt']>;
  minerTip_not?: InputMaybe<Scalars['BigInt']>;
  minerTip_gt?: InputMaybe<Scalars['BigInt']>;
  minerTip_lt?: InputMaybe<Scalars['BigInt']>;
  minerTip_gte?: InputMaybe<Scalars['BigInt']>;
  minerTip_lte?: InputMaybe<Scalars['BigInt']>;
  minerTip_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minerTip_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Txn_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Txn_filter>>>;
};

export type Txn_orderBy =
  | 'id'
  | 'blockNumber'
  | 'block'
  | 'block__id'
  | 'block__number'
  | 'block__timestamp'
  | 'block__gasUsed'
  | 'block__baseFeePerGas'
  | 'block__txnCount'
  | 'block__minGasPrice'
  | 'block__maxGasPrice'
  | 'block__firstGasPrice'
  | 'block__lastGasPrice'
  | 'block__gasFees'
  | 'block__burnedFees'
  | 'block__minerTips'
  | 'index'
  | 'timestamp'
  | 'gasUsed'
  | 'gasPrice'
  | 'gasFee'
  | 'txnType'
  | 'maxPriorityFeePerGas'
  | 'burnedFee'
  | 'minerTip';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  block: InContextSdkMethod<Query['block'], QueryblockArgs, MeshContext>,
  /** null **/
  blocks: InContextSdkMethod<Query['blocks'], QueryblocksArgs, MeshContext>,
  /** null **/
  txn: InContextSdkMethod<Query['txn'], QuerytxnArgs, MeshContext>,
  /** null **/
  txns: InContextSdkMethod<Query['txns'], QuerytxnsArgs, MeshContext>,
  /** null **/
  baseFeePerGasMinuteCandle: InContextSdkMethod<Query['baseFeePerGasMinuteCandle'], QuerybaseFeePerGasMinuteCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasMinuteCandles: InContextSdkMethod<Query['baseFeePerGasMinuteCandles'], QuerybaseFeePerGasMinuteCandlesArgs, MeshContext>,
  /** null **/
  baseFeePerGasHourCandle: InContextSdkMethod<Query['baseFeePerGasHourCandle'], QuerybaseFeePerGasHourCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasHourCandles: InContextSdkMethod<Query['baseFeePerGasHourCandles'], QuerybaseFeePerGasHourCandlesArgs, MeshContext>,
  /** null **/
  baseFeePerGasDayCandle: InContextSdkMethod<Query['baseFeePerGasDayCandle'], QuerybaseFeePerGasDayCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasDayCandles: InContextSdkMethod<Query['baseFeePerGasDayCandles'], QuerybaseFeePerGasDayCandlesArgs, MeshContext>,
  /** null **/
  baseFeePerGasWeekCandle: InContextSdkMethod<Query['baseFeePerGasWeekCandle'], QuerybaseFeePerGasWeekCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasWeekCandles: InContextSdkMethod<Query['baseFeePerGasWeekCandles'], QuerybaseFeePerGasWeekCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceMinuteCandle: InContextSdkMethod<Query['minGasPriceMinuteCandle'], QueryminGasPriceMinuteCandleArgs, MeshContext>,
  /** null **/
  minGasPriceMinuteCandles: InContextSdkMethod<Query['minGasPriceMinuteCandles'], QueryminGasPriceMinuteCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceHourCandle: InContextSdkMethod<Query['minGasPriceHourCandle'], QueryminGasPriceHourCandleArgs, MeshContext>,
  /** null **/
  minGasPriceHourCandles: InContextSdkMethod<Query['minGasPriceHourCandles'], QueryminGasPriceHourCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceDayCandle: InContextSdkMethod<Query['minGasPriceDayCandle'], QueryminGasPriceDayCandleArgs, MeshContext>,
  /** null **/
  minGasPriceDayCandles: InContextSdkMethod<Query['minGasPriceDayCandles'], QueryminGasPriceDayCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceWeekCandle: InContextSdkMethod<Query['minGasPriceWeekCandle'], QueryminGasPriceWeekCandleArgs, MeshContext>,
  /** null **/
  minGasPriceWeekCandles: InContextSdkMethod<Query['minGasPriceWeekCandles'], QueryminGasPriceWeekCandlesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  block: InContextSdkMethod<Subscription['block'], SubscriptionblockArgs, MeshContext>,
  /** null **/
  blocks: InContextSdkMethod<Subscription['blocks'], SubscriptionblocksArgs, MeshContext>,
  /** null **/
  txn: InContextSdkMethod<Subscription['txn'], SubscriptiontxnArgs, MeshContext>,
  /** null **/
  txns: InContextSdkMethod<Subscription['txns'], SubscriptiontxnsArgs, MeshContext>,
  /** null **/
  baseFeePerGasMinuteCandle: InContextSdkMethod<Subscription['baseFeePerGasMinuteCandle'], SubscriptionbaseFeePerGasMinuteCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasMinuteCandles: InContextSdkMethod<Subscription['baseFeePerGasMinuteCandles'], SubscriptionbaseFeePerGasMinuteCandlesArgs, MeshContext>,
  /** null **/
  baseFeePerGasHourCandle: InContextSdkMethod<Subscription['baseFeePerGasHourCandle'], SubscriptionbaseFeePerGasHourCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasHourCandles: InContextSdkMethod<Subscription['baseFeePerGasHourCandles'], SubscriptionbaseFeePerGasHourCandlesArgs, MeshContext>,
  /** null **/
  baseFeePerGasDayCandle: InContextSdkMethod<Subscription['baseFeePerGasDayCandle'], SubscriptionbaseFeePerGasDayCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasDayCandles: InContextSdkMethod<Subscription['baseFeePerGasDayCandles'], SubscriptionbaseFeePerGasDayCandlesArgs, MeshContext>,
  /** null **/
  baseFeePerGasWeekCandle: InContextSdkMethod<Subscription['baseFeePerGasWeekCandle'], SubscriptionbaseFeePerGasWeekCandleArgs, MeshContext>,
  /** null **/
  baseFeePerGasWeekCandles: InContextSdkMethod<Subscription['baseFeePerGasWeekCandles'], SubscriptionbaseFeePerGasWeekCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceMinuteCandle: InContextSdkMethod<Subscription['minGasPriceMinuteCandle'], SubscriptionminGasPriceMinuteCandleArgs, MeshContext>,
  /** null **/
  minGasPriceMinuteCandles: InContextSdkMethod<Subscription['minGasPriceMinuteCandles'], SubscriptionminGasPriceMinuteCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceHourCandle: InContextSdkMethod<Subscription['minGasPriceHourCandle'], SubscriptionminGasPriceHourCandleArgs, MeshContext>,
  /** null **/
  minGasPriceHourCandles: InContextSdkMethod<Subscription['minGasPriceHourCandles'], SubscriptionminGasPriceHourCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceDayCandle: InContextSdkMethod<Subscription['minGasPriceDayCandle'], SubscriptionminGasPriceDayCandleArgs, MeshContext>,
  /** null **/
  minGasPriceDayCandles: InContextSdkMethod<Subscription['minGasPriceDayCandles'], SubscriptionminGasPriceDayCandlesArgs, MeshContext>,
  /** null **/
  minGasPriceWeekCandle: InContextSdkMethod<Subscription['minGasPriceWeekCandle'], SubscriptionminGasPriceWeekCandleArgs, MeshContext>,
  /** null **/
  minGasPriceWeekCandles: InContextSdkMethod<Subscription['minGasPriceWeekCandles'], SubscriptionminGasPriceWeekCandlesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["protofun_block_meta"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
