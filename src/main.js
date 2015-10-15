import Promise from 'bluebird'
global.Promise = Promise
import React from 'react'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import CalendarMonth from './components/CalendarMonth'
import * as actions from './actions'
import { readJournal, setUser, changeVisibility, addUnavailabilityAndReplacementUser, showAssignmentSwapOptions, swapAssignments, newMonth } from './reducers'
import { pullFromServer } from './server_calls'

const initialState = { users: {}, assignments: {}, unavailabilities: {}, lastEntryDate: undefined, currentUserID: '', visibilityFilter: 'all', todaysDate: () => { const date = new Date; return date.toISOString().slice(0, 10)}.call(), calendarMonthYear: [9,2015], 'swapStarted': false, 'loading': true }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_ENTRIES') { return readJournal(action.journalEntries, state) }
  if (action.type === 'SWAP_ASSIGNMENT') { return swapAssignments(action.assignmentA, action.assignmentB, action.userA, action.userB, state)}
  if (action.type === 'CREATE_UNAVAILABILITY') { return addUnavailabilityAndReplacementUser(action.facts, state) }
  if (action.type === 'SET_VISIBILITY_FILTER') { return changeVisibility(action.filter, state) }
  if (action.type === 'START_ASSIGNMENT_SWAP') { return showAssignmentSwapOptions(action.assignmentID, action.date, action.possibleReplacements, action.initiatingUserID, state) }
  if (action.type === 'SET_CURRENT_USER') { return setUser(action.userid, state) }
  if (action.type === 'CHANGE_MONTH') { return newMonth(action.direction, state) }
  return state
}

export let store = redux.createStore(dispatch)
global.store = store

export const Controller = connect(
  (state) => {
    state.swapStarted ?
      state.assignmentsIDsByDate = state.swapStarted.possibleReplacements.reduce((dateToAssignment, assignmentIDUserID) => {
        const assignmentID = assignmentIDUserID[0]
        const userID = assignmentIDUserID[1]
        dateToAssignment[state.assignments[assignmentID].date] = assignmentID
        return dateToAssignment
      }, {})
     :state.assignmentsIDsByDate = Object.keys(state.assignments).reduce((dateToAssignment, currentAssignment) => {
      dateToAssignment[state.assignments[currentAssignment].date] = currentAssignment
      return dateToAssignment
    }, {})
    return state
  },
  (dispatch) => { return {actions: redux.bindActionCreators(actions, dispatch)} }
)(CalendarMonth)

React.render(
  <Provider store={store}>{() => <Controller/>}</Provider>,
  document.querySelector('main')
)

pullFromServer(store.dispatch.bind(store))

const checkForUpdate = () => {
  return pullFromServer(store.dispatch.bind(store))
}

setInterval(checkForUpdate, 10000)