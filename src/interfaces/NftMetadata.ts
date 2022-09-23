import { PublicKey } from "@solana/web3.js";

export default interface NftMetadata {
    mint: PublicKey,
    name: string,
    symbol: string,
    image: string
}
