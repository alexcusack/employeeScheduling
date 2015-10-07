import uuid from 'uuid'
import { loadSeedFacts, mapIdToName} from './helpers'
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
  let newId = uuid()
  mapIdToName[name] = newId
  let newState = Object.assign({}, state)
  newState.users[newId] = name
  return newState
}

export const removeUser = (state, name) => {
  let newState = state
  delete newState.users[mapIdToName[name]]
  return newState
}
