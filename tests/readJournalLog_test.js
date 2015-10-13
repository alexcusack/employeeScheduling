import * as reducers from '../reducers'
const initialState = { users: {}, assignments: {}, unavailabilities: {}, lastEntryDate: undefined }
const entries = { status: 200,
  updates:
   [ { id: 1,
       timestamp: '2015-10-08T00:00:00.000Z',
       name: 'createUser',
       facts: '[["assert","D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0","user/name","alex"]]' },
     { id: 2,
       timestamp: '2015-10-08T00:01:00.000Z',
       name: 'createAssignment',
       facts: '[["assert","95D131AF-62CC-4C68-8202-B970EBBCC977","assignment/user","D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0"],["assert","95D131AF-62CC-4C68-8202-B970EBBCC977","assignment/date","2015-10-08"]]' },
     { id: 3,
       timestamp: '2015-10-08T00:02:00.000Z',
       name: 'createUnavailability',
       facts: '[["assert","3791D856-DBB2-4715-9CDB-9098286476C9","unavailability/user","D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0"],["assert","3791D856-DBB2-4715-9CDB-9098286476C9","unavailability/date","2015-10-09"]]' },
     { id: 4,
       timestamp: '2015-10-08T00:03:00.000Z',
       name: 'removeUnavailability',
       facts: '[["retract","3791D856-DBB2-4715-9CDB-9098286476C9"]]' },
     { id: 5,
       timestamp: '2015-10-08T00:04:00.000Z',
       name: 'createUser',
       facts: '[["assert","4BF57F2A-67AE-4C3D-AF7C-5B240F47E006","user/name","myles"]]' },
     { id: 6,
       timestamp: '2015-10-08T00:05:00.000Z',
       name: 'createAssignment',
       facts: '[["assert","1A160698-EFE0-40E0-8300-233A9F5F2E4D","assignment/user","4BF57F2A-67AE-4C3D-AF7C-5B240F47E006"],["assert","1A160698-EFE0-40E0-8300-233A9F5F2E4D","assignment/date","2015-10-10"]]' },
     { id: 7,
       timestamp: '2015-10-08T00:06:00.000Z',
       name: 'swapAssignment',
       facts: '[["assert","95D131AF-62CC-4C68-8202-B970EBBCC977","assignment/user","4BF57F2A-67AE-4C3D-AF7C-5B240F47E006"],["assert","1A160698-EFE0-40E0-8300-233A9F5F2E4D","assignment/user","D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0"],["assert","06EC3D88-BA33-4151-8E87-97F025A8EACE","unavailability/user","D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0"],["assert","06EC3D88-BA33-4151-8E87-97F025A8EACE","unavailability/date","2015-10-08"]]' } ],
  lastEntry: '2015-10-08 00:06:00 UTC' }
const actualState = reducers.readJournal(entries, initialState)
const expectedState = { users:
   { 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0': 'alex',
     '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006': 'myles' },
  assignments:
   { '95D131AF-62CC-4C68-8202-B970EBBCC977':
      { date: '2015-10-08',
        user: '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006' },
     '1A160698-EFE0-40E0-8300-233A9F5F2E4D':
      { date: '2015-10-10',
        user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } },
  unavailabilities:
   { '06EC3D88-BA33-4151-8E87-97F025A8EACE':
      { date: '2015-10-08',
        user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } },
  lastEntryDate: '2015-10-08 00:06:00 UTC' }

console.log('read full journal success?:', Object.is(JSON.stringify(actualState), JSON.stringify(expectedState)))








// // "facts" => [     #  alex assignment                                             myles uID
// //       ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006" ],
// //       ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
// //       ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
// //       ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/date", "2015-10-08" ],
// //     ]

// // const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"}]
// // const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"},{"id":4,"timestamp":"2015-10-08T17:54:28.345Z","name":"createUnavailability","facts":"[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]","created_at":"2015-10-08T17:54:29.899Z","updated_at":"2015-10-08T17:54:29.899Z"}]
// // const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"},{"id":4,"timestamp":"2015-10-08T17:54:28.345Z","name":"createUnavailability","facts":"[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]","created_at":"2015-10-08T17:54:29.899Z","updated_at":"2015-10-08T17:54:29.899Z"},{"id":5,"timestamp":"2015-10-08T18:03:51.816Z","name":"removeUnavailability","facts":"[[\"retract\",\"3791D856-DBB2-4715-9CDB-9098286476C9\"]]","created_at":"2015-10-08T18:03:54.264Z","updated_at":"2015-10-08T18:03:54.264Z"}]
// const sampleState = { users: {}, assignments: {}, unavailabilities: {} }

// const sampleSeed = [
//   {
//     "id": 1,
//     "timestamp": "2015-10-08T00:00:00.000Z",
//     "name": "createUser",
//     "facts": "[[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]]"
//   },
//   {
//     "id": 2,
//     "timestamp": "2015-10-08T00:01:00.000Z",
//     "name": "createAssignment",
//     "facts": "[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]"
//   },
//   {
//     "id": 3,
//     "timestamp": "2015-10-08T00:02:00.000Z",
//     "name": "createUnavailability",
//     "facts": "[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]"
//   },
//   {
//     "id": 4,
//     "timestamp": "2015-10-08T00:03:00.000Z",
//     "name": "removeUnavailability",
//     "facts": "[[\"retract\",\"3791D856-DBB2-4715-9CDB-9098286476C9\"]]"
//   },
//   {
//     "id": 5,
//     "timestamp": "2015-10-08T00:04:00.000Z",
//     "name": "createUser",
//     "facts": "[[\"assert\",\"4BF57F2A-67AE-4C3D-AF7C-5B240F47E006\",\"user/name\",\"myles\"]]"
//   },
//   {
//     "id": 6,
//     "timestamp": "2015-10-08T00:05:00.000Z",
//     "name": "createAssignment",
//     "facts": "[[\"assert\",\"1A160698-EFE0-40E0-8300-233A9F5F2E4D\",\"assignment/user\",\"4BF57F2A-67AE-4C3D-AF7C-5B240F47E006\"],[\"assert\",\"1A160698-EFE0-40E0-8300-233A9F5F2E4D\",\"assignment/date\",\"2015-10-10\"]]"
//   },
//   {
//     "id": 7,
//     "timestamp": "2015-10-08T00:06:00.000Z",
//     "name": "swapAssignment",
//     "facts": "[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"4BF57F2A-67AE-4C3D-AF7C-5B240F47E006\"],[\"assert\",\"1A160698-EFE0-40E0-8300-233A9F5F2E4D\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"06EC3D88-BA33-4151-8E87-97F025A8EACE\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"06EC3D88-BA33-4151-8E87-97F025A8EACE\",\"unavailability/date\",\"2015-10-08\"]]"
//   }
// ]


// const actual = readJournal(sampleSeed, sampleState)

// const expected = { users:
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


// console.log(Object.is(actual, expected))