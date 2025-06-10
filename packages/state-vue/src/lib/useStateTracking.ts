import { EffectScheduler } from '@tldraw/state'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

export function useStateTracking<T>(name: string, render: () => T) {
  const trigger = ref(0)
  const scheduler = new EffectScheduler(`useStateTracking(${name})`, () => {
    trigger.value++
  })

  onMounted(() => {
    scheduler.attach()
    scheduler.execute()
  })

  onUnmounted(() => scheduler.detach())

  watchEffect(() => {
    trigger.value
    scheduler.maybeScheduleEffect()
  })

  return scheduler.execute()
}
