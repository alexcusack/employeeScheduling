import fetch from 'node-fetch'
import { loadEntries } from './actions'
import { store } from './main'
import { readJournal } from './reducers'

export const pushToServer = (facts) => {
  const timestamp = new Date()
  const postBody = { timestamp: timestamp.toISOString(), facts: facts, lastEntryDate: store.getState().lastEntryDate }
  console.log('pushToServer', postBody)
  fetch('http://localhost:3000/journal',
    {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Origin': '127.0.0.1:8080/' },
      body: JSON.stringify(postBody),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      if (response.status === 200) { /* facts were saved to db */ }
      if (response.status === 406) { store.dispatch(loadEntries(response)) }
    }
  )
}

export const pullFromServer = (dispatch, date) => {
  console.log('pulling from server')
  fetch('http://localhost:3000/journal?date=' + date)
  .then((response) => response.json())
  .then(response => {
    if (response.status === 200) { dispatch(loadEntries(response)) }
    // 200 -> full log update
    // 304 -> no updates
  })
  .catch(response => {
    console.log('oops something went wrong', response)
  })
  // TODO: handle errors
}
