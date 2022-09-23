import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ConfirmOptions, Connection, sendAndConfirmRawTransaction, SendTransactionError, Transaction } from "@solana/web3.js";


class ConfirmError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export default async (connection: Connection, tx: Transaction, opts?: ConfirmOptions) => {
    const rawTx = tx.serialize();

    try {
        return await sendAndConfirmRawTransaction(connection, rawTx, opts);
    } catch (err) {
        if (err instanceof ConfirmError) {
            const failedTx = await connection.getTransaction(
                bs58.encode(tx.signature!),
                { commitment: "confirmed" }
            );
            if (!failedTx) {
                throw err;
            } else {
                const logs = failedTx.meta?.logMessages;
                throw !logs ? err : new SendTransactionError(err.message, logs);
            }
        } else {
            throw err;
        }
    }
}