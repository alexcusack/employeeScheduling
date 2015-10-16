import uuid from 'uuid'
// import { pushToServer, pullFromServer } from './server_calls'

const seedNames = ['Sherry', 'Boris', 'Vicente', 'Matte', 'Jack', 'Sherry',
 'Matte', 'Kevin', 'Kevin', 'Vicente', 'Zoe', 'Kevin',
 'Matte', 'Zoe', 'Jay', 'Boris', 'Eadon', 'Sherry',
 'Franky', 'Sherry', 'Matte', 'Franky', 'Franky', 'Kevin',
 'Boris', 'Franky', 'Vicente', 'Luis', 'Eadon', 'Boris',
 'Kevin', 'Matte', 'Jay', 'James', 'Kevin', 'Sherry',
 'Sherry', 'Jack', 'Sherry', 'Jack']

const unqiueNames = new Set(seedNames)
const entries = []
const mapNamesToIDs = {}

unqiueNames.forEach((name) => {
  let date = new Date
  date = date.toISOString()
  const id = uuid()
  const entry = {
    timestamp: date,
    name: 'createUser',
    facts: ['assert', id, 'user/name', name],
  }
  entries.push(entry)
  mapNamesToIDs[name] = id
})

const weekendOrHoliday = (dateString) => {
  dateString = new Date(dateString)
  if (dateString.getDay() === 6 || dateString.getDay() === 0) { return true }
  dateString = dateString.toISOString()
  if (dateString === new Date('January 1, 2015').toISOString()) { return true }
  if (dateString === new Date('January 19, 2015').toISOString()) { return true }
  if (dateString === new Date('February 16, 2015').toISOString()) { return true }
  if (dateString === new Date('March 31, 2015').toISOString()) { return true }
  if (dateString === new Date('May 25, 2015').toISOString()) { return true }
  if (dateString === new Date('July 4, 2015').toISOString()) { return true }
  if (dateString === new Date('September 7, 2015').toISOString()) { return true }
  if (dateString === new Date('November 11, 2015').toISOString()) { return true }
  if (dateString === new Date('November 26, 2015').toISOString()) { return true }
  if (dateString === new Date('November 27, 2015').toISOString()) { return true }
  if (dateString === new Date('December 25, 2015').toISOString()) { return true }
  return false
}

function* assignmentDateGenerator (startDate) {
  while (true) {
    startDate.setDate(startDate.getDate() + 1)
    while (weekendOrHoliday(startDate)) { startDate.setDate(startDate.getDate() + 1) }
    yield startDate
  }
}

const assignmentDate = assignmentDateGenerator(new Date('Sat Oct 10 2015'))

seedNames.forEach((name) => {
  const date = (new Date).toISOString()
  const id = uuid()
  const newDay = new Date(assignmentDate.next().value)
  const entry = {
    timestamp: date,
    name: 'createAssignment',
    facts: [
      ['assert', id, 'assignment/user', mapNamesToIDs[name]],
      ['assert', id, 'assignment/date', newDay.toISOString().slice(0, 10)],
    ],
  }
  entries.push(entry)
})
// entries.forEach((entry) => pushToServer(entry))
// entries.forEach((entry) => console.log(JSON.stringify(entry)))
console.log(JSON.stringify(entries, null, 2))
