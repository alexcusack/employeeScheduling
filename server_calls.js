import fetch from 'node-fetch'
import { updateState } from './actions'
import { store } from './main'

export const pushToServer = (facts, originalAction) => {
  const timeStamp = new Date()
  const postBody = {actionType: originalAction, timestamp: timeStamp.toISOString(), facts: facts}

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
      console.log(res.status)
      if (res.status === 200) { return store.dispatch(updateState(facts)) }
      if (res.status === 201) { console.log('fail', res) /* store.dispatch(loadJournalEntries(res.newEntries)) */}// append missed entries with new *compatable* fact
      if (res.status > 399) { console.log('error', res) /* don't let fact append, alert user of error */ }
    })
}

export const pullFromServer = () => {
  fetch('http://localhost:3000/journal')
    .then(function (res) {
      return res.json()
    })
    .then(function (journalEntries) {
      console.log('success: pull from server')
      store.dispatch(updateState(journalEntries))
      // console.log(store.getState())
    })
}
