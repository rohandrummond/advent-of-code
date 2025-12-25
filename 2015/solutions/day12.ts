import fs from 'node:fs'

function sumNumbers(data: any): number {
  // Base case
  if (typeof data === 'number') {
    return data
  }

  // If it's an array, sum all elements
  if (Array.isArray(data)) {
    return data.reduce((sum, item) => sum + sumNumbers(item), 0)
  }

  // If it's an object
  if (typeof data === 'object' && data !== null) {
    // Check for value "red"
    const values = Object.values(data)
    if (values.includes('red')) {
      // Return 0 and ignore all
      return 0
    }

    // Otherwise sum all values in the object
    return values.reduce((sum: number, value) => sum + sumNumbers(value), 0)
  }

  // For strings or other types return 0
  return 0
}

try {
  const input = fs.readFileSync('./inputs/day12.txt', 'utf8').trim()
  const json = JSON.parse(input)
  const sum = sumNumbers(json)
  console.log(sum)
} catch (err: unknown) {
  console.error(err)
}
