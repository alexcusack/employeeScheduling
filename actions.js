import { getDate } from './helpers'

export const loadJournalEntries = (dateString) => {
  // this will fetch list of facts from server
  return {
    type: 'LOAD_JOURNAL_ENTRIES',
    journalEntries: [
      {"id":2, "timestamp": "2015-10-08T16:56:45.597Z", "name": "createUser", "facts": "[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]", "created_at": "2015-10-08T16:56:51.290Z", "updated_at": "2015-10-08T16:56:51.290Z"},
    ],
    // names: ['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack', 'Sherry',
    //  'Matte', 'Kevin', 'Kevin', 'Vicente', 'Zoe', 'Kevin',
    //  'Matte', 'Zoe', 'Jay', 'Boris', 'Eadon', 'Sherry',
    //  'Franky', 'Sherry', 'Matte', 'Franky', 'Franky', 'Kevin',
    //  'Boris', 'Franky', 'Vicente', 'Luis', 'Eadon', 'Boris',
    //  'Kevin', 'Matte', 'Jay', 'James', 'Kevin', 'Sherry',
    //  'Sherry', 'Jack', 'Sherry', 'Jack'],
    startDate: getDate(dateString),
  }
}

export const createAssignment = (currentFact, state) => {
  return {
    date: state.dates[currentFact[1]],
    assignedUser: currentFact[3],
    unvailabilities: [],
  }
}

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
