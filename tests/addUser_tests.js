import { addUser } from '../reducers'
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

console.log(getDaysOfMonth(10, 2015) === 31)
console.log(getDaysOfMonth(2, 2015) === 28)
console.log(getDaysOfMonth(2, 2016) === 29)
// const initialState = { dates: {}, users: {}, assignmentList: [] }


// ;[
//   {
//     name: 'add new user: empty name value',
//     input: [initialState, ''],
//     expected: 0, // expected state.users.keys.length
//   },
//   { // how to test when uuid are involved?
//     name: 'add new user: empty name value',
//     input: [initialState, 'alex'],
//     expected: 1,
//   },
//   {
//     name: 'add an already exiting user',
//     input: [initialState, 'alex'],
//     expected: 1,
//   },
// ].forEach((td) => {
//   const actual = Object.keys(addUser(td.input[0], td.input[1]).users).length
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