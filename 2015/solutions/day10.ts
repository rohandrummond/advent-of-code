import fs from 'node:fs'

function lookAndSay(input: string) {
  let count = 0
  let char = ''
  let result = ''
  for (let i = 0; i < input.length; i++) {
    const current = input[i]
    if (!current) throw new Error('Unable to parse current character')
    if (i === 0) {
      char = current
      count++
      continue
    }
    if (current === char) {
      count++
      continue
    }
    if (current !== char) {
      result = result + count + char
      count = 1
      char = current
    }
  }
  result = result + count + char
  return result
}

try {
  const input = fs.readFileSync('./inputs/day10.txt', 'utf8').trim()
  let result = input
  for (let i = 0; i < 50; i++) {
    result = lookAndSay(result)
  }
  console.log('Final length:', result.length)
} catch (err: unknown) {
  console.error(err)
}
