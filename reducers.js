import uuid from 'uuid'
import { loadSeedFacts, mapIdToName, UserAlreadyExist, lookUpUserIDByName } from './helpers'
import { createAssignment } from './actions'

export const readJournalLog = (journalEntries, state) => {
  console.log("read journal log")
  let newState = Object.assign({}, state)
  for (let entry of journalEntries) {
    console.log(entry)
    if (entry.name === 'createUser') {
      let currentFact = JSON.parse(entry.facts)[0]
      newState.users[currentFact[1]] = currentFact[3]
    }
    if (entry.name === 'createAssignment') {
      let userAssignment = JSON.parse(entry.facts)[0]
      let dateAssignment = JSON.parse(entry.facts)[1]
      newState.assignments[userAssignment[1]] = { date: dateAssignment[3], user: userAssignment[3] }
    }
    if (entry.name === 'createUnavailability') {
      let userUnavailability = JSON.parse(entry.facts)[0]
      let dateUnavailability = JSON.parse(entry.facts)[1]
      newState.unavailabilities[userUnavailability[1]] = { date: dateUnavailability[3], user: userUnavailability[3] }
      // remove user from assigned date
    }
    if (entry.name === 'removeUnavailability') {
      let currentFact = JSON.parse(entry.facts)[0]
      delete newState.unavailabilities[currentFact[1]]
    }
  }
  return newState
}

export const addUser = (state, name) => {
  if (!name) { return state }
  if (UserAlreadyExist(name)) { return state }
  let newId = uuid()
  mapIdToName[name] = newId
  let newState = Object.assign({}, state)
  newState.users[newId] = name
  return newState
}

export const removeUser = (state, name) => {
  if (!name) { return state }
  const user = lookUpUserIDByName(name)
  if (/* user doesn't exist */ !user) { return state }
  // remove user from schedule
  // update schedule appropriately
  let newState = state
  delete newState.users[lookUpUserIDByName(name)]
  return newState
}

export const createUnvailability = (state, name, date) => {
  let user = lookUpUserIDByName(name)
  let newState = Object.assign({}, state)
  newState.assignmentList.map((assignment) => {
    if (assignment.date === date) { assignment.unvailabilities.push(user) }
  })
  // update the schedule to add someone into that date
  return newState
}

// mark unavailable,
// find replacement,
  // other user that is not unavailable.
  // -- get this from list of users that are available that
// swap user
