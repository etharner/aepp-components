<template>
  <ae-textarea
    class="ae-address-input"
    type="textarea"
    monospace
    :value="formattedValue"
    @input="handleInput"
    @copy="handleCopy"
  />
</template>

<script>
import AeTextarea from '../aeTextarea/aeTextarea.vue'

export default {
  name: 'ae-address-input',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: { AeTextarea },
  computed: {
    formattedValue () {
      return this.formatAddress(this.value).address
    }
  },
  methods: {
    handleInput () {
      const { selectionStart, value } = this.$el
      const { address, cursor } = this.formatAddress(value, selectionStart)
      if (address !== value) {
        this.$el.value = address
        const setSelection = () => this.$el.setSelectionRange(cursor, cursor)
        setSelection()
        setTimeout(setSelection, 0)
      }
      this.$emit('input', address.replace(/[ \n]/g, ''))
    },
    handleCopy (event) {
      const { selectionStart: s1, selectionEnd: s2, value } = event.target
      event.clipboardData.setData('text/plain',
        value.slice(Math.min(s1, s2), Math.max(s1, s2)).replace(/[ \n]/g, ''))
      event.preventDefault()
    },
    formatAddress (address, cursor = address.length) {
      if (['', '0'].includes(address)) return { address, cursor }

      let [begin, end] = [[address.startsWith('ak$') ? 3 : 0, cursor], [cursor]]
        .map(args => address.slice(...args).replace(/[^123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]/g, ''))

      begin = `ak$${begin}`
      let res = `${begin}${end}`.slice(0, 97)

      return { address: res, cursor: begin.length }
    }
  }
}
</script>

<style scoped lang="scss">
  .ae-address-input.ae-textarea {
    resize: none;
    text-align: center;
    min-height: 0;
    height: 90px;
    line-height: 29px;
  }
</style>
