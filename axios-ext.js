const axios = require('axios');
// const SocksProxyAgent = require('socks-proxy-agent');
const SocksAgent = require('axios-socks5-agent')


function setup_proxy() {
    let httpsAgent = undefined,
        httpAgent = undefined;
    if (process.env.ENABLE_TOR === '1') {
        // httpsAgent = new SocksProxyAgent(process.env.TOR_SOCKS5);
        socksroxy = SocksAgent({
            agentOptions: {
                keepAlive: true,
            },
            // socks5
            host: process.env.TOR_SOCKS5_HOST,
            port: parseInt(process.env.TOR_SOCKS5_PORT),
        })
        httpAgent = socksroxy.httpAgent
        httpsAgent = socksroxy.httpsAgent
    }
    const client = axios.create({ httpAgent, httpsAgent });
    return client;
}


module.exports = {
    setup_proxy: setup_proxy
}