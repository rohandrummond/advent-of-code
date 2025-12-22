import fs from 'node:fs'

try {
  const input = fs.readFileSync('./inputs/day8example.txt', 'utf8')
  const instructions = input.split(/\r?\n/).filter(Boolean)
  console.log(instructions)
} catch (err: unknown) {
  console.error(err)
}
