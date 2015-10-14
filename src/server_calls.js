import fetch from 'node-fetch'
import { loadEntries } from './actions'
// import { store } from './main'
import { readJournal } from './reducers'

export const pushToServer = (facts) => {
  const timestamp = new Date()
  const postBody = { timestamp: timestamp.toISOString(), facts: facts, lastEntryDate: store.getState().lastEntryDate }
  console.log('pushToServer', postBody)
  fetch('http://localhost:3000/journal',
    {
      method: 'POST',
      body: JSON.stringify(postBody),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      // if (/* log out of sync */ response.status === 406) { readJournal(response) /* retry last action */ }
      // if (/* successful appended facts */ response.status === 200) { return store.dispatch(updateState(facts)) }
    })
}

export const pullFromServer = (dispatch, date) => {
  fetch('http://localhost:3000/journal?date=' + date)
  .then((response) => response.json())
  .then(response => {
    console.log(response)
    if (response.status === 200) { dispatch(loadEntries(response)) }
    // 200 -> full log update
    // 304 -> no updates
  })
  // TODO: handle errors
}
