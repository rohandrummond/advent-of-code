import fs from 'node:fs'

function storeDistances(
  data: string[]
): Record<string, Record<string, number>> {
  const distances: Record<string, Record<string, number>> = {}

  for (const item of data) {
    const firstSplit = item.split(' to ')
    const secondSplit = firstSplit[1]!.split(' = ')
    const cityOne = firstSplit[0]
    const cityTwo = secondSplit[0]
    const distance = Number(secondSplit[1])

    if (!cityOne || !cityTwo || !distance)
      throw new Error('Error parsing distance data')

    if (!distances[cityOne]) distances[cityOne] = {}
    if (!distances[cityTwo]) distances[cityTwo] = {}
    if (!distances[cityOne][cityTwo]) distances[cityOne][cityTwo] = distance
    if (!distances[cityTwo][cityOne]) distances[cityTwo][cityOne] = distance
  }

  return distances
}

function getPermutations(cities: string[]): string[][] {
  if (cities.length <= 1) {
    return [cities]
  }
  const allPermutations: string[][] = []
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i]!
    const otherCities = cities.slice(0, i).concat(cities.slice(i + 1))
    const permutations = getPermutations(otherCities)
    for (const permutation of permutations) {
      allPermutations.push([city, ...permutation])
    }
  }
  return allPermutations
}

function getRouteDistances(
  distances: Record<string, Record<string, number>>,
  permutations: string[][]
) {
  const routeDistances: Record<string, number> = {}
  for (const permutation of permutations) {
    let distance = 0
    for (let i = 0; i < permutation.length - 1; i++) {
      const start = permutation[i]!
      const end = permutation[i + 1]!
      distance += distances[start]![end]!
    }
    routeDistances[permutation.join(' -> ')] = distance
  }
  return routeDistances
}

function getShortestRoute(routeDistances: Record<string, number>) {
  return Math.min(...Object.values(routeDistances))
}

function calculateShortestRoute(data: string[]) {
  const distances = storeDistances(data)
  const cities = Object.keys(distances)
  const permutations = getPermutations(cities)
  const routeDistances = getRouteDistances(distances, permutations)
  return getShortestRoute(routeDistances)
}

try {
  const input = fs.readFileSync('./inputs/day9.txt', 'utf8')
  const data = input.split(/\r?\n/).filter(Boolean)
  const shortestRoute = calculateShortestRoute(data)
  console.log(`Shortest route is ${shortestRoute}`)
} catch (err: unknown) {
  console.error(err)
}
