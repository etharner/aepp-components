const blockies = require('ethereum-blockies-png')
const numeral = require('numeral')

export default {
  methods: {
    forwardEvent (event) {
      this.$emit(event.type, event)
    },
    readableToken (balance) {
      return numeral(balance / 10e12).format('0,0.[000]')
    }
  }
}
