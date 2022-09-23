import NftMetadata from "../interfaces/NftMetadata"
import Img from "./Img"
import '../css/NftList.css'

interface Props {
    isLoading: boolean,
    chooseNft: (nft: NftMetadata) => void,
    chosen: NftMetadata | null,
    nfts: NftMetadata[]
}

const NftList = (props: Props) => {
    return (
        <div className="nftList">
            { props.isLoading ? 
            <h3 className="status">Loading...</h3>
             : 
                props.nfts.length > 0 ? props.nfts.map(nft => 
                <div onClick={() => props.chooseNft(nft)} className="nft">
                    <Img className={props.chosen && props.chosen.mint.equals(nft.mint) ? "nftImg nftImgChosen" : "nftImg"} src={nft.image} />
                </div>
            ) : <h3 className="status">Empty</h3>}
        </div>
    )
}

export default NftList