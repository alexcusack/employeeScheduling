import { generateUnavailabilityFacts, findRepalcement } from './helpers'

export const loadEntries = (journalEntries) => {
  return {
    type: 'LOAD_ENTRIES',
    journalEntries: journalEntries,
  }
}

export const setCurrentUser = (userID) => {
  return {
    type: 'SET_CURRENT_USER',
    userid: userID,
  }
}

export const changeMonth = (direction) => {
  return {
    type: 'CHANGE_MONTH',
    direction: direction, // +1 or -1
  }
}

// filter set to 'all' or 'currentUser'
export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter,
  }
}

export const createUnavailability = (userID, assignmentID, date, state) => {
  return {
    type: 'CREATE_UNAVAILABILITY',
    facts: generateUnavailabilityFacts(userID, assignmentID, date, state),
  }
}

export const startSwapAssignment = (userID, assignmentID, date, state) => {
  const possibleReplacements = findRepalcement(userID, date, state)
  return {
    type: 'START_ASSIGNMENT_SWAP',
    assignmentID: assignmentID,
    date: date,
    possibleReplacements: possibleReplacements,
    initiatingUserID: userID,
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
