import fs from 'node:fs'

// Convert source to number or string
function parse(source: string): string | number {
  return /^\d+$/.test(source) ? Number(source) : source
}

// Resolve source based on whether it is a number, has a signal, or is null
function resolveSource(
  source: string | number,
  circuit: Record<string, number | null>
): number | null {
  if (typeof source === 'number') return source
  return circuit[source] ?? null
}

function connectCircuit(input: string[], overrideB?: number): number {
  // Create record to track gates and their signals
  let circuit: Record<string, number | null> = {}

  // Initialise all destination wires to null in circuit
  for (const instruction of input) {
    const destination = instruction.split(' -> ')[1]
    if (destination) {
      circuit[destination] = null
    }
  }

  // Override value of wire b if provided
  if (overrideB !== undefined) {
    circuit['b'] = overrideB
  }

  // Track whether circuit has changed (for terminating loop)
  let changed = true

  while (changed) {
    changed = false

    for (const instruction of input) {
      // Split string by ' -> '
      const split = instruction.split(' -> ')

      // Confirm destination
      const destination = split[1]
      if (!destination) {
        throw new Error('destination is undefined')
      }

      // Continue loop if wire already has a value
      if (circuit[destination] != null) {
        continue
      }

      // Confirm source instructions
      if (split[0] === undefined) {
        throw new Error('split[0] is undefined')
      }

      let sourceInfo = split[0]
      let sources: (string | number)[] = []
      let operation = ''

      if (sourceInfo.includes('AND')) {
        operation = 'AND'
        sources.push(...sourceInfo.split(' AND ').map((i) => parse(i)))
      } else if (sourceInfo.includes('NOT')) {
        operation = 'NOT'
        sources.push(parse(sourceInfo.replace('NOT ', '')))
      } else if (sourceInfo.includes('OR')) {
        operation = 'OR'
        sources.push(...sourceInfo.split(' OR ').map((i) => parse(i)))
      } else if (sourceInfo.includes('LSHIFT')) {
        operation = 'LSHIFT'
        sources.push(...sourceInfo.split(' LSHIFT ').map((i) => parse(i)))
      } else if (sourceInfo.includes('RSHIFT')) {
        operation = 'RSHIFT'
        sources.push(...sourceInfo.split(' RSHIFT ').map((i) => parse(i)))
      } else {
        operation = 'STANDARD'
        sources.push(parse(sourceInfo))
      }

      // Perform bitwise operations for single sources
      if (sources.length === 1 && sources[0] != undefined) {
        const source = resolveSource(sources[0], circuit)
        if (source != null) {
          let result: number | null = null
          switch (operation) {
            case 'STANDARD':
              result = source & 0xffff
              break
            case 'NOT':
              result = ~source & 0xffff
              break
          }
          if (result != null) {
            // Update circuit and mark change
            circuit[destination] = result
            changed = true
          }
        }
      }

      // Perform bitwise operations for multiple sources
      if (
        sources.length > 1 &&
        sources[0] != undefined &&
        sources[1] != undefined
      ) {
        const firstSource = resolveSource(sources[0], circuit)
        const secondSource = resolveSource(sources[1], circuit)
        if (firstSource != null && secondSource != null) {
          let result: number | null = null
          switch (operation) {
            case 'AND':
              result = firstSource & secondSource & 0xffff
              break
            case 'OR':
              result = (firstSource | secondSource) & 0xffff
              break
            case 'LSHIFT':
              result = (firstSource << secondSource) & 0xffff
              break
            case 'RSHIFT':
              result = (firstSource >> secondSource) & 0xffff
              break
          }
          if (result != null) {
            // Update circuit and mark change
            circuit[destination] = result
            changed = true
          }
        }
      }
    }
  }

  if (circuit['a'] === null || circuit['a'] === undefined) {
    throw new Error("circuit['a'] is null or undefined")
  }

  return circuit['a']
}

try {
  const input = fs.readFileSync('./inputs/day7.txt', 'utf8')
  const instructions = input.split(/\r?\n/).filter(Boolean)

  let signalA = connectCircuit(instructions)
  console.log(`a is currently ${signalA}`)

  let updatedSignalA = connectCircuit(instructions, signalA!)
  console.log(`a is ${updatedSignalA} after override`)
} catch (err: unknown) {
  console.error(err)
}
