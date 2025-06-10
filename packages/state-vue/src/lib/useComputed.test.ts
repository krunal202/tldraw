import { mount } from '@vue/test-utils'
import { Atom } from '@tldraw/state'
import { defineComponent, h, nextTick } from 'vue'
import { useAtom } from './useAtom'
import { useComputed } from './useComputed'
import { useValue } from './useValue'

it('useComputed returns computed value', async () => {
  let theComputed: any = null
  let theAtom: Atom<number> | null = null
  const Comp = defineComponent({
    setup() {
      const a = useAtom('a', 1)
      theAtom = a
      const b = useComputed('a+1', () => a.get() + 1, [])
      theComputed = b
      return () => h('div', useValue(b))
    },
  })
  const wrapper = mount(Comp)
  expect(theComputed?.get()).toBe(2)
  expect(wrapper.text()).toBe('2')
  theAtom!.set(5)
  await nextTick()
  expect(wrapper.text()).toBe('6')
})
