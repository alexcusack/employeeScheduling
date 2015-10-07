
export const reduceSeedName = (names, startDate, state) => {
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
