import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from '@metaplex-foundation/js'

export default async (connection: Connection, owner: PublicKey, isCorrect?: (nft: any) => boolean) => {
    const metaplex = new Metaplex(connection)
    return await metaplex.nfts().findAllByOwner({ owner }).run()
}