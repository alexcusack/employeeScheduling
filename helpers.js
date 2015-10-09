import uuid from 'uuid'
import { sendFactToServer } from './actions'
import { store } from './main'

const dateIsWeekend = (dateString) => { return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const lookUpUserIDByName = (name) => { return mapIdToName[name] }
export const UserAlreadyExist = (name) => { return !!lookUpUserIDByName(name) }

export const generateUnavailabilityFacts = (userID, date) => {
  // find replacement user and generate a swap with that info.
  const newUUID = uuid()
  const facts = [[ 'assert', newUUID, 'unavailability/user', userID ], [ 'assert', newUUID, 'unavailability/date', date ]]
  store.dispatch(sendFactToServer(facts, 'CREATE_UNAVAILABILITY'))
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

