import { PublicKey } from "@solana/web3.js"
import axios from "axios"

export const NETWORK = 'mainnet-beta'
export const RPC = 'https://ssc-dao.genesysgo.net'
const API_ENDPOINT = 'https://awakening-api.thepilgrims.xyz'
export const PROGRAM_ID = new PublicKey('AWAkeiv9qFdZ13T2RGDwZPtBncSev7zKs2yjqCXoZdDT')
export const TOKEN_MINT = new PublicKey('EQWMCUExLbFichqpfbK9YLCGwF1geupfzenkRhsDtpc8')
export const TOKEN_NAME = 'EYE'

export const AWAKE_PRICE = 1680
export const BANNED_CIDS = ["bafybeic2jpkpmmpgp24p7p6pu2svym2e245zuhvepkwqeejjrdevfe3t7e", "bafybeicss6j7rnqdgw3bka3uspagi3juqtxkmrk6boqsw37zckg5hjhr64"]

export const api = axios.create({
    baseURL: API_ENDPOINT
})

export const PILGRIM_ALLOWED_SYMBOLS = [
    "PILGRIMS"
];
export const PILGRIM_ALLOWED_CREATORS = [
    "EoGKwBBdZtqox41vTvaV4UtVSU8PjXwXGba5qzHTRoyc"
];

export const BOOK_ALLOWED_SYMBOLS = [
    "BOOK"
];
export const BOOK_ALLOWED_CREATORS = [
    "AGHSTrNjGjAfZL8DGeyTqogYdVcvQHJVgPcpsfgpQsvR"
];

export const SCROLL_ALLOWED_SYMBOLS = [
    "SCROLL"
];
export const SCROLL_ALLOWED_CREATORS = [
    "9ZGPU2piTpeFpMKG4BBxSzyoZchbGdrGzR3gW4QwtCRM"
];