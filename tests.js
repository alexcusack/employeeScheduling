import * as redux from 'redux'
import { loadNamesWithStartDate } from './actions'
import { addUser, removeUser, readSeedNames } from './reducers'

const initialState = { dates: {}, users: {}, assignmentList: [] }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_SEED_NAMES') { return readSeedNames(action.names, action.startDate, state) }
  return state
}

const store = redux.createStore(dispatch)
// store.dispatch(loadNamesWithStartDate('2015-10-16'))

console.log(addUser(store.getState(), 'alex'))
console.log(addUser(store.getState(), 'Sherry'))
console.log(removeUser(store.getState(), 'Sherry'))
