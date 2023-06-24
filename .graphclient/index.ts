// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { ProtofunBlockMetaTypes } from './sources/protofun_block_meta/types';
import * as importedModule$0 from "./sources/protofun_block_meta/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BaseFeePerGasDayCandle: ResolverTypeWrapper<BaseFeePerGasDayCandle>;
  BaseFeePerGasDayCandle_filter: BaseFeePerGasDayCandle_filter;
  BaseFeePerGasDayCandle_orderBy: BaseFeePerGasDayCandle_orderBy;
  BaseFeePerGasHourCandle: ResolverTypeWrapper<BaseFeePerGasHourCandle>;
  BaseFeePerGasHourCandle_filter: BaseFeePerGasHourCandle_filter;
  BaseFeePerGasHourCandle_orderBy: BaseFeePerGasHourCandle_orderBy;
  BaseFeePerGasMinuteCandle: ResolverTypeWrapper<BaseFeePerGasMinuteCandle>;
  BaseFeePerGasMinuteCandle_filter: BaseFeePerGasMinuteCandle_filter;
  BaseFeePerGasMinuteCandle_orderBy: BaseFeePerGasMinuteCandle_orderBy;
  BaseFeePerGasWeekCandle: ResolverTypeWrapper<BaseFeePerGasWeekCandle>;
  BaseFeePerGasWeekCandle_filter: BaseFeePerGasWeekCandle_filter;
  BaseFeePerGasWeekCandle_orderBy: BaseFeePerGasWeekCandle_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  Block: ResolverTypeWrapper<Block>;
  BlockChangedFilter: BlockChangedFilter;
  Block_filter: Block_filter;
  Block_height: Block_height;
  Block_orderBy: Block_orderBy;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  MinGasPriceDayCandle: ResolverTypeWrapper<MinGasPriceDayCandle>;
  MinGasPriceDayCandle_filter: MinGasPriceDayCandle_filter;
  MinGasPriceDayCandle_orderBy: MinGasPriceDayCandle_orderBy;
  MinGasPriceHourCandle: ResolverTypeWrapper<MinGasPriceHourCandle>;
  MinGasPriceHourCandle_filter: MinGasPriceHourCandle_filter;
  MinGasPriceHourCandle_orderBy: MinGasPriceHourCandle_orderBy;
  MinGasPriceMinuteCandle: ResolverTypeWrapper<MinGasPriceMinuteCandle>;
  MinGasPriceMinuteCandle_filter: MinGasPriceMinuteCandle_filter;
  MinGasPriceMinuteCandle_orderBy: MinGasPriceMinuteCandle_orderBy;
  MinGasPriceWeekCandle: ResolverTypeWrapper<MinGasPriceWeekCandle>;
  MinGasPriceWeekCandle_filter: MinGasPriceWeekCandle_filter;
  MinGasPriceWeekCandle_orderBy: MinGasPriceWeekCandle_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Txn: ResolverTypeWrapper<Txn>;
  Txn_filter: Txn_filter;
  Txn_orderBy: Txn_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BaseFeePerGasDayCandle: BaseFeePerGasDayCandle;
  BaseFeePerGasDayCandle_filter: BaseFeePerGasDayCandle_filter;
  BaseFeePerGasHourCandle: BaseFeePerGasHourCandle;
  BaseFeePerGasHourCandle_filter: BaseFeePerGasHourCandle_filter;
  BaseFeePerGasMinuteCandle: BaseFeePerGasMinuteCandle;
  BaseFeePerGasMinuteCandle_filter: BaseFeePerGasMinuteCandle_filter;
  BaseFeePerGasWeekCandle: BaseFeePerGasWeekCandle;
  BaseFeePerGasWeekCandle_filter: BaseFeePerGasWeekCandle_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  Block: Block;
  BlockChangedFilter: BlockChangedFilter;
  Block_filter: Block_filter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  MinGasPriceDayCandle: MinGasPriceDayCandle;
  MinGasPriceDayCandle_filter: MinGasPriceDayCandle_filter;
  MinGasPriceHourCandle: MinGasPriceHourCandle;
  MinGasPriceHourCandle_filter: MinGasPriceHourCandle_filter;
  MinGasPriceMinuteCandle: MinGasPriceMinuteCandle;
  MinGasPriceMinuteCandle_filter: MinGasPriceMinuteCandle_filter;
  MinGasPriceWeekCandle: MinGasPriceWeekCandle;
  MinGasPriceWeekCandle_filter: MinGasPriceWeekCandle_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Txn: Txn;
  Txn_filter: Txn_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BaseFeePerGasDayCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BaseFeePerGasDayCandle'] = ResolversParentTypes['BaseFeePerGasDayCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseFeePerGasHourCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BaseFeePerGasHourCandle'] = ResolversParentTypes['BaseFeePerGasHourCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseFeePerGasMinuteCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BaseFeePerGasMinuteCandle'] = ResolversParentTypes['BaseFeePerGasMinuteCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseFeePerGasWeekCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BaseFeePerGasWeekCandle'] = ResolversParentTypes['BaseFeePerGasWeekCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlockResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasUsed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  baseFeePerGas?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txns?: Resolver<Array<ResolversTypes['Txn']>, ParentType, ContextType, RequireFields<BlocktxnsArgs, 'skip' | 'first'>>;
  txnCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minGasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maxGasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  firstGasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastGasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  burnedFees?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minerTips?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type MinGasPriceDayCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MinGasPriceDayCandle'] = ResolversParentTypes['MinGasPriceDayCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MinGasPriceHourCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MinGasPriceHourCandle'] = ResolversParentTypes['MinGasPriceHourCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MinGasPriceMinuteCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MinGasPriceMinuteCandle'] = ResolversParentTypes['MinGasPriceMinuteCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MinGasPriceWeekCandleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MinGasPriceWeekCandle'] = ResolversParentTypes['MinGasPriceWeekCandle']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  high?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  low?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  close?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryblockArgs, 'id' | 'subgraphError'>>;
  blocks?: Resolver<Array<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryblocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  txn?: Resolver<Maybe<ResolversTypes['Txn']>, ParentType, ContextType, RequireFields<QuerytxnArgs, 'id' | 'subgraphError'>>;
  txns?: Resolver<Array<ResolversTypes['Txn']>, ParentType, ContextType, RequireFields<QuerytxnsArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasMinuteCandle?: Resolver<Maybe<ResolversTypes['BaseFeePerGasMinuteCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasMinuteCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasMinuteCandles?: Resolver<Array<ResolversTypes['BaseFeePerGasMinuteCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasMinuteCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasHourCandle?: Resolver<Maybe<ResolversTypes['BaseFeePerGasHourCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasHourCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasHourCandles?: Resolver<Array<ResolversTypes['BaseFeePerGasHourCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasHourCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasDayCandle?: Resolver<Maybe<ResolversTypes['BaseFeePerGasDayCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasDayCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasDayCandles?: Resolver<Array<ResolversTypes['BaseFeePerGasDayCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasDayCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasWeekCandle?: Resolver<Maybe<ResolversTypes['BaseFeePerGasWeekCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasWeekCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasWeekCandles?: Resolver<Array<ResolversTypes['BaseFeePerGasWeekCandle']>, ParentType, ContextType, RequireFields<QuerybaseFeePerGasWeekCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceMinuteCandle?: Resolver<Maybe<ResolversTypes['MinGasPriceMinuteCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceMinuteCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceMinuteCandles?: Resolver<Array<ResolversTypes['MinGasPriceMinuteCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceMinuteCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceHourCandle?: Resolver<Maybe<ResolversTypes['MinGasPriceHourCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceHourCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceHourCandles?: Resolver<Array<ResolversTypes['MinGasPriceHourCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceHourCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceDayCandle?: Resolver<Maybe<ResolversTypes['MinGasPriceDayCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceDayCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceDayCandles?: Resolver<Array<ResolversTypes['MinGasPriceDayCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceDayCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceWeekCandle?: Resolver<Maybe<ResolversTypes['MinGasPriceWeekCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceWeekCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceWeekCandles?: Resolver<Array<ResolversTypes['MinGasPriceWeekCandle']>, ParentType, ContextType, RequireFields<QueryminGasPriceWeekCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  block?: SubscriptionResolver<Maybe<ResolversTypes['Block']>, "block", ParentType, ContextType, RequireFields<SubscriptionblockArgs, 'id' | 'subgraphError'>>;
  blocks?: SubscriptionResolver<Array<ResolversTypes['Block']>, "blocks", ParentType, ContextType, RequireFields<SubscriptionblocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  txn?: SubscriptionResolver<Maybe<ResolversTypes['Txn']>, "txn", ParentType, ContextType, RequireFields<SubscriptiontxnArgs, 'id' | 'subgraphError'>>;
  txns?: SubscriptionResolver<Array<ResolversTypes['Txn']>, "txns", ParentType, ContextType, RequireFields<SubscriptiontxnsArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasMinuteCandle?: SubscriptionResolver<Maybe<ResolversTypes['BaseFeePerGasMinuteCandle']>, "baseFeePerGasMinuteCandle", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasMinuteCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasMinuteCandles?: SubscriptionResolver<Array<ResolversTypes['BaseFeePerGasMinuteCandle']>, "baseFeePerGasMinuteCandles", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasMinuteCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasHourCandle?: SubscriptionResolver<Maybe<ResolversTypes['BaseFeePerGasHourCandle']>, "baseFeePerGasHourCandle", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasHourCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasHourCandles?: SubscriptionResolver<Array<ResolversTypes['BaseFeePerGasHourCandle']>, "baseFeePerGasHourCandles", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasHourCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasDayCandle?: SubscriptionResolver<Maybe<ResolversTypes['BaseFeePerGasDayCandle']>, "baseFeePerGasDayCandle", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasDayCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasDayCandles?: SubscriptionResolver<Array<ResolversTypes['BaseFeePerGasDayCandle']>, "baseFeePerGasDayCandles", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasDayCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  baseFeePerGasWeekCandle?: SubscriptionResolver<Maybe<ResolversTypes['BaseFeePerGasWeekCandle']>, "baseFeePerGasWeekCandle", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasWeekCandleArgs, 'id' | 'subgraphError'>>;
  baseFeePerGasWeekCandles?: SubscriptionResolver<Array<ResolversTypes['BaseFeePerGasWeekCandle']>, "baseFeePerGasWeekCandles", ParentType, ContextType, RequireFields<SubscriptionbaseFeePerGasWeekCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceMinuteCandle?: SubscriptionResolver<Maybe<ResolversTypes['MinGasPriceMinuteCandle']>, "minGasPriceMinuteCandle", ParentType, ContextType, RequireFields<SubscriptionminGasPriceMinuteCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceMinuteCandles?: SubscriptionResolver<Array<ResolversTypes['MinGasPriceMinuteCandle']>, "minGasPriceMinuteCandles", ParentType, ContextType, RequireFields<SubscriptionminGasPriceMinuteCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceHourCandle?: SubscriptionResolver<Maybe<ResolversTypes['MinGasPriceHourCandle']>, "minGasPriceHourCandle", ParentType, ContextType, RequireFields<SubscriptionminGasPriceHourCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceHourCandles?: SubscriptionResolver<Array<ResolversTypes['MinGasPriceHourCandle']>, "minGasPriceHourCandles", ParentType, ContextType, RequireFields<SubscriptionminGasPriceHourCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceDayCandle?: SubscriptionResolver<Maybe<ResolversTypes['MinGasPriceDayCandle']>, "minGasPriceDayCandle", ParentType, ContextType, RequireFields<SubscriptionminGasPriceDayCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceDayCandles?: SubscriptionResolver<Array<ResolversTypes['MinGasPriceDayCandle']>, "minGasPriceDayCandles", ParentType, ContextType, RequireFields<SubscriptionminGasPriceDayCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  minGasPriceWeekCandle?: SubscriptionResolver<Maybe<ResolversTypes['MinGasPriceWeekCandle']>, "minGasPriceWeekCandle", ParentType, ContextType, RequireFields<SubscriptionminGasPriceWeekCandleArgs, 'id' | 'subgraphError'>>;
  minGasPriceWeekCandles?: SubscriptionResolver<Array<ResolversTypes['MinGasPriceWeekCandle']>, "minGasPriceWeekCandles", ParentType, ContextType, RequireFields<SubscriptionminGasPriceWeekCandlesArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TxnResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Txn'] = ResolversParentTypes['Txn']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['Block'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasUsed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  txnType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxPriorityFeePerGas?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  burnedFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minerTip?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BaseFeePerGasDayCandle?: BaseFeePerGasDayCandleResolvers<ContextType>;
  BaseFeePerGasHourCandle?: BaseFeePerGasHourCandleResolvers<ContextType>;
  BaseFeePerGasMinuteCandle?: BaseFeePerGasMinuteCandleResolvers<ContextType>;
  BaseFeePerGasWeekCandle?: BaseFeePerGasWeekCandleResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Block?: BlockResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  MinGasPriceDayCandle?: MinGasPriceDayCandleResolvers<ContextType>;
  MinGasPriceHourCandle?: MinGasPriceHourCandleResolvers<ContextType>;
  MinGasPriceMinuteCandle?: MinGasPriceMinuteCandleResolvers<ContextType>;
  MinGasPriceWeekCandle?: MinGasPriceWeekCandleResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Txn?: TxnResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = ProtofunBlockMetaTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/protofun_block_meta/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const protofunBlockMetaTransforms = [];
const additionalTypeDefs = [] as any[];
const protofunBlockMetaHandler = new GraphqlHandler({
              name: "protofun_block_meta",
              config: {"endpoint":"https://api.protocol.fun/subgraphs/name/protofun_block_meta"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("protofun_block_meta"),
              logger: logger.child("protofun_block_meta"),
              importFn,
            });
sources[0] = {
          name: 'protofun_block_meta',
          handler: protofunBlockMetaHandler,
          transforms: protofunBlockMetaTransforms
        }
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 1000
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: FetchLastBlocksDocument,
        get rawSDL() {
          return printWithCache(FetchLastBlocksDocument);
        },
        location: 'FetchLastBlocksDocument.graphql'
      },{
        document: FetchBlocksSinceDocument,
        get rawSDL() {
          return printWithCache(FetchBlocksSinceDocument);
        },
        location: 'FetchBlocksSinceDocument.graphql'
      },{
        document: FetchBlockDocument,
        get rawSDL() {
          return printWithCache(FetchBlockDocument);
        },
        location: 'FetchBlockDocument.graphql'
      },{
        document: FetchBlockByNumberDocument,
        get rawSDL() {
          return printWithCache(FetchBlockByNumberDocument);
        },
        location: 'FetchBlockByNumberDocument.graphql'
      },{
        document: TxnsByBlockDocument,
        get rawSDL() {
          return printWithCache(TxnsByBlockDocument);
        },
        location: 'TxnsByBlockDocument.graphql'
      },{
        document: TxnDocument,
        get rawSDL() {
          return printWithCache(TxnDocument);
        },
        location: 'TxnDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type FullBlockFragment = Pick<Block, 'id' | 'number' | 'timestamp' | 'gasUsed' | 'baseFeePerGas' | 'txnCount' | 'minGasPrice' | 'maxGasPrice' | 'firstGasPrice' | 'lastGasPrice' | 'gasFees' | 'burnedFees' | 'minerTips'>;

export type FetchLastBlocksQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchLastBlocksQuery = { blocks: Array<Pick<Block, 'id' | 'number' | 'timestamp' | 'gasUsed' | 'baseFeePerGas' | 'txnCount' | 'minGasPrice' | 'maxGasPrice' | 'firstGasPrice' | 'lastGasPrice' | 'gasFees' | 'burnedFees' | 'minerTips'>> };

export type FetchBlocksSinceQueryVariables = Exact<{
  since: Scalars['BigInt'];
}>;


export type FetchBlocksSinceQuery = { blocks: Array<Pick<Block, 'id' | 'number' | 'timestamp' | 'gasUsed' | 'baseFeePerGas' | 'txnCount' | 'minGasPrice' | 'maxGasPrice' | 'firstGasPrice' | 'lastGasPrice' | 'gasFees' | 'burnedFees' | 'minerTips'>> };

export type FetchBlockQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchBlockQuery = { block?: Maybe<Pick<Block, 'id' | 'number' | 'timestamp' | 'gasUsed' | 'baseFeePerGas' | 'txnCount' | 'minGasPrice' | 'maxGasPrice' | 'firstGasPrice' | 'lastGasPrice' | 'gasFees' | 'burnedFees' | 'minerTips'>> };

export type FetchBlockByNumberQueryVariables = Exact<{
  number: Scalars['BigInt'];
}>;


export type FetchBlockByNumberQuery = { blocks: Array<Pick<Block, 'id' | 'number' | 'timestamp' | 'gasUsed' | 'baseFeePerGas' | 'txnCount' | 'minGasPrice' | 'maxGasPrice' | 'firstGasPrice' | 'lastGasPrice' | 'gasFees' | 'burnedFees' | 'minerTips'>> };

export type FullTxnFragment = Pick<Txn, 'id' | 'blockNumber' | 'index' | 'timestamp' | 'gasUsed' | 'gasPrice' | 'gasFee' | 'txnType' | 'maxPriorityFeePerGas' | 'burnedFee' | 'minerTip'>;

export type TxnsByBlockQueryVariables = Exact<{
  number: Scalars['BigInt'];
}>;


export type TxnsByBlockQuery = { txns: Array<Pick<Txn, 'id' | 'blockNumber' | 'index' | 'timestamp' | 'gasUsed' | 'gasPrice' | 'gasFee' | 'txnType' | 'maxPriorityFeePerGas' | 'burnedFee' | 'minerTip'>> };

export type TxnQueryVariables = Exact<{ [key: string]: never; }>;


export type TxnQuery = { txn?: Maybe<Pick<Txn, 'id' | 'blockNumber' | 'index' | 'timestamp' | 'gasUsed' | 'gasPrice' | 'gasFee' | 'txnType' | 'maxPriorityFeePerGas' | 'burnedFee' | 'minerTip'>> };

export const FullBlockFragmentDoc = gql`
    fragment FullBlock on Block {
  id
  number
  timestamp
  gasUsed
  baseFeePerGas
  txnCount
  minGasPrice
  maxGasPrice
  firstGasPrice
  lastGasPrice
  gasFees
  burnedFees
  minerTips
}
    ` as unknown as DocumentNode<FullBlockFragment, unknown>;
export const FullTxnFragmentDoc = gql`
    fragment FullTxn on Txn {
  id
  blockNumber
  index
  timestamp
  gasUsed
  gasPrice
  gasFee
  txnType
  maxPriorityFeePerGas
  burnedFee
  minerTip
}
    ` as unknown as DocumentNode<FullTxnFragment, unknown>;
export const FetchLastBlocksDocument = gql`
    query FetchLastBlocks {
  blocks(first: 1000, orderBy: timestamp, orderDirection: desc) {
    ...FullBlock
  }
}
    ${FullBlockFragmentDoc}` as unknown as DocumentNode<FetchLastBlocksQuery, FetchLastBlocksQueryVariables>;
export const FetchBlocksSinceDocument = gql`
    query FetchBlocksSince($since: BigInt!) {
  blocks(first: 1000, orderBy: timestamp, where: {timestamp_gt: $since}) {
    ...FullBlock
  }
}
    ${FullBlockFragmentDoc}` as unknown as DocumentNode<FetchBlocksSinceQuery, FetchBlocksSinceQueryVariables>;
export const FetchBlockDocument = gql`
    query FetchBlock($id: ID!) {
  block(id: $id) {
    ...FullBlock
  }
}
    ${FullBlockFragmentDoc}` as unknown as DocumentNode<FetchBlockQuery, FetchBlockQueryVariables>;
export const FetchBlockByNumberDocument = gql`
    query FetchBlockByNumber($number: BigInt!) {
  blocks(where: {number: $number}) {
    ...FullBlock
  }
}
    ${FullBlockFragmentDoc}` as unknown as DocumentNode<FetchBlockByNumberQuery, FetchBlockByNumberQueryVariables>;
export const TxnsByBlockDocument = gql`
    query TxnsByBlock($number: BigInt!) {
  txns(
    first: 1000
    orderBy: index
    orderDirection: asc
    where: {blockNumber: $number}
  ) {
    ...FullTxn
  }
}
    ${FullTxnFragmentDoc}` as unknown as DocumentNode<TxnsByBlockQuery, TxnsByBlockQueryVariables>;
export const TxnDocument = gql`
    query Txn {
  txn(id: "0x7cc561e4f860fc33ccae5795562d65b988e02829f3be28d32345e53274e93b21") {
    ...FullTxn
  }
}
    ${FullTxnFragmentDoc}` as unknown as DocumentNode<TxnQuery, TxnQueryVariables>;







export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    FetchLastBlocks(variables?: FetchLastBlocksQueryVariables, options?: C): Promise<FetchLastBlocksQuery> {
      return requester<FetchLastBlocksQuery, FetchLastBlocksQueryVariables>(FetchLastBlocksDocument, variables, options) as Promise<FetchLastBlocksQuery>;
    },
    FetchBlocksSince(variables: FetchBlocksSinceQueryVariables, options?: C): Promise<FetchBlocksSinceQuery> {
      return requester<FetchBlocksSinceQuery, FetchBlocksSinceQueryVariables>(FetchBlocksSinceDocument, variables, options) as Promise<FetchBlocksSinceQuery>;
    },
    FetchBlock(variables: FetchBlockQueryVariables, options?: C): Promise<FetchBlockQuery> {
      return requester<FetchBlockQuery, FetchBlockQueryVariables>(FetchBlockDocument, variables, options) as Promise<FetchBlockQuery>;
    },
    FetchBlockByNumber(variables: FetchBlockByNumberQueryVariables, options?: C): Promise<FetchBlockByNumberQuery> {
      return requester<FetchBlockByNumberQuery, FetchBlockByNumberQueryVariables>(FetchBlockByNumberDocument, variables, options) as Promise<FetchBlockByNumberQuery>;
    },
    TxnsByBlock(variables: TxnsByBlockQueryVariables, options?: C): Promise<TxnsByBlockQuery> {
      return requester<TxnsByBlockQuery, TxnsByBlockQueryVariables>(TxnsByBlockDocument, variables, options) as Promise<TxnsByBlockQuery>;
    },
    Txn(variables?: TxnQueryVariables, options?: C): Promise<TxnQuery> {
      return requester<TxnQuery, TxnQueryVariables>(TxnDocument, variables, options) as Promise<TxnQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;