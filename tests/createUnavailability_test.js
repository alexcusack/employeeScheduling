import fetch from 'node-fetch'
import uuid from 'uuid'
import * as redux from 'redux'
import { loadJournalEntries } from '../actions'
import { readJournalLog } from '../reducers'

const sampleInitialState = {
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
  unavailabilities: {},
}
const dispatch = (state = sampleInitialState, action) => {
  if (action.type === 'CREATE_UNAVAILABILITY') { return createUnvailability(name, date) }
  if (action.type === 'UPDATE_STATE') { return readJournalLog(action.journalEntries, state) }
  return state
}

const localStore = redux.createStore(dispatch)

export const createUnvailability = (userID, date) => {
  const newUUID = uuid()
  const timeStamp = new Date()
  const facts = [
    [ 'assert', newUUID, 'unavailability/user', userID ],
    [ 'assert', newUUID, 'unavailability/date', date.slice() ],
  ]
  const postBody = {actionType: 'CREATE_UNAVAILABILITY', timestamp: timeStamp.toISOString(), facts: facts}

  fetch('http://localhost:3000/journal',
    {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      if (res.status === 200) { localStore.dispatch(loadJournalEntries(facts)) }
      console.log(localStore.getState())
      if (res.status === 201) { console.log('fail', res) /* store.dispatch(loadJournalEntries(res.newEntries)) */}// append missed entries with new *compatable* fact
      if (res.status > 399) { console.log('error', res) /* don't let fact append, alert user of error */ }
      console.log('end')
    })
}

createUnvailability('D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0', '2015-10-09')