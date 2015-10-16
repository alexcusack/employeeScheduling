import uuid from 'uuid'
// import { store } from './main'
import { pushToServer } from './server_calls'

//dateString 'Mon Oct 01 2015 17:05:24 GMT-0700 (PDT)'
export const dateIsWeekend = (dateString) => { dateString = new Date(dateString); return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

export const generateUnavailabilityFacts = (userID, assignmentID, date) => {
  const replacement = findRepalcement(userID, date, store.getState())[0]
  const facts = generateAssignmentSwapFacts(assignmentID, replacement[0], userID, replacement[1], date)
  // const retraction = retractUnavailabilityOfUserIfPresent(userID)
  // if (retraction.length > 0) {
  //   facts.push(retraction)
  // }
  pushToServer({name: 'createAssignment', facts: facts})
  return facts
}

const retractUnavailabilityOfUserIfPresent = (userID) => {
  let fact = []
  Object.keys(store.getState().unavailabilities).map((unavailability) => {
    if (store.getState().unavailabilities[unavailability].user === userID) { fact = ['retract', unavailability] }
  })
  return fact
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
}

export const findUnavailableUsers = (date) => {
  const userIDtoDate = {}
  for (let unavailability in store.getState().unavailabilities) {
    const thisUnavailability = store.getState().unavailabilities[unavailability]
    if (thisUnavailability.date === date) { userIDtoDate[thisUnavailability.user] = thisUnavailability.date }
  }
  return userIDtoDate
}

export const findRepalcement = (userID, date, state) => {
  const options = []
  const unavailabilities = findUnavailableUsers(date)
  for (let assignment in state.assignments) {
    const thisAssignment = state.assignments[assignment]
    if (new Date(thisAssignment.date) > new Date(state.todaysDate)) {
      if (!unavailabilities[thisAssignment.user] && userID !== thisAssignment.user) { options.push([assignment, thisAssignment.user]) }
    }
  }
  return options
}
