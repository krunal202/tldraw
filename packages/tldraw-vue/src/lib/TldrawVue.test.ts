import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { Editor } from '@tldraw/editor'
import TldrawVue from './TldrawVue.vue'

test('TldrawVue mounts and provides editor', async () => {
  let mountedEditor: Editor | null = null
  mount(TldrawVue, {
    props: {
      onMount: (e: Editor) => {
        mountedEditor = e
      },
    },
  })
  await nextTick()
  expect(mountedEditor).not.toBeNull()
})
