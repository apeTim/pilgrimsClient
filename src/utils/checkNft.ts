import { Metadata, Nft, Sft } from "@metaplex-foundation/js"
import { PublicKey } from "@solana/web3.js"
import NftMetadata from "../interfaces/NftMetadata"

export default (nft: Metadata | Nft | Sft, allowedSymbols: string[], allowedCreators: string[]) => {
    if (!nft.creators) return false
    
    let isCreatorValid = nft.creators.find(creator => creator.verified && allowedCreators.includes(creator.address.toBase58()))
    if (!isCreatorValid) return false

    let isSymbolValid = allowedSymbols.includes(nft.symbol)
    return isSymbolValid
}

export const isOverlord = (nft: NftMetadata) => {
    return nft.name.includes('Cosmic') || nft.name.includes('Royal') || nft.name.includes('Unique')
}