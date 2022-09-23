import { PublicKey } from "@solana/web3.js";
import axios from 'axios'
import * as metaplex from '@metaplex/js'
import NftMetadata from "../interfaces/NftMetadata";
const { Metadata } = metaplex.programs.metadata

export default async (nft: metaplex.programs.metadata.MetadataData): Promise<NftMetadata | null> => {
    const data = nft.data
    try {
        const metadata = (await axios.get(data.uri)).data
        return { mint: new PublicKey(nft.mint), name: nft.data.name, symbol: nft.data.symbol, image: metadata.image }
    } catch (e) {
        return null
    }
}