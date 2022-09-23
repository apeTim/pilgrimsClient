import { Metadata, Nft, Sft } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import axios from 'axios'
import NftMetadata from "../interfaces/NftMetadata";

export default async (nft: Metadata | Nft | Sft): Promise<NftMetadata | null> => {
    try {
        const metadata = (await axios.get(nft.uri)).data
        return { mint: new PublicKey(nft.address), name: nft.name, symbol: nft.symbol, image: metadata.image }
    } catch (e) {
        return null
    }
}