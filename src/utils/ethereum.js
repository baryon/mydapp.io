import Web3 from 'web3'

const context = (typeof window === 'object') ? window : global

let provider,
    bundledWeb3

function getProvider () {
    if (!provider) {
        if (context.web3 === undefined) {
            throw Error('this application needs to run in a DApp browser')
        } else {
            provider = context.web3.currentProvider
        }
    }

    return provider
}

function getWeb3 () {
    if (!bundledWeb3) {
        // even if web3 is already defined we use the web3 library bundled
        // with the application instead of some unknown version injected by the browser
        bundledWeb3 = new Web3(getProvider())
    }

    return bundledWeb3
}

// async function isLocked() {
//     return getWeb3() && await currentAccount()
// }

async function currentAccount () {
    const accounts = await getWeb3().eth.getAccounts()
    console.log(accounts)
    if (accounts && accounts.length > 0) {
        return accounts[0]
    }
    return null
}

async function currentNetwork () {
    // const block = await getWeb3().eth.getBlock(0)
    // let data = {}
    //
    // if (block && block.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3') {
    //     data.chain = 'mainnet'
    //     data.etherscan = 'https://etherscan.io'
    // } else if (block && block.hash === '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d') {
    //     data.chain = 'ropsten'
    //     data.etherscan = 'https://testnet.etherscan.io'
    // } else if (block && block.hash === '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9') {
    //     data.chain = 'kovan'
    //     data.etherscan = 'https://kovan.etherscan.io'
    // } else {
    //     data.chain = 'privatenet'
    //     data.etherscan = 'https://testnet.etherscan.io'
    // }

    const chainId = await getWeb3().eth.net.getId()
    let data = {chainId}

    switch (chainId) {
        case 1:
            console.log('This is mainnet')
            data.chain = 'mainnet'
            data.etherscan = 'https://etherscan.io'
            break
        case 2:
            console.log('This is the deprecated Morden test network.')
            data.chain = 'Morden'
            break
        case 3:
            console.log('This is the ropsten test network.')
            data.chain = 'ropsten'
            data.etherscan = 'https://ropsten.etherscan.io/'
            break
        case 4:
            console.log('This is the Rinkeby test network.')
            data.chain = 'Rinkeby'
            data.etherscan = 'https://rinkeby.etherscan.io/'
            break
        case 42:
            console.log('This is the Kovan test network.')
            data.chain = 'kovan'
            data.etherscan = 'https://kovan.etherscan.io'
            break
        default:
            console.log('This is an unknown network.')
            data.chain = 'privatenet'
    }

    return data
}

export default {
    getProvider,
    getWeb3,
    // isLocked,
    currentAccount,
    currentNetwork
}
