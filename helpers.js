import uuid from 'uuid'
import { sendFactToServer } from './actions'
import { store } from './main'

export const dateIsWeekend = (dateString) => { return dateString.getDay() === 6 || dateString.getDay() === 0 }
// export const lookUpUserIDByName = (name) => { return mapIdToName[name] }
// export const UserAlreadyExist = (name) => { return !!lookUpUserIDByName(name) }
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }

export const generateUnavailabilityFacts = (userID, date) => {
  // find replacement user and generate a swap with that info.
  const newUUID = uuid()
  const facts = [[ 'assert', newUUID, 'unavailability/user', userID ], [ 'assert', newUUID, 'unavailability/date', date ]]
  // store.dispatch(sendFactToServer(facts, 'CREATE_UNAVAILABILITY'))
}

export const generateRemoveUnavailabilityFacts = (unavailabilityID) => {
  const facts = ['retract', unavailabilityID]
  store.dispatch(sendFactToServer(facts, 'REMOVE_UNAVAILABILITY'))
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
}

// const findAssignmentReplacement = (date) => {
//   const assignments = store.getState().assignments
//   const users = store.getState().users
//   const unavailabilities = store.getState().unavailabilities
//   for (let userID of users ) {
//     if (!userUnavailable(userID, date)){ return userID }
//   }
// }

// { users:
//    { 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0': 'alex',
//      '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006': 'myles' },
//   assignments:
//    { '95D131AF-62CC-4C68-8202-B970EBBCC977':
//       { date: '2015-10-08',
//         user: '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006' },
//      '1A160698-EFE0-40E0-8300-233A9F5F2E4D':
//       { date: '2015-10-10',
//         user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } },
//   unavailabilities:
//    { '06EC3D88-BA33-4151-8E87-97F025A8EACE':
//       { date: '2015-10-08',
//         user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } } }
