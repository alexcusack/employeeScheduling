import { pullFromServer, pushToServer } from '../src/server_calls'
import fetch from 'node-fetch'
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

const facts = [
      ['assert', '3791D856-DBB2-4715-9CDB-9098286476C9', 'unavailability/user', 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' ],
      ['assert', '3791D856-DBB2-4715-9CDB-9098286476C9', 'unavailability/date', '2015-10-09' ]]

// export const pushToServer = (facts) => {
//   const timestamp = new Date()
//   const postBody = { timestamp: timestamp.toISOString(), facts: facts }

//   fetch('http://localhost:3000/journal',
//     {
//       method: 'POST',
//       headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//       body: JSON.stringify(postBody),
//     })
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response)
//     })

  // fetch('http://localhost:3000/journal',
  //   {
  //     method: 'POST',
  //     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  //     body: postBody,
  //   })
  //   .then((response) => response.json())
  //   .then((response) => {
  //     console.log(response)
  //     // if (/* log out of sync */ response.status === 406) { readJournal(response) /* retry last action */ }
  //     // if (/* successful appended facts */ response.status === 200) { return store.dispatch(updateState(facts)) }
  //   })
// }



pushToServer(facts)