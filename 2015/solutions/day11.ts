import fs from 'node:fs'

function replaceChar(password: string, index: number, char: string) {
  return password.substring(0, index) + char + password.substring(index + 1)
}

function checkRequirements(password: string) {
  // Check for i, o or l
  if (
    password.includes('i') ||
    password.includes('o') ||
    password.includes('l')
  ) {
    return false
  }

  // Check for increasing letters
  let hasStraight = false
  for (let i = 0; i < password.length - 2; i++) {
    const code1 = password.charCodeAt(i)
    const code2 = password.charCodeAt(i + 1)
    const code3 = password.charCodeAt(i + 2)
    if (code2 === code1 + 1 && code3 === code2 + 1) {
      hasStraight = true
      break
    }
  }
  if (!hasStraight) return false

  // Check for repeating pairs
  const pairs = new Set<string>()
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      pairs.add(password[i]!)
      i++
    }
  }
  if (pairs.size < 2) return false

  return true
}

function incrementPassword(password: string) {
  for (let i = password.length - 1; i >= 0; i--) {
    const code = password.charCodeAt(i)
    if (code === 122) {
      password = replaceChar(password, i, 'a')
      if (i === 0) {
        throw new Error()
      }
      continue
    }
    password = replaceChar(password, i, String.fromCharCode(code + 1))
    break
  }
  return password
}

function findNextPassword(current: string): string {
  let password = incrementPassword(current)
  while (!checkRequirements(password)) {
    password = incrementPassword(password)
  }
  return password
}

try {
  const input = fs.readFileSync('./inputs/day11.txt', 'utf8').trim()
  const result = findNextPassword(input)
  const nextResult = findNextPassword(result)
  console.log(`Next valid password is: ${nextResult}`)
} catch (err: unknown) {
  console.error(err)
}
