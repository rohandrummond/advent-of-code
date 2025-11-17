import fs from 'node:fs'

function getTotalHouses(input: string): number {
  // Track position
  let x = 0
  let y = 0

  // Use set to track unique coordinates
  let visited = new Set<string>()

  // Count first house
  visited.add('0,0')

  for (let i = 0; i < input.length; i++) {
    // Get current coordinates
    switch (input[i]) {
      case '^':
        y++
        break
      case 'v':
        y--
        break
      case '>':
        x++
        break
      case '<':
        x--
        break
    }
    // Add to set
    visited.add(`${x},${y}`)
  }
  return visited.size
}

// --- Part Two ---

// The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa,
// to deliver presents with him.

// Santa and Robo-Santa start at the same location (delivering two presents to the same starting
// house), then take turns moving based on instructions from the elf, who is eggnoggedly reading
// from the same script as the previous year.

// This year, how many houses receive at least one present?

// For example:

// ^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
// ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
// ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.

function getTotalHousesWithRobot(input: string): number {
  // Track position for both
  const positions = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]

  // Create set and count first house
  const visited = new Set<string>()
  visited.add('0,0')

  for (let i = 0; i < input.length; i++) {
    // Check turn and position
    const current = positions[i % 2]
    switch (input[i]) {
      case '^':
        current!.y++
        break
      case 'v':
        current!.y--
        break
      case '>':
        current!.x++
        break
      case '<':
        current!.x--
        break
    }
    // Add co-ordinates to set
    visited.add(`${current!.x},${current!.y}`)
  }

  return visited.size
}

try {
  const input = fs.readFileSync('./inputs/day3.txt', 'utf8')

  const totalHouses = getTotalHouses(input)
  console.log(`Total houses is: ${totalHouses}`)

  const totalHouseWithRobot = getTotalHousesWithRobot(input)
  console.log(`Total houses with Robo-Santa is: ${totalHouseWithRobot}`)
} catch (err: unknown) {
  console.error(err)
}
