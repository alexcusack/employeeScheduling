import * as redux from 'redux'
import { loadNamesWithStartDate } from './actions'
import { addUser, removeUser, readSeedNames, createUnvailability } from './reducers'
import { loadSeedFacts, mapIdToName, UserAlreadyExist, lookUpUserIDByName } from './helpers'

const initialState = { dates: {}, users: {}, assignmentList: [] }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_SEED_NAMES') { return readSeedNames(action.names, action.startDate, state) }
  return state
}

const store = redux.createStore(dispatch)
// store.dispatch(loadNamesWithStartDate('2015-10-16'))

// console.log(removeUser(store.getState(), 'Sherry'))
// console.log(createUnvailability(store.getState(), 'Jack', 'Wed Oct 28 2015 17:00:00 GMT-0700 (PDT)'))

;[
  {
    name: 'add new user: empty name value',
    input: [initialState, ''],
    expected: 0, // expected state.users.keys.length
  },
  { // how to test when uuid are involved?
    name: 'add new user: empty name value',
    input: [initialState, 'alex'],
    expected: 1,
  },
  {
    name: 'add an already exiting user',
    input: [initialState, 'alex'],
    expected: 1,
  },
].forEach((td) => {
  const actual = Object.keys(addUser(td.input[0], td.input[1]).users).length
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

const localState = addUser(initialState, 'alex')
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
    console.log(mapIdToName)
    console.log('failed:', td.name)
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})
