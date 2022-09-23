import { Connection, PublicKey } from "@solana/web3.js";
import * as metaplex from '@metaplex/js'
const { Metadata } = metaplex.programs.metadata

export default async (connection: Connection, owner: PublicKey, isCorrect?: (nft: any) => boolean) => {
    return await Metadata.findDataByOwner(connection, owner)
}