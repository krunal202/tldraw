import { defineComponent } from 'vue'
import { useStateTracking } from './useStateTracking'

export function track(component: any) {
  return defineComponent({
    name: component.name ? `tracked(${component.name})` : 'TrackedComponent',
    props: component.props || {},
    setup(props, ctx) {
      return () => useStateTracking(component.name ?? 'tracked', () => component(props, ctx))
    },
  })
}
