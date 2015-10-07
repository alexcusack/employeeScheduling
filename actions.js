import { getDate, loadSeedFacts } from './helpers'

export const loadNamesWithStartDate = (dateString) => {
  return {
    type: 'LOAD_SEED_NAMES',
    names: ['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack', 'Sherry',
     'Matte', 'Kevin', 'Kevin', 'Vicente', 'Zoe', 'Kevin',
     'Matte', 'Zoe', 'Jay', 'Boris', 'Eadon', 'Sherry',
     'Franky', 'Sherry', 'Matte', 'Franky', 'Franky', 'Kevin',
     'Boris', 'Franky', 'Vicente', 'Luis', 'Eadon', 'Boris',
     'Kevin', 'Matte', 'Jay', 'James', 'Kevin', 'Sherry',
     'Sherry', 'Jack', 'Sherry', 'Jack'],
    startDate: getDate(dateString),
  }
}

export const createAssignment = (currentFact, state) => {
  return {
    date: state.dates[currentFact[1]],
    assignedUser: currentFact[3],
    unavailabilitites: [],
  }
}


export const LOAD_SEED_NAMES = (names, startDate, state) => {
  const loadedSeed = loadSeedFacts(names, startDate)
  return Object.assign({}, state,
    loadedSeed.reduce((newState, currentFact) => {
      if (currentFact[2] === 'User/name') { newState.users[currentFact[1]] = currentFact[3] }
      if (currentFact[2] === 'assignment/Date') { newState.dates[currentFact[1]] = currentFact[3] }
      if (currentFact[2] === 'assignment/User') {
        newState.assignmentList.push(createAssignment(currentFact, newState))
      }
      return newState
    }, state)
  )
}
