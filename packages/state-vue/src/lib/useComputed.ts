/* eslint-disable prefer-rest-params */
import { Computed, ComputedOptions, computed as createComputed } from '@tldraw/state'
import { shallowRef, watch } from 'vue'

export function useComputed<Value>(name: string, compute: () => Value, deps: any[]): Computed<Value>
export function useComputed<Value, Diff = unknown>(
  name: string,
  compute: () => Value,
  opts: ComputedOptions<Value, Diff>,
  deps: any[],
): Computed<Value>
export function useComputed() {
  const name = arguments[0]
  const compute = arguments[1]
  const opts = arguments.length === 3 ? undefined : arguments[2]
  const deps = arguments.length === 3 ? arguments[2] : arguments[3]

  const c = shallowRef<Computed<any>>()
  if (!c.value) {
    c.value = createComputed(`useComputed(${name})`, compute, opts)
  }
  watch(deps ?? [], () => {
    c.value = createComputed(`useComputed(${name})`, compute, opts)
  })
  return c.value!
}
