import fs from 'node:fs'

function calculateWrappingPaper(presents: string[]): number {
  return presents.reduce((acc, present) => {
    const [l, w, h] = present.split('x').map(Number)

    if (!l || !w || !h)
      throw new Error('Unable to deserialise present dimensions')

    const sides = [l * w, w * h, l * h]
    const surfaceArea = sides.reduce((sum, side) => sum + 2 * side, 0)
    const slack = Math.min(...sides)

    return acc + surfaceArea + slack
  }, 0)
}

function calculateRibbon(presents: string[]): number {
  return presents.reduce((acc, present) => {
    const dimensions = present.split('x').map(Number)
    const sorted = dimensions.sort((a, b) => a - b)
    if (!sorted[0] || !sorted[1] || !sorted[2])
      throw new Error('Unable to deserialise present dimensions')

    const smallestPerimeter = sorted[0] * 2 + sorted[1] * 2
    const cubicFeet = sorted[0] * sorted[1] * sorted[2]

    return acc + smallestPerimeter + cubicFeet
  }, 0)
}

try {
  const input = fs.readFileSync('./inputs/day2.txt', 'utf8')
  const presents = input.split(/\r?\n/).filter(Boolean)

  const wrappingPaper = calculateWrappingPaper(presents)
  console.log(`Wrapping paper needed: ${wrappingPaper} square feet`)

  const ribbon = calculateRibbon(presents)
  console.log(`Ribbon needed: ${ribbon} feet`)
} catch (err) {
  console.error(err)
}
