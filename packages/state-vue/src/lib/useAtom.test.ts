import { mount } from '@vue/test-utils'
import { Atom } from '@tldraw/state'
import { defineComponent, h, nextTick } from 'vue'
import { useAtom } from './useAtom'
import { useValue } from './useValue'

it('useAtom returns an atom', async () => {
  let theAtom: Atom<any> | null = null
  const Comp = defineComponent({
    setup() {
      const a = useAtom('myAtom', 'a')
      theAtom = a
      return () => h('div', useValue(a))
    },
  })
  const wrapper = mount(Comp)
  expect(theAtom).not.toBeNull()
  expect(theAtom?.get()).toBe('a')
  expect(wrapper.text()).toBe('a')
  theAtom!.set('b')
  await nextTick()
  expect(wrapper.text()).toBe('b')
})
