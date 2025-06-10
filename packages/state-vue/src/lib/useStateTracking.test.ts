import { mount } from '@vue/test-utils'
import { atom } from '@tldraw/state'
import { defineComponent, h, nextTick } from 'vue'
import { useStateTracking } from './useStateTracking'

it('causes rerender when dependency changes', async () => {
  const a = atom('a', 0)
  const Comp = defineComponent({
    setup() {
      const val = useStateTracking('test', () => a.get())
      return () => h('div', `You are ${val} years old`)
    },
  })
  const wrapper = mount(Comp)
  expect(wrapper.text()).toBe('You are 0 years old')
  a.set(1)
  await nextTick()
  expect(wrapper.text()).toBe('You are 1 years old')
})
