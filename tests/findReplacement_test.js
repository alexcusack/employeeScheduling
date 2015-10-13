import { sampleState } from '../sampleState'
// console.log(sampleState)

const getUnavailabilities = (date) => {
  let set = {}
  for (let unavailability in sampleState.unavailabilities) {
    const thisUnavailability = sampleState.unavailabilities[unavailability]
    if (thisUnavailability.date === date) { set[thisUnavailability.user] = true }
  }
  return set
}

const findRepalcement = (userID, date) => {
  const unavailabilitities = getUnavailabilities(date)
  for (let assignment in sampleState.assignments) {
    const thisAssignment = sampleState.assignments[assignment]
    if (new Date(thisAssignment.date) > new Date(date)) {
      if (!unavailabilitities[thisAssignment.user]) { return [assignment, thisAssignment.user] }
    }
  }
}

console.log(findRepalcement("7bd233f7-c0e4-43df-890c-a0dd10621cff", "2015-10-08"))
