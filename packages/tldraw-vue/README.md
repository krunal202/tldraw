# @tldraw/vue

Vue bindings for the tldraw editor. This package exposes a `<TldrawVue>` component which wraps the React implementation and lets you use the editor inside Vue applications.

## Installation

```bash
npm install git+https://github.com/<your-user>/<your-repo>.git#packages/tldraw-vue
```

Make sure you also install `tldraw` and its peer dependencies `react` and `react-dom`.

## Usage

```vue
<script setup lang="ts">
import { TldrawVue } from '@tldraw/vue'
import 'tldraw/tldraw.css'
</script>

<template>
  <TldrawVue />
</template>
```

## License

This project is provided under the MIT license.
