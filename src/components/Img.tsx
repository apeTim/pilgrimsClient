import { useState } from "react"

interface Props {
    src: string,
    className: string
}

const Img = (props: Props) => {
    const placeHolderSrc = "/img/imgPlaceholder.gif"

    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <img src={isLoaded ? props.src : placeHolderSrc} onLoad={() => setIsLoaded(true)} className={props.className} />
    )
}

export default Img
