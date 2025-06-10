<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { Tldraw, type TldrawProps } from 'tldraw'

export default defineComponent({
  name: 'TldrawVue',
  props: Object as () => TldrawProps,
  setup(props, { slots }) {
    const container = ref<HTMLElement | null>(null)
    let root: ReturnType<typeof createRoot> | null = null

    const renderReact = () => {
      if (!root) return
      root.render(React.createElement(Tldraw, { ...props }, slots.default?.()))
    }

    onMounted(() => {
      if (!container.value) return
      root = createRoot(container.value)
      renderReact()
    })

    watchEffect(() => {
      renderReact()
    })

    onBeforeUnmount(() => {
      root?.unmount()
      root = null
    })

    return { container }
  },
})
</script>

<template>
  <div ref="container" class="tldraw-vue-container"></div>
</template>
