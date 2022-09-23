import * as anchor from "@project-serum/anchor";
import { Awake } from "../idl";
import NftMetadata from "../interfaces/NftMetadata";
import { api } from "../vars";

export default async (provider: anchor.AnchorProvider, program: anchor.Program<Awake>, mints: { pilgrim: NftMetadata, book: NftMetadata, scroll: NftMetadata}) => {
    const { wallet } = provider
    const { serializedTx } = (await api.post(`/getPilgrimAwakeTx`, {
        initializer: wallet.publicKey.toBase58(),
        pilgrim: mints.pilgrim.mint.toBase58(),
        book: mints.book.mint.toBase58(),
        scroll: mints.scroll.mint.toBase58()
    })).data

    return anchor.web3.Transaction.from(Buffer.from(serializedTx, 'base64'))
}