import fetch from 'node-fetch'
import { store } from '../src/main'

const pushToServer = (facts) => {
  const timestamp = new Date()
  const postBody = { timestamp: timestamp.toISOString(), facts: facts, lastEntryDate: '2015-10-13 23:42:00 UTC' }
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
      if (response.status === 200) { /* facts were saved to db */ }
      if (response.status === 406) { store.dispatch(loadEntries(response)) }
    }
  )
}

const facts = [
      ['assert', '3791D856-DBB2-4715-9CDB-9098286476C9', 'unavailability/user', 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' ],
      ['assert', '3791D856-DBB2-4715-9CDB-9098286476C9', 'unavailability/date', '2015-10-09' ]]

pushToServer(facts)
