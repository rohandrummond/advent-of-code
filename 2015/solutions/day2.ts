import fs from 'node:fs'

try {
  const input = fs.readFileSync('./inputs/day2.txt', 'utf8')
  const presents = input.split(/\r?\n/).filter(Boolean)

  const wrappingPaper = presents.reduce((total, present) => {
    const [l, w, h] = present.split('x').map(Number)

    if (!l || !w || !h)
      throw new Error('Unable to deserialise present dimensions')

    const sides = [l * w, w * h, l * h]
    const surfaceArea = sides.reduce((sum, side) => sum + 2 * side, 0)
    const slack = Math.min(...sides)

    return total + surfaceArea + slack
  }, 0)

  console.log(wrappingPaper)
} catch (err) {
  console.error(err)
}
