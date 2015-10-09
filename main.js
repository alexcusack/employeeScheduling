import ReactDOM from 'react-dom'
import Promise from 'bluebird'
global.Promise = Promise
import fetch from 'node-fetch'
import React from 'react'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import { CalendarMonth } from './components'
import { fetchFromServer } from './actions'
import { readJournal } from './reducers'
import { pushToServer, pullFromServer } from './server_calls'
import { generateUnavailabilityFacts, generateRemoveUnavailabilityFacts, generateAssignmentSwapFacts } from './helpers'

const initialState = { users: {}, assignments: {}, unavailabilities: {} }

const dispatch = (state = initialState, action) => {
  if (action.type === 'UPDATE_STATE') { return readJournal(action.journalEntries, state) }
  if (action.type === 'CREATE_UNAVAILABILITY') { generateUnavailabilityFacts(action.userID, action.date) }
  if (action.type === 'REMOVE_UNAVAILABILITY') { generateRemoveUnavailabilityFacts(action.unavailabilityID) }
  if (action.type === 'SEND_FACT_TO_SERVER') { pushToServer(action.facts, action.originatingAction) }
  if (action.type === 'SWAP_ASSIGNMENT') { generateAssignmentSwapFacts(action.assignmentA, action.assignmentB, action.userA, action.userB) }
  if (action.type === 'FETCH_FROM_SERVER') { pullFromServer() }
  // create swap event
  return state
}

export const store = redux.createStore(dispatch)
// global.store = store

const Controller = connect(
  (state) => {
  // maps state to props
    return state
  },
  () => ({
  // maps props to action dispatchers
    // addUser: addUser,
    // removeUser: removeUser,
    // createUnavailablity: createUnavailablity,
  })
)(CalendarMonth)

store.dispatch(fetchFromServer())

React.render(
  <Provider store={ store }>{() => <Controller/>}</Provider>,
  document.querySelector('main')
)
