import { atom, map } from "nanostores";

import { SimpleBlock } from "../utils/block-utils";

export const $blocks = atom<SimpleBlock[]>([]);

export type BlockMap = Record<string, SimpleBlock>;

export const $blockMap = map<BlockMap>({});
