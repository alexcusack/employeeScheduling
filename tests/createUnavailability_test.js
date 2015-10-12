import { createUnavailablity } from '../actions'

const actual = createUnavailablity('D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0', '2015-10-09')

;[
  // { // best place to handle malformed inputs?
  //   name: 'createUnavailablity, empty input',
  //   input: ['', ''],
  //   expected: null,
  // },
  {
    name: 'createUnavailablity, standard input',
    input: ['D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0', '2015-10-09'],
    expected: { type: 'CREATE_UNAVAILABILITY',
              userID: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0',
                date: '2015-10-09' },
  },
].forEach((td) => {
  const actual = createUnavailablity(td.input[0], td.input[1])
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
