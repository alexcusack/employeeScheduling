import uuid from 'uuid'
import { loadSeedFacts, mapIdToName, UserAlreadyExist, lookUpUserIDByName } from './helpers'
import { createAssignment } from './actions'

export const readSeedNames = (names, startDate, state) => {
  const loadedSeed = loadSeedFacts(names, startDate)
  return Object.assign({}, state,
    loadedSeed.reduce((newState, currentFact) => {
      if (currentFact[2] === 'User/name') { newState.users[currentFact[1]] = currentFact[3] }
      if (currentFact[2] === 'assignment/Date') { newState.dates[currentFact[1]] = currentFact[3] }
      if (currentFact[2] === 'assignment/User') {
        newState.assignmentList.push(createAssignment(currentFact, newState))
      }
      return newState
    }, state)
  )
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
