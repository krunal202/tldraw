/* eslint-disable prefer-rest-params */
import { Signal, computed as createComputed, react } from '@tldraw/state'
import { onUnmounted, ref, watchEffect } from 'vue'

export function useValue<Value>(value: Signal<Value>): Value
export function useValue<Value>(name: string, fn: () => Value, deps: unknown[]): Value
export function useValue() {
  const args = arguments as any
  const deps = args.length === 3 ? args[2] : [args[0]]
  const name = args.length === 3 ? args[0] : `useValue(${args[0].name})`

  const valueRef = ref<any>()

  const getSignal = () => {
    if (args.length === 1) return args[0] as Signal<any>
    return createComputed(name, args[1])
  }

  let signal = getSignal()
  const update = () => {
    try {
      valueRef.value = signal.get()
    } catch {
      valueRef.value = {}
    }
  }

  const stop = react(`useValue(${name})`, () => {
    update()
  })

  watchEffect(() => update())
  onUnmounted(() => stop())

  return valueRef.value
}
