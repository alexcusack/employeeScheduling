import uuid from 'uuid'

const dateIsWeekend = (dateString) => { return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const lookUpUserIDByName = (name) => { return mapIdToName[name] }
export const UserAlreadyExist = (name) => { return !!lookUpUserIDByName(name) }

export let mapIdToName = {} // better strategy for this?






// export const loadSeedFacts = (journalEntries) => {
//   // let currentDate = date
//   let facts = []
//   // const uniqueNames = new Set(names)

//   // /* todo seed holiday */
//   // uniqueNames.forEach((name) => {
//   //   const entityID = uuid()
//   //   facts.push(['assert', entityID, 'User/name', name])
//   //   mapIdToName[name] = entityID
//   // })
//   for (entry of journalEntries){
//     facts.push(entry.facts)
//   }

//   // names.forEach((name) => {
//   //   const assignmentID = uuid()
//   //   while (dateIsWeekend(currentDate)) { currentDate.setDate(currentDate.getDate() + 1) }
//   //   facts.push(['assert', assignmentID, 'assignment/Date', currentDate.toString()])
//   //   facts.push(['assert', assignmentID, 'assignment/User', mapIdToName[name]])
//   //   currentDate.setDate(currentDate.getDate() + 1)
//   // })
//   console.log(facts)
//   return facts
// }
