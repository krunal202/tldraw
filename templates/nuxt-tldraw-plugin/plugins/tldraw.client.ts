import { defineNuxtPlugin } from '#app'
import { TldrawVue } from '@tldraw/vue'
import 'tldraw/tldraw.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('TldrawVue', TldrawVue)
})
