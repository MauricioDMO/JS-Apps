'use strict'

export function formatJson (json) {
  return {
    next: Boolean(json.next),
    count: json.count,
    results: json.results.map(result => {
      const keys = Object.getOwnPropertyNames(result)
      const prevResult = { ...result }

      // Remove non util results
      for (const key of keys) {
        prevResult[key] = ['n/a', 'unknown'].includes(prevResult[key]) ||
          Array.isArray(prevResult[key]) ||
          `${prevResult[key]}`.startsWith('https://')
          ? null
          : prevResult[key]

        if (key === 'title') {
          prevResult.name = prevResult[key]
          delete prevResult.title
        }
      }

      // Filter null values
      const currentResult = Object.fromEntries(
        Object.entries(prevResult)
          .filter((entry) => entry[1])
          .sort((a, b) => a[0].localeCompare(b[0]))
      )

      return currentResult
    }).filter(result => result.name)
  }
}
