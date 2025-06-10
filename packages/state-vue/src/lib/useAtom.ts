import { Atom, AtomOptions, atom } from '@tldraw/state'
import { shallowRef } from 'vue'

export function useAtom<Value, Diff = unknown>(
  name: string,
  valueOrInitialiser: Value | (() => Value),
  options?: AtomOptions<Value, Diff>,
): Atom<Value, Diff> {
  const a = shallowRef<Atom<Value, Diff> | null>(null)
  if (!a.value) {
    const initialValue = typeof valueOrInitialiser === 'function'
      ? (valueOrInitialiser as any)()
      : valueOrInitialiser
    a.value = atom(`useAtom(${name})`, initialValue, options)
  }
  return a.value!
}
