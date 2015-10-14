import uuid from 'uuid'
import { sendFactToServer } from './actions'
import { store } from './main'
import { pushToServer } from './server_calls'

//dateString 'Mon Oct 01 2015 17:05:24 GMT-0700 (PDT)'
export const dateIsWeekend = (dateString) => { dateString = new Date(dateString); return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

export const generateUnavailabilityFacts = (userID, assignmentID, date) => {
  const replacement = findRepalcement(userID, date)[0]
  return generateAssignmentSwapFacts(assignmentID, replacement[0], userID, replacement[1], date)
}

export const generateAssignmentSwapFacts = (assignmentA, assignmentB, userA, userB, date) => {
  const newUUID = uuid()
  const facts = [
     [ 'assert', assignmentA, 'assignment/user', userB ],
     [ 'assert', assignmentB, 'assignment/user', userA ],
     [ 'assert', newUUID, 'unavailability/user', userA ],
     [ 'assert', newUUID, 'unavailability/date', date ],
  ]
  return facts
  // return pushToServer(facts)
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
  const options = []
  const unavailabilities = findUnavailableReplacements(date)
  for (let assignment in store.getState().assignments) {
    const thisAssignment = store.getState().assignments[assignment]
    if (new Date(thisAssignment.date) > new Date(store.getState().todaysDate)) {
      if (!unavailabilities[thisAssignment.user] && userID !== thisAssignment.user) { options.push([assignment, thisAssignment.user]) }
    }
  }
  return options
}
