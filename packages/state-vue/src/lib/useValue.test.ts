import { mount } from '@vue/test-utils'
import { atom } from '@tldraw/state'
import { defineComponent, h, nextTick } from 'vue'
import { useAtom } from './useAtom'
import { useComputed } from './useComputed'
import { useValue } from './useValue'

it('useValue returns a value from computed', async () => {
  let theAtom = null as any
  const Comp = defineComponent({
    setup() {
      const a = useAtom('a', 1)
      theAtom = a
      const b = useComputed('a+1', () => a.get() + 1, [])
      return () => h('div', useValue(b))
    },
  })
  const wrapper = mount(Comp)
  expect(wrapper.text()).toBe('2')
  theAtom.set(5)
  await nextTick()
  expect(wrapper.text()).toBe('6')
})
