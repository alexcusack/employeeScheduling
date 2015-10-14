import { generateUnavailabilityFacts, findRepalcement } from './helpers'

export const loadEntries = (journalEntries) => {
  return {
    type: 'LOAD_ENTRIES',
    journalEntries: journalEntries,
  }
}

export const setCurrentUser = (userID) => {
  console.log('setting setCurrentUser', userID)
  return {
    type: 'SET_CURRENT_USER',
    userid: userID,
  }
}

// filter set to 'all' or 'currentUser'
export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter,
  }
}

export const createUnavailability = (userID, assignmentID, date) => {
  return {
    type: 'CREATE_UNAVAILABILITY',
    facts: generateUnavailabilityFacts(userID, assignmentID, date),
  }
}

export const startSwapAssignment = (userID, assignmentID, date) => {
  console.log('start swap')
  const possibleReplacements = findRepalcement(userID, date)
  console.log(possibleReplacements)
  return {
    type: 'START_ASSIGNMENT_SWAP',
    assignmentID: assignmentID,
    date: date,
    possibleReplacements: possibleReplacements,
  }
}

export const swapAssignment = (assignmentA, assignmentB, userA, userB) => {
  return {
    type: 'SWAP_ASSIGNMENT',
    assignmentA: assignmentA,
    assignmentB: assignmentB,
    userA: userA,
    userB: userB,
  }
}

export const sendFactToServer = (facts, originatingAction) => {
  return {
    type: 'SEND_FACT_TO_SERVER',
    facts: facts,
    originatingAction: originatingAction,
  }
}

export const fetchFromServer = () => {
  return {
    type: 'FETCH_FROM_SERVER',
  }
}

export const checkForNewFacts = () => {
  return {
    type: 'CHECK_FOR_NEW_FACTS',
  }
}

// export const removeUnavailability = (unavailabilityID) => {
//   return {
//     type: 'REMOVE_UNAVAILABILITY',
//     unavailabilityID: unavailabilityID,
//   }
// }
