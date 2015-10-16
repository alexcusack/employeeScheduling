import fetch from 'node-fetch'
import { loadEntries } from './actions'
// import { store } from './main'

export const pushToServer = (entry) => {
  const timestamp = new Date()
  const postBody = { facts: entry.facts, name: entry.name, lastEntryDate: store.getState().lastEntryDate }
  fetch('http://localhost:3000/journal',
    {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Origin': '127.0.0.1:8080/' },
      body: JSON.stringify(postBody),
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      // if (response.status === 200) { store.dispatch(loadEntries(response)) }
    })
    .catch(response => {
      if (response.status === 406) { store.dispatch(loadEntries(response)) } // then retry ?
      console.log('Push to Server Error:', response)
    })
}

export const pullFromServer = (dispatch, lastEntryDate) => {
  fetch('http://localhost:3000/journal?date=' + lastEntryDate)
  .then((response) => response.json())
  .then(response => {
    if (response.status === 200) { dispatch(loadEntries(response)) }
  })
  .catch(response => {
    console.log('Pull From Server Error:', response)
  })
}
