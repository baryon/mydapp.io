<template>
  <q-page class="flex flex-center">
    {{ web3.version }}
    <br>
    {{ accounts }}
    <br>
    {{ account }}
    <br>
    {{ network }}
  </q-page>
</template>

<style>
</style>

<script>
import provider from '../utils/provider.js'

export default {
    name: 'PageIndex',
    data: function () {
        return {
            web3: provider(),
            accounts: [],
            account: '',
            network: ''

        }
    },
    created: async function () {
        console.log(this.web3)
        const accounts = await this.web3.eth.getAccounts()
        if (accounts && accounts.length > 0) {
            this.account = accounts[0]
        }

        this.web3.eth.getBlock(0, (err, block) => {
            let data = {}
            this.network = data
            if (err) {
                console.log(err, accounts)
                return
            }

            if (block && block.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3') {
                data.chain = 'mainnet'
                data.etherscan = 'https://etherscan.io'
            } else if (block && block.hash === '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d') {
                data.chain = 'ropsten'
                data.etherscan = 'https://testnet.etherscan.io'
            } else if (block && block.hash === '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9') {
                data.chain = 'kovan'
                data.etherscan = 'https://kovan.etherscan.io'
            } else {
                data.chain = 'privatenet'
                data.etherscan = 'https://testnet.etherscan.io'
            }
            this.network = data
        })
    }
}
</script>
