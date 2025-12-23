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

function reverseCountCharacters(input: string[]) {
  let count = 0
  for (const word of input) {
    const originalLength = word.length
    let encodedLength = 2
    for (let i = 0; i < word.length; i++) {
      if (word[i] === '\\' || word[i] === '"') {
        encodedLength += 2
      } else {
        encodedLength += 1
      }
    }
    count += encodedLength - originalLength
  }
  return count
}

try {
  const input = fs.readFileSync('./inputs/day8.txt', 'utf8')
  const instructions = input.split(/\r?\n/).filter(Boolean)
  console.log(`Total is ${countCharacters(instructions)}`)
  console.log(
    `Total encoded characters is ${reverseCountCharacters(instructions)}`
  )
} catch (err: unknown) {
  console.error(err)
}
