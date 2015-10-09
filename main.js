import ReactDOM from 'react-dom'
import Promise from 'bluebird'
global.Promise = Promise
import fetch from 'node-fetch'
import React from 'react'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import { CalendarMonth } from './components'
import { updateState } from './actions'
import { readJournal, addUser, removeUser, createUnvailability } from './reducers'
import { sendToServer } from './server_calls'
import { generateUnavailabilityFacts } from './helpers'

const initialState = { users: {}, assignments: {}, unavailabilities: {} }

const dispatch = (state = initialState, action) => {
  if (action.type === 'UPDATE_STATE') { return readJournal(action.journalEntries, state) }
  if (action.type === 'CREATE_UNAVAILABILITY') { return generateUnavailabilityFacts(action.name, action.date) }
  if (action.type === 'SEND_FACT_TO_SERVER') { return sendToServer(action.facts, action.originatingAction) }
  // if (action.type === "foo") { return Object.assign({}, state, { foo: "foo" }) }
  // if (action.type === 'CREATE_NEW_USER') { return addUser(state, action.name) }
  // if (action.type === 'REMOVE_USER') { return removeUser(state, action.name) }
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
    store.dispatch(updateState(journalEntries))
  })

React.render(
  <Provider store={ store }>{() => <Controller/>}</Provider>,
  document.querySelector('main')
)
