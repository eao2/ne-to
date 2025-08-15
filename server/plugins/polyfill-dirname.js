// server/plugins/polyfill-dirname.js
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirnameValue = dirname(__filename)

globalThis.__filename = __filename
globalThis.__dirname = __dirnameValue

export default {} // ✅ Needed so Nuxt can import the plugin
