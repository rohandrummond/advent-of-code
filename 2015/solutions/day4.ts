import fs from 'node:fs'
import crypto from 'node:crypto'

function getLowestHash(input: string) {
  let number = 0
  while (true) {
    const hash = crypto
      .createHash('md5')
      .update(input + number)
      .digest('hex')
    if (hash.startsWith('00000')) {
      return number
    }
    number++
  }
}

try {
  const input = fs.readFileSync('./inputs/day4.txt', 'utf8')

  const lowestHash = getLowestHash(input)
  console.log(`Lowest hash is ${lowestHash}`)
} catch (err: unknown) {
  console.error(err)
}
