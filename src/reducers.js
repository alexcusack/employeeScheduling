
export const readJournal = (journalEntries, state) => {
  //Journal Entry shape: json: {status: 200, updates: [], lastEntry:  '2015-10-08 00:06:00 UTC'}
  // console.log(state)
  if (journalEntries === undefined) { return Object.assign({}, state) }
  let newState = Object.assign({}, state)
  newState.lastEntryDate = journalEntries.lastEntry
  for (let entry of journalEntries.updates) {
    const facts = JSON.parse(entry.facts)
    if (entry.name === 'createUser') {
      newState.users[facts[1]] = facts[3]
    }
    if (entry.name === 'createAssignment') {
      newState.assignments[facts[0][1]] = { date: facts[1][3], user: facts[0][3] }
    }
    if (entry.name === 'createUnavailability') {
      newState.unavailabilities[facts[0][1]] = { date: facts[1][3], user: facts[0][3] }
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

export const setUser = (userid, state) => {
  let newState = Object.assign({}, state)
  newState.currrentUserID = userid
  return newState
}

export const changeVisibility = (filter, state) => {
  console.log('change visibilityFiler to', filter)
  let newState = Object.assign({}, state)
  newState.visibilityFiler = filter
  return newState
}