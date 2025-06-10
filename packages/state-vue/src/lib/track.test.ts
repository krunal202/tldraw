import { mount } from '@vue/test-utils'
import { atom } from '@tldraw/state'
import { h, nextTick } from 'vue'
import { track } from './track'

it('tracked component updates when atom changes', async () => {
  const a = atom('a', 1)
  const Comp = track(() => h('div', String(a.get())))
  const wrapper = mount(Comp)
  expect(wrapper.text()).toBe('1')
  a.set(2)
  await nextTick()
  expect(wrapper.text()).toBe('2')
})
