import fs from 'node:fs'

function getNiceWords(input: string[]): number {
  let count = 0

  // Loop through words
  for (const word of input) {
    let vowels = ['a', 'e', 'i', 'o', 'u']
    let vowelsCount = 0

    let hasDouble = false

    let forbidden = ['ab', 'cd', 'pq', 'xy']
    let hasForbidden = false

    // Scan chars in each word
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i)

      // Check for double and forbidden char combos
      if (i < word.length - 1) {
        const nextChar = word.charAt(i + 1)
        if (forbidden.includes(char + nextChar)) hasForbidden = true
        if (char === nextChar) hasDouble = true
      }

      // Check for vowel
      if (vowels.includes(char)) {
        vowelsCount++
      }

      // Run checks at last char (don't need to worry about resetting vars)
      if (i === word.length - 1) {
        if (vowelsCount >= 3 && hasDouble && !hasForbidden) count++
      }
    }
  }

  return count
}

function getReallyNiceWords(input: string[]): number {
  let count = 0

  // Loop through words
  for (const word of input) {
    let hasRepeatingLetter = false
    let hasRepeatingPair = false

    // Scan chars in each word
    for (let i = 0; i < word.length; i++) {
      if (i < word.length - 2) {
        // Check for repeating letter
        if (word.charAt(i) === word.charAt(i + 2)) hasRepeatingLetter = true

        // Check for repeating pair
        const pair = word.charAt(i) + word.charAt(i + 1)
        const remainingWord = word.slice(i + 2)
        if (remainingWord.includes(pair)) hasRepeatingPair = true
      }
      // Evaluate at end of word
      if (i === word.length - 1) {
        if (hasRepeatingLetter && hasRepeatingPair) count++
      }
    }
  }
  return count
}

try {
  const input = fs.readFileSync('./inputs/day5.txt', 'utf8')
  const words = input.split(/\r?\n/).filter(Boolean)
  const niceWords = getNiceWords(words)
  console.log(`Nice words: ${niceWords}`)
  const reallyNiceWords = getReallyNiceWords(words)
  console.log(`Really nice words: ${reallyNiceWords}`)
} catch (err: unknown) {
  console.error(err)
}
