import { sampleState } from '../src/sampleState'
import { findRepalcement } from '../src/helpers'

;[
  {
    name: 'findRepalcement, testing against first found replacement ',
    input: ['7bd233f7-c0e4-43df-890c-a0dd10621cff', '2015-10-08', sampleState],
    expected: [ '4c323acf-daa3-469a-8620-dc14069011ac',
              '878db4b8-9410-42d4-b759-4cdeb258cdeb' ],
  },
].forEach((td) => {
  const actual = findRepalcement(td.input[0], td.input[1], td.input[2])[0]
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
