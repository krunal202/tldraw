import { registerTldrawLibraryVersion } from '@tldraw/utils'
export { default as TldrawVue } from './lib/TldrawVue.vue'

registerTldrawLibraryVersion(
  (globalThis as any).TLDRAW_LIBRARY_NAME,
  (globalThis as any).TLDRAW_LIBRARY_VERSION,
  (globalThis as any).TLDRAW_LIBRARY_MODULES,
)
