import fs from 'node:fs'

function countNumbers(json: string) {
  let count = 0
  let i = 0
  while (i < json.length) {
    const char = json[i]
    let isNegative = false

    // Check for negative
    if (char === '-' && i + 1 < json.length && !isNaN(Number(json[i + 1]))) {
      isNegative = true
      i++
    }

    // Check for number
    if (!isNaN(Number(json[i])) && json[i] !== ' ') {
      // Build string
      let numStr = ''
      while (i < json.length && !isNaN(Number(json[i])) && json[i] !== ' ') {
        numStr += json[i]
        i++
      }

      // Convert to number
      const num = Number(numStr)

      // Add to count
      count += isNegative ? -num : num
    } else {
      i++
    }
  }

  return count
}

try {
  const input = fs.readFileSync('./inputs/day12.txt', 'utf8').trim()
  const sum = countNumbers(input)
  console.log(sum)
} catch (err: unknown) {
  console.error(err)
}
