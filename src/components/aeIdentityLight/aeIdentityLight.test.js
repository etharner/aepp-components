import {shallow} from 'vue-test-utils'
import AeIdentityLight from './aeIdentityLight.vue'
import AeIdentityAvatar from './../aeIdentityAvatar/aeIdentityAvatar.vue'

describe('AeIdentityLight', () => {
  const _shallow = props => {
    return shallow(AeIdentityLight, {
      propsData: props
    })
  }
  const testIdentity = () => ({
    address: '0x1234' + '123456'.repeat(5),
    balance: 0
  })

  describe('rendering', () => {
    describe('avatar', () => {
      const genTest = collapsed => () => {
        const wrapper = _shallow({ collapsed })
        const avatar = wrapper.find(AeIdentityAvatar)
        expect(avatar.exists()).toBe(true)
      }

      it('renders an identity avatar when not collapsed', genTest(false))
      it('renders an identity avatar when collapsed', genTest(true))
    })

    describe('balance', () => {
      const genTest = collapsed => () => {
        const wrapper = _shallow({
          collapsed,
          address: '0x0',
          balance: 600000000000
        })

        expect(wrapper.find('.balance.token .amount').text())
          .toBe('600000000000')
      }

      it('renders the given balance when not collapsed', genTest(false))
      it('renders the given balance when collapsed', genTest(true))
    })

    describe('chunked address', () => {
      const genTest = collapsed => () => {
        const wrapper = _shallow({
          collapsed,
          ...testIdentity()
        })
        const chunks = wrapper.findAll('.chunk')
        expect(chunks.length).toBe(collapsed ? 0 : 6)
      }

      it('renders given address as six chunks when not collapsed', genTest(false))
      it('does NOT render given address as chunks when collapsed', genTest(true))
    })

    describe('truncated address', () => {
      it('renders the first seven characters of the given address when collapsed', () => {
        const identity = testIdentity()
        const wrapper = _shallow({
          collapsed: true,
          ...identity
        })
        const truncatedAddress = wrapper.find('.truncated-address')
        const expected = identity.address.substr(0, 8)
        expect(truncatedAddress.text().includes(expected)).toBe(true)
      })

      it('does NOT render a truncated address when not collapsed', () => {
        const wrapper = _shallow(testIdentity())
        const truncatedAddress = wrapper.find('.truncated-address')
        expect(truncatedAddress.exists()).toBe(false)
      })
    })
  })

  describe('events', () => {
    describe('click', () => {
      it('emits click when root element is clicked', () => {
        const wrapper = _shallow()

        wrapper.element.dispatchEvent(new Event('click'))
        const emittedClick = wrapper.emitted('click')
        expect(emittedClick.length).toBe(1)
        expect(emittedClick[0][0].type).toBe('click')
      })

      it('emits click when token balance is clicked', () => {
        const wrapper = _shallow()

        const tokenValue = wrapper.find('.balance.token .amount')
        tokenValue.trigger('click')
        const emittedClick = wrapper.emitted('click')
        expect(emittedClick.length).toBe(1)
        expect(emittedClick[0][0].type).toBe('click')
      })
    })

    it('emits click when address chunk is clicked', () => {
      const wrapper = _shallow(testIdentity())

      const chunkList = wrapper.findAll('.chunk')
      const ramdomChunk = chunkList.at(Math.floor(Math.random() * chunkList.length))
      ramdomChunk.trigger('click')
      const emittedClick = wrapper.emitted('click')
      expect(emittedClick.length).toBe(1)
      expect(emittedClick[0][0].type).toBe('click')
    })

    it('forwards click when identity avatar emits click', () => {
      const wrapper = _shallow()
      const avatar = wrapper.find(AeIdentityAvatar)
      avatar.trigger('click')
      const emittedClick = wrapper.emitted('click')
      expect(emittedClick.length).toBe(1)
      expect(emittedClick[0][0].type).toBe('click')
    })
  })
})
