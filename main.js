import Promise from 'bluebird'
global.Promise = Promise
import React from 'react'
// import PureComponent from 'react-pure-render/component'
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import CalendarMonth from './components'
import * as actions from './actions'
import { readJournal } from './reducers'
import { pushToServer, pullFromServer } from './server_calls'
import { generateUnavailabilityFacts, generateRemoveUnavailabilityFacts, generateAssignmentSwapFacts } from './helpers'

const initialState = { users: {}, assignments: {}, unavailabilities: {}, lastEntryDate: undefined }

const dispatch = (state = initialState, action) => {
  if (action.type === 'FOO') { console.log('call made'); return Object.assign({}, store.getState()) }
  if (action.type === 'FETCH_FROM_SERVER') { pullFromServer() }
  if (action.type === 'SEND_FACT_TO_SERVER') { pushToServer(action.facts, action.originatingAction) }
  if (action.type === 'UPDATE_STATE') { return readJournal(action.journalEntries, state) }
  if (action.type === 'CHECK_FOR_NEW_FACTS') { return readJournal(action.journalEntries, state) }
  if (action.type === 'CREATE_UNAVAILABILITY') { generateUnavailabilityFacts(action.userID, action.date) }
  if (action.type === 'REMOVE_UNAVAILABILITY') { generateRemoveUnavailabilityFacts(action.unavailabilityID) }
  if (action.type === 'SWAP_ASSIGNMENT') { generateAssignmentSwapFacts(action.assignmentA, action.assignmentB, action.userA, action.userB) }
  return state
}

export let store = redux.createStore(dispatch)
global.store = store

// store.dispatch(actions.fetchFromServer())

export const Controller = connect(
  (state) => {
    // return {
    //   users: state.users,
    //   unavailabilities: state.unavailabilities,
    //   assignments: state.assignments,
    // }
    return {
      users:
       { 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0': 'alex',
         '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006': 'myles' },
      assignments:
       { '95D131AF-62CC-4C68-8202-B970EBBCC977':
          { date: '2015-10-08',
            user: '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006' },
         '1A160698-EFE0-40E0-8300-233A9F5F2E4D':
          { date: '2015-10-10',
            user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } },
      unavailabilities:
       { '06EC3D88-BA33-4151-8E87-97F025A8EACE':
          { date: '2015-10-08',
            user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } }
    }
  },
(dispatch) => {
  return {
    actions: redux.bindActionCreators(actions, dispatch),
  }
}
)(CalendarMonth)

React.render(
  <Provider store={store}>{() => <Controller/>}</Provider>,
  document.querySelector('main')
)
