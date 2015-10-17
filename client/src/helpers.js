import uuid from 'uuid'
// import { store } from './main'
import { pushToServer } from './server_calls'

//dateString 'Mon Oct 01 2015 17:05:24 GMT-0700 (PDT)'
export const dateIsWeekend = (dateString) => { dateString = new Date(dateString); return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

export const generateUnavailabilityFacts = (userID, assignmentID, date, state) => {
  const replacement = findRepalcement(userID, date, state)[0]
  const facts = generateAssignmentSwapFacts(assignmentID, replacement[0], userID, replacement[1], state, date)
  const retraction = retractUnavailabilityOfUserIfPresent(userID, state)
  if (retraction.length > 0) {
    facts.push(retraction)
  }
  pushToServer({name: 'createUnavailability', state, facts: facts}, state)
  return facts
}

const retractUnavailabilityOfUserIfPresent = (userID, state) => {
  let fact = []
  Object.keys(state.unavailabilities).map((unavailability) => {
    if (state.unavailabilities[unavailability].user === userID) { fact = ['retract', unavailability] }
  })
  return fact
}

export const generateAssignmentSwapFacts = (assignmentA, assignmentB, userA, userB, state, date, swapping = false) => {
  const newUUID = uuid()
  const facts = [
     [ 'assert', assignmentA, 'assignment/user', userB ],
     [ 'assert', assignmentB, 'assignment/user', userA ],
     [ 'assert', newUUID, 'unavailability/user', userA ],
     [ 'assert', newUUID, 'unavailability/date', date ],
  ]
  if (swapping) { pushToServer({name: 'swapAssignment', facts: facts}, state) }
  return facts
}

export const findUnavailableUsers = (date, state) => {
  const userIDtoDate = {}
  for (let unavailability in state.unavailabilities) {
    const thisUnavailability = state.unavailabilities[unavailability]
    if (thisUnavailability.date === date) { userIDtoDate[thisUnavailability.user] = thisUnavailability.date }
  }
  return userIDtoDate
}

export const findRepalcement = (userID, date, state) => {
  const options = []
  const unavailabilities = findUnavailableUsers(date, state)
  for (let assignment in state.assignments) {
    const thisAssignment = state.assignments[assignment]
    if (new Date(thisAssignment.date) > new Date(state.todaysDate)) {
      if (!unavailabilities[thisAssignment.user] && userID !== thisAssignment.user) { options.push([assignment, thisAssignment.user]) }
    }
  }
  return options
}
