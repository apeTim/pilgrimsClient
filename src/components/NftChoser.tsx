import { AnchorWallet } from "@solana/wallet-adapter-react"
import NftMetadata from "../interfaces/NftMetadata"

interface Props {
    nft: NftMetadata | null,
    name: string,
    action: () => void,
    wallet: AnchorWallet | undefined
}
const NftChoser = (props: Props) => {
    return (
        <div className="chooseElement animate__animated animate__fadeInUp">
            {!props.nft ? <img className="img" src={`/img/${props.name.split(' ')[0].toLowerCase()}Placeholder.jpg`} /> :  <img className="img" src={props.nft.image} />}
            {props.wallet && props.wallet.publicKey && !props.nft ? <button onClick={props.action} className="secondaryButton">Offer {props.name}</button> : null}
        </div>
    )
}

export default NftChoser