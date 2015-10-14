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
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    }
  )
}

export const pullFromServer = (dispatch, date) => {
  console.log('pulling from')
  fetch('http://localhost:3000/journal?date=' + date)
  .then((response) => response.json())
  .then(response => {
    if (response.status === 200) { dispatch(loadEntries(response)) }
    // 200 -> full log update
    // 304 -> no updates
  })
  // TODO: handle errors
}
