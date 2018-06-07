import aeIdentityAvatar from './../aeIdentityAvatar/aeIdentityAvatar.vue'
import helperMixin from './../../mixins/helper'

/**
 * Displays an Identity with an avatar blockie, the address and an amount of ether
 */
export default {
  name: 'ae-identity-light',
  components: { aeIdentityAvatar },
  props: {
    /**
    * An object representing a identity. Must have a adress string a tokenBalance and a balance
    */
    identity: {
      type: Object,
      default: () => ({
        address: '0x0',
        balance: 0
      })
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    invert: {
      type: Boolean,
      default: false
    }
  },
  mixins: [
    helperMixin
  ],
  computed: {
    amount () {
      return this.identity ? this.readableToken(this.identity.balance) : 0
    },
    classObject () {
      return [
        'ae-identity-light',
        this.collapsedModifier,
        this.invert ? '_invert' : ''
      ]
    },
    chunkAddress () {
      const chunks = this.identity.address.match(/.{1,7}/g)
      return [chunks.slice(0, 3), chunks.slice(3)]
    },
    collapsedModifier () {
      return this.collapsed ? '_collapsed' : ''
    }
  },
  filters: {
    shorten: value => value.substr(0, 8)
  }
}
