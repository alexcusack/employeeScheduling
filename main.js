import * as redux from 'redux'
import uuid from 'uuid'

const dispatch = (state = {}, action) => {
  if (action.type === 'LOAD_SEED_NAMES') {
    const loadedSeed = loadSeedNameFacts(action.names, action.startDate)
    /* build state */
    return Object.assign({}, state,
      loadedSeed.reduce((newState, currentFact) => {
        if (currentFact[2] === 'User/name') { newState.users[currentFact[1]] = currentFact[3] }
        if (currentFact[2] === 'assignment/Date') { newState.dates[currentFact[1]] = currentFact[3] }
        if (currentFact[2] === 'assignment/User') {
          newState.assignmentList.push(generateAssignment(currentFact, newState))
        }
        return newState
      }, { dates: {}, users: {}, assignmentList: [] })
    )
  }
  return state
}

const generateAssignment = (currentFact, state) => {
  return {
    date: state.dates[currentFact[1]],
    assignedUser: currentFact[3],
    unavailabilitites: [],
  }
}

const loadSeedNameFacts = (names, date) => {
  let currentDate = date
  let facts = []
  let mapIdToName = {}
  const uniqueNames = new Set(names)

  /* todo seed holiday */
  uniqueNames.forEach((name) => {
    const entityID = uuid()
    facts.push(['assert', entityID, 'User/name', name])
    mapIdToName[name] = entityID
  })

  names.forEach((name) => {
    const assignmentID = uuid()
    while (dateIsWeekend(currentDate)) { currentDate.setDate(currentDate.getDate() + 1) }
    facts.push(['assert', assignmentID, 'assignment/Date', currentDate])
    facts.push(['assert', assignmentID, 'assignment/User', mapIdToName[name]])
    currentDate.setDate(currentDate.getDate() + 1)
  })
  return facts
}

const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
const dateIsWeekend = (dateString) => { return dateString.getDay() === 6 || dateString.getDay() === 0 }

const store = redux.createStore(dispatch)

store.dispatch({
  type: 'LOAD_SEED_NAMES', // THE COMMAND
  names: ['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack', 'Sherry',
   'Matte', 'Kevin', 'Kevin', 'Vicente', 'Zoe', 'Kevin',
   'Matte', 'Zoe', 'Jay', 'Boris', 'Eadon', 'Sherry',
   'Franky', 'Sherry', 'Matte', 'Franky', 'Franky', 'Kevin',
   'Boris', 'Franky', 'Vicente', 'Luis', 'Eadon', 'Boris',
   'Kevin', 'Matte', 'Jay', 'James', 'Kevin', 'Sherry',
   'Sherry', 'Jack', 'Sherry', 'Jack'],
  startDate: getDate('2015-10-16'),
})

const generateScheduleForCurrentMonth = (applicationState) => {
  console.log(applicationState)
}

// const currentSchedule = generateScheduleForCurrentMonth(store.getState())
// console.log(currentSchedule)
generateScheduleForCurrentMonth(store.getState())