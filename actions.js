// import { getDate } from './helpers'

// fetch full list from server
export const updateState = (journalEntries) => {
  return {
    type: 'UPDATE_STATE',
    journalEntries: journalEntries,
  }
}

export const createUnavailablity = (name, date) => { // creates the action that fetchs user ID, and builds facts. thats then passed to a new action with facts as args
  return {
    type: 'CREATE_UNAVAILABILITY',
    name: name,
    date: date,
  }
}

export const sendFactToServer = (facts, originatingAction) => {
  return {
    type: 'SEND_FACT_TO_SERVER',
    facts: facts,
    originatingAction: originatingAction,
  }
}

// export const createAssignment = (currentFact, state) => {
//   return {
//     date: state.dates[currentFact[1]],
//     assignedUser: currentFact[3],
//     unvailabilities: [],
//   }
// }

// export const createUser = (name) => {
//   return {
//     type: 'CREATE_NEW_USER',
//     name: name,
//   }
// }

// export const removeUser = (name) => {
//   return {
//     type: 'REMOVE_USER',
//     name: name,
//   }
// }

