import { EMPTY_ARRAY, EffectScheduler } from '@tldraw/state'
import { onMounted, onUnmounted } from 'vue'

export function useQuickReactor(name: string, reactFn: () => void, deps: any[] = EMPTY_ARRAY) {
  let scheduler: EffectScheduler<void>

  const create = () => new EffectScheduler(name, reactFn)
  scheduler = create()

  onMounted(() => {
    scheduler.attach()
    scheduler.execute()
  })

  onUnmounted(() => scheduler.detach())
}
