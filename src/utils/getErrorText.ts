export default (e: any) => {
    let hexErrorCode;
    if (e.message.includes('0x')) {
        hexErrorCode = e.message.slice(e.message.indexOf('0x'))
    }
    let text = `An error${hexErrorCode ? ` "${hexErrorCode}" ` : " "}occured`

    if (e.error?.code) {
        switch (e.error.code) {
            case 4001:
                text = 'User rejected Transaction'
                break
            default:
                text = `An error occured`

        }
    }
    return text
}