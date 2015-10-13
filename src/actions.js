// fetch full list from server
export const loadEntries = (journalEntries) => {
  return {
    type: 'LOAD_ENTRIES',
    journalEntries: journalEntries,
  }
}

export const setCurrentUser = (userID) => {
  console.log('setting setCurrentUser')
  return {
    type: 'SET_CURRENT_USER',
    userid: userID,
  }
}

export const createUnavailability = (userID, assignmentID, date) => {
  return {
    type: 'CREATE_UNAVAILABILITY',
    userID: userID,
    assignmentID: assignmentID,
    date: date,
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
