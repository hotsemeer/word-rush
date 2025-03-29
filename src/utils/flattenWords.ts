export function flattenWords(categories: Record<string, object | string[] | object>): string[] {
  const words: string[] = []

  function traverse(category: Record<string, object | string[]>) {
    for (const key in category) {
      if (Array.isArray(category[key])) {
        words.push(...category[key])
      } else if (typeof category[key] === "object" && category[key] !== null) {
        traverse(category[key] as Record<string, object | string[]>)
      }
    }
  }

  traverse(categories)
  return words
}
