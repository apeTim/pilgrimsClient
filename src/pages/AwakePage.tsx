import { Connection } from "@solana/web3.js"
import { useEffect, useState } from "react"
import '../css/Awake.css'
import NftMetadata from "../interfaces/NftMetadata"
import PageProps from "../interfaces/PageProps"
import * as anchor from '@project-serum/anchor'
import { useAnchorWallet } from "@solana/wallet-adapter-react"
import getOwnerNfts from "../utils/getOwnerNfts"
import checkNft from "../utils/checkNft"
import getExternalMetadata from "../utils/getExternalMetadata"
import { AWAKE_PRICE, BANNED_CIDS, BOOK_ALLOWED_CREATORS, BOOK_ALLOWED_SYMBOLS, PILGRIM_ALLOWED_CREATORS, PILGRIM_ALLOWED_SYMBOLS, PROGRAM_ID, SCROLL_ALLOWED_CREATORS, SCROLL_ALLOWED_SYMBOLS, TOKEN_MINT } from "../vars"
import { Awake, IDL } from "../idl"
import sortNft from "../utils/sortNft"
import NftList from "../components/NftList"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NftChoser from "../components/NftChoser"
import actions from "../actions"
import sendAndConfirmTx from "../utils/sendAndConfirmTx"
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { getCID } from "../utils/getMetadata"

const AwakePage = (props: PageProps) => {
    const wallet = useAnchorWallet()


    const [provider, setProvider] = useState<anchor.AnchorProvider>()
    const [program, setProgram] = useState<anchor.Program<Awake>>()
    const [walletPilgrims, setWalletPilgrims] = useState<NftMetadata[]>([])
    const [walletBooks, setWalletBooks] = useState<NftMetadata[]>([])
    const [walletScrolls, setWalletScrolls] = useState<NftMetadata[]>([])
    const [awakenedPilgrim, setAwakenedPilgrim] = useState<NftMetadata>()
    const [mints, setMints] = useState<{ pilgrim: NftMetadata | null, book: NftMetadata | null, scroll: NftMetadata | null}>({
        pilgrim: null,
        book: null,
        scroll: null
    })

    const [loadingStates, setLoadingStates] = useState({
        walletPilgrims: false,
        walletBooks: false,
        walletScrolls: false
    })


    const loadNfts = async (provider: anchor.Provider, program: anchor.Program<Awake>) => {
        if (!wallet) return

        setLoadingStates(loadingStates => ({ ...loadingStates, walletPilgrims: true, walletBooks: true, walletScrolls: true }))

        const nfts = await getOwnerNfts(provider.connection, wallet.publicKey)
        nfts.forEach(async nft => {
            if (!(checkNft(nft, PILGRIM_ALLOWED_SYMBOLS, PILGRIM_ALLOWED_CREATORS) || checkNft(nft, BOOK_ALLOWED_SYMBOLS, BOOK_ALLOWED_CREATORS) || checkNft(nft, SCROLL_ALLOWED_SYMBOLS, SCROLL_ALLOWED_CREATORS))) {
                return
            }
            const nftExternalMetadata = await getExternalMetadata(nft)
            if (!nftExternalMetadata) return

            if (checkNft(nft, PILGRIM_ALLOWED_SYMBOLS, PILGRIM_ALLOWED_CREATORS)) {
                if (BANNED_CIDS.includes(getCID(nft.uri))) return
                setWalletPilgrims(nfts => [...nfts, nftExternalMetadata].sort(sortNft))
            } else if (checkNft(nft, BOOK_ALLOWED_SYMBOLS, BOOK_ALLOWED_CREATORS)) {
                setWalletBooks(nfts => [...nfts, nftExternalMetadata].sort(sortNft))
            } else if (checkNft(nft, SCROLL_ALLOWED_SYMBOLS, SCROLL_ALLOWED_CREATORS)) {
                setWalletScrolls(nfts => [...nfts, nftExternalMetadata].sort(sortNft))
            }
        })

        setLoadingStates(loadingStates => ({ ...loadingStates, walletPilgrims: false, walletBooks: false, walletScrolls: false }))
    }

    const reset = () => {
        setWalletPilgrims([])
        setWalletBooks([])
        setWalletScrolls([])
        setMints({ 
            pilgrim: null,
            book: null,
            scroll: null
        })
    }

    const chooseNft = (nft: NftMetadata) => {
        switch (nft.symbol) {
            case 'PILGRIMS': 
                setMints(mints => ({...mints, pilgrim: nft }))
                break
            case 'BOOK':
                setMints(mints => ({...mints, book: nft }))
                break
            case 'SCROLL':
                setMints(mints => ({...mints, scroll: nft }))
                break
            default:
                break
        }
    }

    const awake = async () => {
        if (!program || !wallet || !provider) return
        if (!(mints.pilgrim && mints.book && mints.scroll)) return

        const tokenAta = await getAssociatedTokenAddress(TOKEN_MINT, wallet.publicKey)
        const tokenBalance = await props.connection.getTokenAccountBalance(tokenAta)
        if ((tokenBalance.value.uiAmount || 0) < AWAKE_PRICE) return toast('You don\'t have enough $EYE tokens. 1680 $EYE needed', { type: 'error' })
        
        try {
            const tx = await actions.awake(provider, program, { pilgrim: mints.pilgrim as NftMetadata, book: mints.book as NftMetadata, scroll: mints.scroll as NftMetadata })
            tx.recentBlockhash = !tx.recentBlockhash ? (await provider.connection.getLatestBlockhash()).blockhash : tx.recentBlockhash
            tx.feePayer = !tx.feePayer ? provider.wallet.publicKey : tx.feePayer
            const signedTx = await provider.wallet.signTransaction(tx)
            await toast.promise(sendAndConfirmTx(provider.connection, signedTx), {
                pending: 'Confirming Awake Tx',
                success: 'Pilgrim is succesfully Awaken',
                error: 'Failed to Awake Pilgrim'
            })
            setAwakenedPilgrim(mints.pilgrim)
            reset()
            loadNfts(provider, program)
        } catch (e: any) {
            console.log(e)
            toast('Failed to Awake Pilgrim', { type: 'error' })
        }
    }
    const offerPilgrim = () => {
        if (walletPilgrims.length === 0) return toast('You do not have The Pilgrim', { type: 'warning' })
        setMints(mints => ({...mints, pilgrim: walletPilgrims[0]}))
    }

    const offerBook = () => {
        if (walletBooks.length === 0) return toast('You do not have The Book Of The All-Seeing', { type: 'warning' })
        setMints(mints => ({...mints, book: walletBooks[0]}))
    }

    const offerScroll = () => {
        if (walletScrolls.length === 0) return toast('You do not have The Scroll Of Enlightenment', { type: 'warning' })
        setMints(mints => ({...mints, scroll: walletScrolls[0]}))
    }

    useEffect(() => {
        if (!wallet) return
        if (provider?.wallet.publicKey.equals(wallet.publicKey)) return

        const newProvider = new anchor.AnchorProvider(props.connection, wallet, { commitment: 'confirmed' })
        const newProgram = new anchor.Program(IDL, PROGRAM_ID, newProvider)

        anchor.setProvider(newProvider)
        setProvider(newProvider)
        setProgram(newProgram)

        loadNfts(newProvider, newProgram)
    }, [wallet])

    return (
        <div className="Page Awake">
            {awakenedPilgrim ? 
            <div className="banner">
                <h1 className="title animate__animated animate__fadeInUp">{awakenedPilgrim.name.toUpperCase()} IS AWAKENED</h1>
                <button onClick={() => setAwakenedPilgrim(undefined)} className="actionButton animate__animated animate__fadeInUp">CONTINUE</button>
            </div>  : <div className="banner">
                <h3 className="subTitle animate__animated animate__fadeInUp">Achieve transcendence</h3>
                <h1 className="title animate__animated animate__fadeInUp">Awaken your Pilgrim</h1>
                <div className="chooser">
                    <NftChoser wallet={wallet} nft={mints.pilgrim} name='Pilgrim' action={offerPilgrim} />
                    <NftChoser wallet={wallet} nft={mints.book} name='Book of the all-seeing' action={offerBook} />
                    <NftChoser wallet={wallet} nft={mints.scroll} name='Scroll of enlightenment' action={offerScroll} />
                </div> 
                {wallet && wallet.publicKey ? <button onClick={awake} disabled={!(mints.pilgrim && mints.book && mints.scroll)} className="actionButton animate__animated animate__fadeInUp">AWAKEN FOR 1680 $EYE</button> : <WalletMultiButton className="actionButton animate__animated animate__fadeInUp"/> }
            </div>}
            { wallet && wallet.publicKey ? <>
            <div className="nftView">
                <h2 className="collection">YOUR PILGRIMS</h2>
                <NftList isLoading={loadingStates.walletPilgrims} nfts={walletPilgrims} chooseNft={chooseNft} chosen={mints.pilgrim} />
            </div>
            <div className="nftView">
                <h2 className="collection">YOUR BOOKS</h2>
                <NftList isLoading={loadingStates.walletBooks} nfts={walletBooks} chooseNft={chooseNft} chosen={mints.book} />
            </div>
            <div className="nftView">
                <h2 className="collection">YOUR SCROLLS</h2>
                <NftList isLoading={loadingStates.walletScrolls} nfts={walletScrolls} chooseNft={chooseNft} chosen={mints.scroll} />
            </div>
            </> : null}
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} theme='dark' />
        </div>
    )
}

export default AwakePage