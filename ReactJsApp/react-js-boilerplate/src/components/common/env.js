const getEnv = () => {
    const host = window.location.host
    let env = 'local'
    if (host.indexOf('localhost') !== -1)
        env = 'local'
    else if (host.indexOf('cex-react-ui-dev') !== -1)
        env = 'dev'
    else if (host.indexOf('cex-react-ui-uat') !== -1)
        env = 'uat'
    else if (host.indexOf('cex-react-ui-nft') !== -1)
        env = 'dev'
    return env
}
export default getEnv