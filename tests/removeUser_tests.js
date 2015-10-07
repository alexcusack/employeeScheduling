import { addUser, removeUser } from './reducers'

const initialState = { dates: {}, users: {}, assignmentList: [] }
let localState = addUser(initialState, 'alex')

;[
  {
    name: 'remove user user: empty name value',
    input: [localState, ''],
    expected: 1, // expected state.users.keys.length
  },
  {
    name: 'remove non existent user',
    input: [localState, ''],
    expected: 1, // expected state.users.keys.length
  },
  {
    name: 'remove user',
    input: [localState, 'alex'],
    expected: 0, // expected state.users.keys.length
  },
].forEach((td) => {
  const actual = Object.keys(removeUser(td.input[0], td.input[1]).users).length
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
