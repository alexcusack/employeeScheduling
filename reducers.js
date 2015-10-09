
export const readJournal = (journalEntries, state) => {
  let newState = Object.assign({}, state)
  for (let entry of journalEntries) {
    const facts = JSON.parse(entry.facts)
    if (entry.name === 'createUser') {
      newState.users[facts[0][1]] = facts[0][3]
    }
    if (entry.name === 'createAssignment') {
      newState.assignments[facts[0][1]] = { date: facts[1][3], user: facts[0][3] }
    }
    if (entry.name === 'createUnavailability') {
      newState.unavailabilities[facts[0][1]] = { date: facts[1][3], user: facts[0][3] }
      // swap user with a replacement user
    }
    if (entry.name === 'removeUnavailability') {
      delete newState.unavailabilities[facts[0][1]]
    }
    if (entry.name === 'swapAssignment') {
      // update initiating user's old assignment to replacement user's id
      newState.assignments[facts[0][1]].user = facts[0][3]
      // update replacement users assignment to initializing user's id
      newState.assignments[facts[1][1]].user = facts[1][3]
      // create initializing user's unavailablity
      newState.unavailabilities[facts[2][1]] = { date: facts[3][3], user: facts[2][3] }
    }
  }
  return newState
}



// export const createUnvailability = (state, userID, date) => {
//   const newUUID = uuid()
//   const timeStamp = new Date()
//   const facts = [[ 'assert', newUUID, 'unavailability/user', userID ], [ 'assert', newUUID, 'unavailability/date', date.slice() ]]
//   const postBody = {actionType: 'CREATE_UNAVAILABILITY', timestamp: timeStamp.toISOString(), facts: facts}

//   fetch('http://localhost:3000/journal',
//     {
//       method: 'POST',
//       headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//       body: JSON.stringify(postBody),
//     })
//     .then(function (res) {
//       return res.json()
//     })
//     .then(function (res) {
//       console.log(res.status)
//       if (res.status === 200) { return store.dispatch(sampleState, loadJournalEntries(facts)) }
//       if (res.status === 201) { console.log('fail', res) /* store.dispatch(loadJournalEntries(res.newEntries)) */}// append missed entries with new *compatable* fact
//       if (res.status > 399) { console.log('error', res) /* don't let fact append, alert user of error */ }
//     })

// }


// export const addUser = (state, name) => {
//   // build fact, send to backend,
//   // reduce and update.
//   if (!name) { return state }
//   if (UserAlreadyExist(name)) { return state }
//   let newId = uuid()
//   mapIdToName[name] = newId
//   let newState = Object.assign({}, state)
//   newState.users[newId] = name
//   return newState
// }

// export const removeUser = (state, name) => {
//   if (!name) { return state }
//   const user = lookUpUserIDByName(name)
//   if (/* user doesn't exist */ !user) { return state }
//   // remove user from schedule
//   // update schedule appropriately
//   let newState = state
//   delete newState.users[lookUpUserIDByName(name)]
//   return newState
// }

