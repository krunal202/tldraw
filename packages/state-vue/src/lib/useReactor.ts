import { EffectScheduler } from '@tldraw/state'
import { onMounted, onUnmounted, ref, watch } from 'vue'

export function useReactor(name: string, reactFn: () => void, deps: undefined | any[] = []) {
  const raf = ref(-1)

  const createScheduler = () =>
    new EffectScheduler(name, reactFn, {
      scheduleEffect: (cb) => {
        const id = requestAnimationFrame(cb)
        raf.value = id
        return id
      },
    })

  let scheduler = createScheduler()

  watch(deps || [], () => {
    scheduler.detach()
    cancelAnimationFrame(raf.value)
    scheduler = createScheduler()
    scheduler.attach()
    scheduler.execute()
  })

  onMounted(() => {
    scheduler.attach()
    scheduler.execute()
  })

  onUnmounted(() => {
    scheduler.detach()
    cancelAnimationFrame(raf.value)
  })
}
