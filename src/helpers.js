import uuid from 'uuid'
import { sendFactToServer } from './actions'
import { store } from './main'
// import { pushToServer } from './server_calls'

export const dateIsWeekend = (dateString) => { return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

export const generateUnavailabilityFacts = (userID, assignmentID, date) => {
  const replacement = findRepalcement(userID, date)
  generateAssignmentSwapFacts(assignmentID, replacement[0], userID, findRepalcement[1])
}

export const generateAssignmentSwapFacts = (assignmentA, assignmentB, userA, userB) => {
  const newUUID = uuid()
  const unavailabilityDate = store.getState().assignmentList[assignmentA].date
  const facts = [
     [ 'assert', assignmentA, 'assignment/user', userB ],
     [ 'assert', assignmentB, 'assignment/user', userA ],
     [ 'assert', newUUID, 'unavailability/user', userA ],
     [ 'assert', newUUID, 'unavailability/user', unavailabilityDate ],
  ]
  store.dispatch(sendFactToServer(facts, 'SWAP_ASSIGNMENT'))
  // pushToServer(facts, 'SWAP_ASSIGNMENT')
}

export const findUnavailableReplacements = (date) => {
  let set = {}
  for (let unavailability in store.getState().unavailabilities) {
    const thisUnavailability = store.getState().unavailabilities[unavailability]
    if (thisUnavailability.date === date) { set[thisUnavailability.user] = true }
  }
  return set
}

export const findRepalcement = (userID, date) => {
  const unavailabilities = findUnavailableReplacements(date)
  for (let assignment in store.getState().assignments) {
    const thisAssignment = store.getState().assignments[assignment]
    if (new Date(thisAssignment.date) > new Date(date)) {
      if (!unavailabilities[thisAssignment.user] && userID !== thisAssignment.user) { return [assignment, thisAssignment.user] }
    }
  }
}

// export const generateRemoveUnavailabilityFacts = (unavailabilityID) => {
//   const facts = ['retract', unavailabilityID]
//   store.dispatch(sendFactToServer(facts, 'REMOVE_UNAVAILABILITY'))
// }