import fs from 'node:fs'

function createGrid(size: number): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(0))
}

function turnOn(grid: number[][], row: number, col: number) {
  if (grid[row] && grid[row][col] !== undefined) {
    grid[row][col] = 1
  }
}

function turnOff(grid: number[][], row: number, col: number) {
  if (grid[row] && grid[row][col] !== undefined) {
    grid[row][col] = 0
  }
}

function toggle(grid: number[][], row: number, col: number) {
  if (grid[row] && grid[row][col] !== undefined) {
    grid[row][col] === 0 ? (grid[row][col] = 1) : (grid[row][col] = 0)
  }
}

function countLitLights(grid: number[][]) {
  return grid.flat().reduce((acc, c) => acc + c, 0)
}

function configureLights(grid: number[][], instructions: string[]) {
  // Loop through instructions
  for (let i = 0; i < instructions.length; i++) {
    let action = ''
    let start: number[] = []
    let end: number[] = []

    const instruction = instructions[i]

    // Split word by 'through '
    let parts = instruction?.split(' through ')

    // Use comma to split numbers
    if (parts && parts[1]) {
      end = parts[1].split(',').map((n) => Number(n))
    }

    // See what first half starts with e.g. turn on, turn off
    if (parts && parts[0]) {
      if (parts[0].startsWith('turn on')) {
        action = 'turn on'
        start = parts[0]
          .replace('turn on ', '')
          .split(',')
          .map((n) => Number(n))
      } else if (parts[0].startsWith('turn off')) {
        action = 'turn off'
        start = parts[0]
          .replace('turn off ', '')
          .split(',')
          .map((n) => Number(n))
      } else {
        action = 'toggle'
        start = parts[0]
          .replace('toggle ', '')
          .split(',')
          .map((n) => Number(n))
      }
    }

    // Check coordinates
    if (!start[0] || !start[1] || !end[0] || !end[1]) return

    // Loop through rows
    for (let row = start[0]; row <= end[0]; row++) {
      // Loop through columns
      for (let col = start[1]; col <= end[1]; col++) {
        // Update position
        if (action === 'turn on') {
          turnOn(grid, row, col)
        } else if (action === 'turn off') {
          turnOff(grid, row, col)
        } else {
          toggle(grid, row, col)
        }
      }
    }
  }
}

try {
  // Read input
  const input = fs.readFileSync('./inputs/day6.txt', 'utf8')
  const instructions = input.split(/\r?\n/).filter(Boolean)

  // Create grid
  let grid = createGrid(1000)

  // Call configureLights
  configureLights(grid, instructions)

  // Call countLitLights
  let count = countLitLights(grid)

  console.log(`Number of lit lights: ${count}`)
} catch (err: unknown) {
  console.error(err)
}
