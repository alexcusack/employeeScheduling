import * as redux from 'redux'
import uuid from 'uuid'

const dispatch = (state = {}, action) => {
  if (action.type === 'LOAD_SEED_NAMES') {
    const loadedSeed = loadSeedNameFacts(action.names, action.startDate)

    state = Object.assign({}, state, {
      users: createUsersSet(loadedSeed),
    })
    state = Object.assign({}, state, {
      dates: createDates(loadedSeed),
    })
    // state = Object.assign({}, state, {
      // holidays: //,
    // })
    state = Object.assign({}, state, {
      assignments: mapUserAssignments(loadedSeed, state),
    })
    // state = Object.assign({}, state, {
      // unavailabilitites: //,
    // })
  }

  /* build state */
  console.log(state)
  return state
}

const createUsersSet = (loadedSeed) => {
  return loadedSeed.reduce((userMap, currentFact) => {
    if (currentFact[2] === 'User/name') { userMap[currentFact[1]] = currentFact[3] }
    return userMap
  }, {})
}

const createDates = (loadedSeed) => {
  return loadedSeed.reduce((listOfDates, currentFact) => {
    if (currentFact[2] === 'assignment/Date') { listOfDates[currentFact[1]] = currentFact[3] }
    return listOfDates
  }, {})
}

const mapUserAssignments = (loadedSeed, state) => {
  return loadedSeed.reduce((assignmentList, currentFact) => {
    if (currentFact[2] === 'assignment/User') {
      assignmentList.push(
        {
          date: state.dates[currentFact[1]],
          assignedUser: currentFact[3],
          unavailabilitites: [],
        })
    }
    return assignmentList
  }, [])
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
  // [ // list of dates
  //   {
  //     date: Date.parse(2015-10-16),
  //     assignedUser: 'FC5706BE-6B22-488A-B492-AF0B0C98966E',
  //     unavailability: [/* Users */ ],
  //     holiday: [/* Holidays UUIDs */]
  //   }
  // ]
}

// const currentSchedule = scheduleForCurrentMonth(store.getState())
// console.log(currentSchedule)
