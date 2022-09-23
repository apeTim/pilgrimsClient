import { PublicKey } from "@solana/web3.js"
import * as metaplex from '@metaplex/js'
import NftMetadata from "../interfaces/NftMetadata"

export default (nft: metaplex.programs.metadata.MetadataData, allowedSymbols: string[], allowedCreators: string[]) => {
    if (!nft.data.creators) return false
    
    let isCreatorValid = false
    for (let creator of nft.data.creators) {
        if (creator.verified && allowedCreators.includes(creator.address)) {
            isCreatorValid = true
            break
        }
    }
    if (!isCreatorValid) return false

    let isSymbolValid = false
    for (let symbol of allowedSymbols) {
        if (nft.data.symbol == symbol) {
            isSymbolValid = true
            break
        }
    }

    return isSymbolValid
}

export const isOverlord = (nft: NftMetadata) => {
    return nft.name.includes('Cosmic') || nft.name.includes('Royal') || nft.name.includes('Unique')
}