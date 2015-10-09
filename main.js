// import ReactDOM from 'react-dom'
import Promise from 'bluebird'
global.Promise = Promise
import fetch from 'node-fetch'
import React from 'react'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import { CalendarMonth } from './components'
import { loadJournalEntries } from './actions'
import { readJournalLog, addUser, removeUser, createUnvailability } from './reducers'

const initialState = { users: {}, assignments: {}, unavailabilities: {} }

const dispatch = (state = initialState, action) => {
  if (action.type === "foo") { return Object.assign({}, state, { foo: "foo" }) }
  if (action.type === 'LOAD_JOURNAL_ENTRIES') { return readJournalLog(action.journalEntries, state) }
  if (action.type === 'CREATE_NEW_USER') { return addUser(state, action.name) }
  if (action.type === 'REMOVE_USER') { return removeUser(state, action.name) }
  if (action.type === 'CREATE_UNAVAILABILITY') { return createUnvailability(state, name, date) }
  return state
}

const store = redux.createStore(dispatch)
global.store = store

const Controller = connect(
  (state) => {
  // maps state to props
    return state
  },
  () => ({
  // maps props to action dispatchers
    addUser: addUser,
    removeUser: removeUser,
  })
)(CalendarMonth)

fetch('http://localhost:3000/journal')
  .then(function (res) {
    return res.json()
  }).then(function (journalEntries) {
    store.dispatch(loadJournalEntries(journalEntries))
    console.log(store.getState())
  })

React.render(
  <Provider store={ store }>{ () => <Controller/> }</Provider>,
  document.querySelector('main')
)
