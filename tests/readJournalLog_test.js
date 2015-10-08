
const readJournalLog = (journalEntries, state) => {
  // const loadedFacts = loadSeedFacts(journalEntries) /// this is replaced with pulling facts directly from server
  let newState = Object.assign({}, state)
  // return Object.assign({}, state,
  for (let entry of journalEntries) {
    if (entry.name === 'createUser') {
      let currentFact = JSON.parse(entry.facts)
      newState.users[currentFact[1]] = currentFact[3]
    }
    if (entry.name === 'createAssignment') {
      let userAssignment = JSON.parse(entry.facts)[0]
      let dateAssignment = JSON.parse(entry.facts)[1]
      newState.assignments[userAssignment[1]] = { date: dateAssignment[3], user: userAssignment[3] }
    }

    if (entry.name === 'createUnavailability') {
      let userUnavailability = JSON.parse(entry.facts)[0]
      let dateUnavailability = JSON.parse(entry.facts)[1]
      newState.unavailabilities[userUnavailability[1]] = { date: dateUnavailability[3], user: userUnavailability[3] }
      // remove user from assigned date
    }

    if (entry.name === 'removeUnavailability') {
      let currentFact = JSON.parse(entry.facts)[0]
      delete newState.unavailabilities[currentFact[1]]
    }
  }
  return newState
}

// const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"}]
// const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"},{"id":4,"timestamp":"2015-10-08T17:54:28.345Z","name":"createUnavailability","facts":"[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]","created_at":"2015-10-08T17:54:29.899Z","updated_at":"2015-10-08T17:54:29.899Z"}]
const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"},{"id":4,"timestamp":"2015-10-08T17:54:28.345Z","name":"createUnavailability","facts":"[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]","created_at":"2015-10-08T17:54:29.899Z","updated_at":"2015-10-08T17:54:29.899Z"},{"id":5,"timestamp":"2015-10-08T18:03:51.816Z","name":"removeUnavailability","facts":"[[\"retract\",\"3791D856-DBB2-4715-9CDB-9098286476C9\"]]","created_at":"2015-10-08T18:03:54.264Z","updated_at":"2015-10-08T18:03:54.264Z"}]
const sampleState = {users: {}, assignments: {}, unavailabilities: {} }
// console.log(readSeedNames(exampleFactList, sampleState))

console.log(readJournalLog(exampleFactList, sampleState))
