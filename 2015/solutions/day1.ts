import fs from 'node:fs'

function countFloors(input: string): number {
  let floor = 0
  for (let i = 0; i < input.length; i++) {
    input[i] === '(' ? floor++ : floor--
  }
  return floor
}

function getPositionEnteringBasement(input: string): number {
  let floor = 0
  for (let i = 0; i < input.length; i++) {
    input[i] === '(' ? floor++ : floor--
    if (floor < 0) return i + 1
  }
  return floor
}

try {
  const input = fs.readFileSync('./inputs/day1.txt', 'utf8')

  const floor = countFloors(input)
  console.log(`countFloors result = ${floor}`)

  const timeToBasement = getPositionEnteringBasement(input)
  console.log(`getPositionEnteringBasement result = ${timeToBasement}`)
} catch (err: unknown) {
  console.error(err)
}
