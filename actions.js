import { getDate } from './helpers'

// fetch full list from server
export const loadJournalEntries = (journalEntries, dateString) => {
  return {
    type: 'LOAD_JOURNAL_ENTRIES',
    journalEntries: journalEntries,
    startDate: getDate(dateString),
  }
}

// export const createAssignment = (currentFact, state) => {
//   return {
//     date: state.dates[currentFact[1]],
//     assignedUser: currentFact[3],
//     unvailabilities: [],
//   }
// }

export const createUser = (name) => {
  return {
    type: 'CREATE_NEW_USER',
    name: name,
  }
}

export const removeUser = (name) => {
  return {
    type: 'REMOVE_USER',
    name: name,
  }
}

export const createUnavailablity = (name, date) => {
  return {
    type: 'CREATE_UNAVAILABILITY',
    name: name,
    date: date,
  }
}
