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
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status)
      if (response.status === 200) { return store.dispatch(updateState(facts)) }
      if (response.status === 201) { console.log('fail', response) /* store.dispatch(loadJournalEntries(response.newEntries)) */}// append missed entries with new *compatable* fact
      if (response.status > 399) { console.log('error', response) /* don't let fact append, alert user of error */ }
    })
}

export const pullFromServer = (date) => {
  fetch('http://localhost:3000/journal?date=' + date)
  .then((response) => response.json())
  .then(response => {
    console.log('pull from server success')
    // console.log(response)
    store.dispatch(updateState(response))
  })
  // TODO: handle errors
}
