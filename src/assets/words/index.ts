import { flattenWords } from '@/utils/flattenWords'
let categories: Record<string, object | string[]>
// const languages = import.meta.glob('./words-*.json')
const locale = Intl.DateTimeFormat().resolvedOptions().locale

try {
  categories = (await import(`./words-${locale}.json`)).default
} catch (e) {
  categories = (await import('./words-en-US.json')).default
}

categories = categories.default as Record<string, object | string[]>
const words = flattenWords(categories)

export { words, categories }
