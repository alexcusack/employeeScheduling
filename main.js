import * as redux from 'redux'
import { loadJournalEntries, createUser } from './actions'
import { readSeedNames, addUser, removeUser, createUnvailability } from './reducers'

const initialState = { dates: {}, users: {}, assignmentList: [] }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_JOURNAL_ENTRIES') { return readJournalLog(action.journalEntries, state) }
  if (action.type === 'CREATE_NEW_USER') { return addUser(state, action.name) }
  if (action.type === 'REMOVE_USER') { return removeUser(state, action.name) }
  if (action.type === 'CREATE_UNAVAILABILITY') { return createUnvailability(state, name, date) }
  return state
}

const store = redux.createStore(dispatch)

// store.dispatch(loadJournalEntries('2015-10-16'))
store.dispatch(loadJournalEntries())

console.log(store.getState())


