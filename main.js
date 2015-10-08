import Promise from 'bluebird'
global.Promise = Promise
import fetch from 'node-fetch'
import * as redux from 'redux'
import { loadJournalEntries, createUser } from './actions'
import { readJournalLog, addUser, removeUser, createUnvailability } from './reducers'

const initialState = { users: {}, assignments: {}, unavailabilities: {} }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_JOURNAL_ENTRIES') { return readJournalLog(action.journalEntries, state) }
  if (action.type === 'CREATE_NEW_USER') { return addUser(state, action.name) }
  if (action.type === 'REMOVE_USER') { return removeUser(state, action.name) }
  if (action.type === 'CREATE_UNAVAILABILITY') { return createUnvailability(state, name, date) }
  return state
}

const store = redux.createStore(dispatch)

// store.dispatch(loadJournalEntries('2015-10-16'))
// store.dispatch(loadJournalEntries())


fetch('http://localhost:3000/journal')
  .then(function (res) {
    return res.json()
  }).then(function (journalEntries) {
    store.dispatch(loadJournalEntries(journalEntries))
    console.log(store.getState())
})
