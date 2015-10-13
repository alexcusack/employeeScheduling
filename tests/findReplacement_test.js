import { sampleState } from '../src/sampleState'
import { findUnavailableReplacements } from '../src/helpers'

export const findRepalcement = (userID, date) => {
  const unavailabilities = findUnavailableReplacements(date)
  for (let assignment in sampleState.assignments) {
    const thisAssignment = sampleState.assignments[assignment]
    if (new Date(thisAssignment.date) > new Date(date)) {
      if (!unavailabilities[thisAssignment.user] && userID !== thisAssignment.user) { return [assignment, thisAssignment.user] }
    }
  }
}

;[
  {
    name: 'findRepalcement, standard input',
    input: ['7bd233f7-c0e4-43df-890c-a0dd10621cff', '2015-10-08'],
    expected: [ 'e5426cbb-869d-4cb2-a0d1-b740f7ca87b1',
              '0682d780-a91c-40a3-8af6-77daceb49c36' ],
  },
].forEach((td) => {
  const actual = findRepalcement(td.input[0], td.input[1])
  const pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass) {
    console.log('passed:', td.name)
  } else {
    console.log('failed:', td.name)
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})
