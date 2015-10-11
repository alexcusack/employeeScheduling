// fetch full list from server
export const updateState = (journalEntries) => {
  return {
    type: 'UPDATE_STATE',
    journalEntries: journalEntries,
  }
}

export const createUnavailablity = (userID, date) => {
// creates the action that fetchs user ID, and builds facts. thats then passed to a new action with facts as args
  console.log('createUnavailablity')
  return {
    type: 'CREATE_UNAVAILABILITY',
    userID: userID,
    date: date,
  }
}

export const removeUnavailability = (unavailabilityID) => {
  return {
    type: 'REMOVE_UNAVAILABILITY',
    unavailabilityID: unavailabilityID,
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
