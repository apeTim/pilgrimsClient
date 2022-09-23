import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import '../css/Navbar.css'
import PageProps from '../interfaces/PageProps';
import { TOKEN_MINT, TOKEN_NAME } from '../vars';

const Navbar = (props: PageProps) => {
    const wallet = useAnchorWallet()
    const [balance, setBalance] = useState(0)

    const getBalance = async () => {
        if (!wallet || !wallet.publicKey) return
        const tokenAta = await getAssociatedTokenAddress(TOKEN_MINT, wallet.publicKey)
        const tokenBalance = await props.connection.getTokenAccountBalance(tokenAta)
        setBalance(tokenBalance.value.uiAmount || 0)
    }

    useEffect(() => {
        if (!wallet || !wallet.publicKey) return
        
        getBalance()
    }, [wallet])

    return (
        <div className="navbar">
            <div className='brand'>
                <img className='logo' src='/logo.png' />
            </div>
            <div className="user">
                <WalletMultiButton />
                {wallet && wallet.publicKey ? <p className='balance'>{balance} ${TOKEN_NAME}</p> : null}
            </div>
        </div>
    )
}

export default Navbar