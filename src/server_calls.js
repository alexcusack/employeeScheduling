import fetch from 'node-fetch'
import { updateState } from './actions'
import { store } from './main'
import { readJournal } from './reducers'

export const pushToServer = (facts, originalAction) => {
  const timestamp = new Date()
  const postBody = { actionType: originalAction, timestamp: timestamp.toISOString(), facts: facts, lastEntryDate: store.getState().lastEntryDate }

  fetch('http://localhost:3000/journal',
    {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response.status)
      if (/* log out of sync */ response.status === 406) { readJournal(response) /* retry last action */ }
      if (/* successful appended facts */ response.status === 200) { return store.dispatch(updateState(facts)) }
    })
}

export const pullFromServer = (date) => {
  fetch('http://localhost:3000/journal?date=' + date)
  .then((response) => response.json())
  .then(response => {
    if (response.status === 200 || 206) { store.dispatch(updateState(response)) }
    // 200 -> full log update
    // 206 -> partial log update
    // 204 -> no updates
  })
  // TODO: handle errors
}
