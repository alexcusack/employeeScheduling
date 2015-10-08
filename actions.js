import { getDate } from './helpers'

export const loadJournalEntries = (journalEntries, dateString) => {
  // fetch list of facts from server
  return {
    type: 'LOAD_JOURNAL_ENTRIES',
    journalEntries: journalEntries,
    //[ // sample server response
    //   {"id":2, "timestamp": "2015-10-08T16:56:45.597Z", "name": "createUser", "facts":"[\"assert\", \"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\", \"user/name\", \"alex\"]", "created_at":"2015-10-08T16:56:51.290Z", "updated_at":"2015-10-08T16:56:51.290Z"},
    //   {"id":3, "timestamp": "2015-10-08T17:46:45.891Z", "name": "createAssignment", "facts":"[[\"assert\", \"95D131AF-62CC-4C68-8202-B970EBBCC977\", \"assignment/user\", \"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"], [\"assert\", \"95D131AF-62CC-4C68-8202-B970EBBCC977\", \"assignment/date\", \"2015-10-08\"]]", "created_at":"2015-10-08T17:46:48.043Z", "updated_at":"2015-10-08T17:46:48.043Z"},
    //   {"id":4, "timestamp": "2015-10-08T17:54:28.345Z", "name": "createUnavailability", "facts":"[[\"assert\", \"3791D856-DBB2-4715-9CDB-9098286476C9\", \"unavailability/user\", \"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"], [\"assert\", \"3791D856-DBB2-4715-9CDB-9098286476C9\", \"unavailability/date\", \"2015-10-09\"]]", "created_at":"2015-10-08T17:54:29.899Z", "updated_at":"2015-10-08T17:54:29.899Z"},
    //   {"id":5, "timestamp": "2015-10-08T18:03:51.816Z", "name": "removeUnavailability", "facts":"[[\"retract\", \"3791D856-DBB2-4715-9CDB-9098286476C9\"]]", "created_at":"2015-10-08T18:03:54.264Z", "updated_at":"2015-10-08T18:03:54.264Z"}
    // ],
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
