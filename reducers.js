import uuid from 'uuid'
import { loadSeedFacts, mapIdToName, UserAlreadyExist, lookUpUserIDByName } from './helpers'
import { createAssignment } from './actions'

export const readJournalLog = (journalEntries, state) => {
  let newState = Object.assign({}, state)
  for (let entry of journalEntries) {
    const facts = JSON.parse(entry.facts)
    if (entry.name === 'createUser') {
      newState.users[facts[1]] = facts[3]
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
