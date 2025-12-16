// This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates!
// Unfortunately, little Bobby is a little under the recommended age range, and he needs
// help assembling the circuit.

// Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal
// (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire,
// or some specific value. Each wire can only get a signal from one source, but can provide
// its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.

// The included instructions booklet describes how to connect the parts together: x AND y -> z means
// to connect wires x and y to an AND gate, and then connect its output to wire z.

// For example:

// 123 -> x means that the signal 123 is provided to wire x.
// x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
// p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
// NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.
// Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd
// like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python)
// provide operators for these gates.

import fs from 'node:fs'

// Helper function that either resolves with number or null if not ready (also adds source to circuit)
function resolveSource(
  source: string | number,
  circuit: Record<string, number | null>
): number | null {
  if (typeof source === 'number') return source
  if (circuit[source] != null) return circuit[source]
  circuit[source] = null
  return null
}

function connectCircuit(input: string[]) {
  console.log('Connect circuit is running with the below input:')
  console.log(input)

  // Create record to track gates and their signals
  let circuit: Record<string, number | null> = {}

  let looping = true
  let pointer = 0

  while (looping) {
    // Get instruction
    const instruction = input[pointer]
    if (!instruction) {
      throw new Error('instruction is undefined')
    }

    // Split string by ' -> '
    const split = instruction.split(' -> ')

    // Confirm destination
    const destination = split[1]
    if (!destination) {
      throw new Error('destination is undefined')
    }

    // Confirm source(s)
    if (split[0] === undefined) {
      throw new Error('split[0] is undefined')
    }

    let sourceInfo = split[0]
    let sources: string[] = []
    let operation = ''

    if (sourceInfo.includes('AND')) {
      operation = 'AND'
      sources.push(...sourceInfo.split(' AND '))
    } else if (sourceInfo.includes('NOT')) {
      operation = 'NOT'
      sources.push(sourceInfo.replace('NOT ', ''))
    } else if (sourceInfo.includes('OR')) {
      operation = 'OR'
      sources.push(...sourceInfo.split(' OR '))
    } else if (sourceInfo.includes('LSHIFT')) {
      operation = 'LSHIFT'
      sources.push(...sourceInfo.split(' LSHIFT '))
    } else if (sourceInfo.includes('RSHIFT')) {
      operation = 'RSHIFT'
      sources.push(...sourceInfo.split(' RSHIFT '))
    } else {
      operation = 'STANDARD'
      sources.push(sourceInfo)
    }

    console.log(`instruction is ${instruction}`)
    console.log(`destination is ${destination}`)
    console.log(`operation is ${operation}`)
    console.log(`sources are ${sources}`)

    // Check if there is only 1 source

    // Check if is is a number, then we can perform bitwise operation
    // If it's not a number, check whether it has a value, then we can perform bitwise operation
    // If it doesn't have a value, we need to store it in the circuit with a value of null

    // Check if there are multiple sources

    // Check whether both sources are numbers, then we can perform bitwise operation
    // Check whether both have values, then we can perform bitwise operation
    // If either of them don't have a value, we need to add to circuit with null

    // Check if circuit has changed since start of this loop iteration

    if (pointer === input.length - 1) {
      console.log(`input.length is ${input.length}`)
      console.log('Loop has finished first iteration, resetting pointer to 0')
      pointer = 0
      looping = false
    }
    pointer++
  }
}

try {
  const input = fs.readFileSync('./inputs/day7example.txt', 'utf8')
  const instructions = input.split(/\r?\n/).filter(Boolean)
  connectCircuit(instructions)
} catch (err: unknown) {
  console.error(err)
}
