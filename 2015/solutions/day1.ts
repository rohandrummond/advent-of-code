import fs from 'node:fs'

function countFloors(input: string): number {
  let up = 0
  let down = 0
  for (let i = 0; i < input.length; i++) {
    input[i] === '(' ? up++ : down++
  }
  return up - down
}

function getTimeToBasement(input: string): number {
  let currentFloor = 0
  let count = 0
  for (let i = 0; i < input.length; i++) {
    input[i] === '(' ? currentFloor++ : currentFloor--
    count += 1
    if (currentFloor < 0) break
  }
  return count
}

try {
  const input = fs.readFileSync('./inputs/day1.txt', 'utf8')

  const floor = countFloors(input)
  console.log(`Santa needs to go to floor ${floor}`)

  const timeToBasement = getTimeToBasement(input)
  console.log(
    `Santa went up and down ${timeToBasement} floors before entering the basement`
  )
} catch (err: unknown) {
  console.error(err)
}
