import Promise from 'bluebird'
global.Promise = Promise
import React from 'react'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import CalendarMonth from './components/CalendarMonth'
import * as actions from './actions'
import { readJournal, setUser, changeVisibility } from './reducers'
import { pushToServer, pullFromServer } from './server_calls'
import { generateUnavailabilityFacts, generateRemoveUnavailabilityFacts, generateAssignmentSwapFacts } from './helpers'
import { sampleState } from './sampleState'

const initialState = { users: {}, assignments: {}, unavailabilities: {}, lastEntryDate: undefined, currentUserID: null, visibilityFiler: 'all', todaysDate: '2015-10-13' }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_ENTRIES') { return readJournal(action.journalEntries, state) }
  if (action.type === 'SET_CURRENT_USER') { return setUser(action.userid, state) }
  if (action.type === 'SET_VISIBILITY_FILTER') { return changeVisibility(action.filter, state) }
  if (action.type === 'CREATE_UNAVAILABILITY') { generateUnavailabilityFacts(action.userID, action.assignmentID, action.date) }
  if (action.type === 'REMOVE_UNAVAILABILITY') { generateRemoveUnavailabilityFacts(action.UnavailabilityID) }
  if (action.type === 'SWAP_ASSIGNMENT') { generateAssignmentSwapFacts(action.assignmentA, action.assignmentB, action.userA, action.userB) }
  if (action.type === 'CHECK_FOR_NEW_FACTS') { return readJournal(action.journalEntries, state) }
  if (action.type === 'FETCH_FROM_SERVER') { pullFromServer() }
  if (action.type === 'SEND_FACT_TO_SERVER') { pushToServer(action.facts, action.originatingAction) }
  return state
}

export let store = redux.createStore(dispatch)
global.store = store

export const Controller = connect(
  (state) => { return sampleState },
  (dispatch) => { return {actions: redux.bindActionCreators(actions, dispatch)} }
)(CalendarMonth)

React.render(
  <Provider store={store}>{() => <Controller/>}</Provider>,
  document.querySelector('main')
)
