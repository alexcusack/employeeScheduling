// import ReactDOM from 'react-dom'
import Promise from 'bluebird'
global.Promise = Promise
// import fetch from 'node-fetch'
import React from 'react'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import { CalendarMonth } from './components'
import { fetchFromServer, updateState, createUnavailablity, removeUnavailability, swapAssignment } from './actions'
import { readJournal } from './reducers'
import { pushToServer, pullFromServer } from './server_calls'
import { generateUnavailabilityFacts, generateRemoveUnavailabilityFacts, generateAssignmentSwapFacts } from './helpers'

const initialState = { users: {}, assignments: {}, unavailabilities: {} }

const dispatch = (state = initialState, action) => {
  if (action.type === 'FOO') { console.log('call made'); return Object.assign({}, store.getState()) }
  if (action.type === 'FETCH_FROM_SERVER') { pullFromServer() }
  if (action.type === 'SEND_FACT_TO_SERVER') { pushToServer(action.facts, action.originatingAction) }
  if (action.type === 'UPDATE_STATE') { return readJournal(action.journalEntries, state) }
  if (action.type === 'CREATE_UNAVAILABILITY') { generateUnavailabilityFacts(action.userID, action.date) }
  if (action.type === 'REMOVE_UNAVAILABILITY') { generateRemoveUnavailabilityFacts(action.unavailabilityID) }
  if (action.type === 'SWAP_ASSIGNMENT') { generateAssignmentSwapFacts(action.assignmentA, action.assignmentB, action.userA, action.userB) }
  return state
}

export const store = redux.createStore(dispatch)
global.store = store

const Controller = connect(
  (state) => ({
  // maps state to props
    users: store.getState().users,
    assignments: store.getState().assignments,
    unavailabilities: store.getState().unavailabilities,
  }),
  () => ({
  // maps props to action dispatchers
    updateState: updateState,
    createUnavailablity: createUnavailablity,
    removeUnavailability: removeUnavailability,
    swapAssignment: swapAssignment,
  })
)(CalendarMonth)

store.dispatch(fetchFromServer())


React.render(
  <Provider store={store} checked={'hi'}>{() => <Controller/>}</Provider>,
  document.querySelector('main')
)
