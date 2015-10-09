import fetch from 'node-fetch'
import uuid from 'uuid'

export const newUnavailability = (name, date) => {
  const newUUID = uuid()
  const timeStamp = new Date()
  const facts = [[ 'assert', newUUID, 'unavailability/user', userID ], [ 'assert', newUUID, 'unavailability/date', date.slice() ]]
  const postBody = {actionType: actionType, timestamp: timeStamp.toISOString(), facts: facts}

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
      if (res.status === 200) { return store.dispatch(sampleState, loadJournalEntries(facts)) }
      if (res.status === 201) { console.log('fail', res) /* store.dispatch(loadJournalEntries(res.newEntries)) */}// append missed entries with new *compatable* fact
      if (res.status > 399) { console.log('error', res) /* don't let fact append, alert user of error */ }
    })

}
