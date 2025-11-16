import fs from 'node:fs'

function getTotalHouses(input: string): number {
  // Track coordinates
  let x = 0
  let y = 0

  // Initialise matrix
  let matrix: number[][] = []

  // Total count
  let total = 0

  // Count first house
  matrix[x] = []
  matrix[x][y] = 1
  total++

  for (let i = 0; i < input.length; i++) {
    // Track current coordinates
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

    // Create row if needed
    if (!matrix[x]) {
      matrix[x] = []
    }

    if (matrix[x]![y] != undefined) {
      matrix[x]![y]!++
    } else {
      matrix[x]![y] = 1
      total++
    }
  }

  // Return total
  return total
}

try {
  const input = fs.readFileSync('./inputs/day3.txt', 'utf8')

  const totalHouses = getTotalHouses(input)
  console.log(`Total houses is: ${totalHouses}`)
} catch (err: unknown) {
  console.error(err)
}
