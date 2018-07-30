<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <h3>sendTransaction(Send Eth to Address)</h3>
      <q-input
        v-model="toAddress"
        float-label="To Address"
        placeholder="0x123456787890... ..." />
      <br>
      <q-input
        v-model="inputEth"
        type="number"
        float-label="Amount"
        placeholder="0.1" />
      <br>

      <q-btn
        label="Send"
        color="primary"
        @click="sendEth" />

      <h3>Ethereum</h3>
      <div v-if="web3">
        <table class="q-table striped">
          <thead>
            <tr>
              <th class="text-left">Property</th>
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Web3 Version</td>
              <td>{{ version }}</td>
            </tr>
            <tr>
              <td>Current Network</td>
              <td>{{ network }}</td>
            </tr>
            <tr v-if="account">
              <td>Current Account</td>
              <td>{{ account }}</td>
            </tr>
            <tr v-else>
              <td colspan="2">Please Unlock Account in web3 provider</td>
            </tr>

          </tbody>
        </table>
      </div>
      <div v-else>
        <h4>Web3 Provider未検出</h4>
      </div>
    </div>
  </q-page>
</template>

<script>
import ethereum from '../../utils/ethereum.js'

export default {
    data: function () {
        return {
            web3: null,
            version: '',
            account: '',
            network: {},
            toAddress: '0x5d12c33385446f27a953b3cc9df99cdcc61fa4db',
            inputEth: 0.1

        }
    },
    created: async function () {
        console.log(ethereum)
        this.web3 = ethereum.getWeb3()
        this.version = await this.web3.version
        this.account = await ethereum.currentAccount()
        this.network = await ethereum.currentNetwork()
    },
    computed: {
    },
    methods: {
        async sendEth () {
            try {
                const gasPrice = await this.web3.eth.getGasPrice()
                console.log(gasPrice)
                let result = await this.web3.eth.sendTransaction({
                    value: this.web3.utils.toWei(this.inputEth.toString()),
                    from: this.account,
                    to: this.toAddress,
                    gasPrice: gasPrice,
                    gas: '150000'

                })
                console.log(result)
            } catch (e) {
                console.log(e)
            }
        }
    }

}
</script>
