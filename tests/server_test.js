// import { pullFromServer, pushToServer } from '../server_calls'

// // pullFromServer('2015-10-08 00:06:00 UTC')
// // pullFromServer()
// // pullFromServer('2015-10-08 00:05:00 UTC')

// ;[
//   { // best practice for handleing bad inputs? which component should gaurd?
//     name: 'createUnavailability, standard input',
//     input: ['f777f1a0-b861-49c3-b4fb-b0d745f0dd7a', 'ffa7a825-752d-4d3e-904c-2e3527b58851', '2015-10-09'],
//     expected: {
//       type: 'CREATE_UNAVAILABILITY',
//       userID: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a',
//       assignmentID: 'ffa7a825-752d-4d3e-904c-2e3527b58851',
//       date: '2015-10-09',
//     },
//   },
// ].forEach((td) => {
//   const actual = createUnavailability(td.input[0], td.input[1], td.input[2])
//   const pass = JSON.stringify(actual) === JSON.stringify(td.expected)
//   if (pass) {
//     console.log('passed:', td.name)
//   } else {
//     console.log('failed:', td.name)
//     console.log('actual:', actual)
//     console.log('expected:', td.expected)
//     process.exit()
//   }
// })