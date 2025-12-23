import fs from 'node:fs'

function countCharacters(input: string[]) {
  let count = 0
  for (const word of input) {
    const codeLength = word.length
    let memoryLength = 0
    for (let i = 1; i < word.length - 1; i++) {
      if (word[i] === '\\') {
        if (word[i + 1] === 'x') {
          i += 3
        } else {
          i += 1
        }
        memoryLength++
      } else {
        memoryLength++
      }
    }
    count += codeLength - memoryLength
  }
  return count
}

try {
  const input = fs.readFileSync('./inputs/day8.txt', 'utf8')
  const instructions = input.split(/\r?\n/).filter(Boolean)
  console.log(`Total is ${countCharacters(instructions)}`)
} catch (err: unknown) {
  console.error(err)
}
