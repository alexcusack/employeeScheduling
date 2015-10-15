// import uuid from 'uuid'
// import { pushToServer, pullFromServer } from './server_calls'

// const seedNames = ['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack', 'Sherry',
//  'Matte', 'Kevin', 'Kevin', 'Vicente', 'Zoe', 'Kevin',
//  'Matte', 'Zoe', 'Jay', 'Boris', 'Eadon', 'Sherry',
//  'Franky', 'Sherry', 'Matte', 'Franky', 'Franky', 'Kevin',
//  'Boris', 'Franky', 'Vicente', 'Luis', 'Eadon', 'Boris',
//  'Kevin', 'Matte', 'Jay', 'James', 'Kevin', 'Sherry',
//  'Sherry', 'Jack', 'Sherry', 'Jack']

// const unqiueNames = new Set(seedNames)
// const facts = []
// const mapNamesToIDs = {}

// unqiueNames.forEach((name) => {
//   let date = new Date
//   date = date.toISOString()
//   const id = uuid()
//   const entry = {
//     timestamp: date,
//     name: 'createUser',
//     facts: ['assert', id, 'user/name', name],
//   }
//   facts.push(entry)
//   mapNamesToIDs[name] = id
// })

// const weekend = (dateString) => { dateString = new Date(dateString); return dateString.getDay() === 6 || dateString.getDay() === 5 }

// function* assignmentDateGenerator (startDate) {
//   while (true) {
//     startDate.setDate(startDate.getDate() + 1)
//     while (weekend(startDate)) { startDate.setDate(startDate.getDate() + 1) }
//     yield startDate
//   }
// }

// const assignmentDate = assignmentDateGenerator(new Date('Sat Oct 10 2015 17:05:24 GMT-0700 (PDT)'))

// seedNames.forEach((name) => {
//   const date = (new Date).toISOString()
//   const id = uuid()
//   const newDay = new Date(assignmentDate.next().value)
//   const entry = {
//     timestamp: date,
//     name: 'createAssignment',
//     facts: [
//       ['assert', id, 'assignment/user', mapNamesToIDs[name]],
//       ['assert', id, 'assignment/date', newDay.toISOString().slice(0, 10)],
//     ],
//   }
//   facts.push(entry)
// })
// // console.log(facts)
// facts.forEach((fact) => pushToServer(fact))

