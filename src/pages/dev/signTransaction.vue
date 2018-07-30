<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <h3>Sign Transaction</h3>

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
            area: ''

        }
    },
    created: async function () {
        console.log(ethereum)
        this.web3 = ethereum.getWeb3()
        this.version = await this.web3.version
        this.account = await ethereum.currentAccount()
        this.network = await ethereum.currentNetwork()
    },
    computed: {},
    methods: {
    }

}
</script>
