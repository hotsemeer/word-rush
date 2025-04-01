import { flattenWords } from '@/utils/flattenWords'
let categories: Record<string, object | string[]>
try {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale
  categories = await import(`./words-${locale}.json`, { with: { type: 'json' }})
} catch (e) {
  categories = await import('./words-en-US.json', { with: { type: 'json' }})
}
console.log(categories)
const words = () => flattenWords(categories)
console.log(words())

console.log(Intl.DateTimeFormat().resolvedOptions().locale)
export { words, categories }
