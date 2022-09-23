import NftMetadata from "../interfaces/NftMetadata";

export default (a: NftMetadata, b: NftMetadata) => a.mint.toBase58() > b.mint.toBase58() ? 1 : -1