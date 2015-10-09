import uuid from 'uuid'

const dateIsWeekend = (dateString) => { return dateString.getDay() === 6 || dateString.getDay() === 0 }
export const getDate = (dateString) => { return new Date(Date.parse(dateString)) }
export const lookUpUserIDByName = (name) => { return mapIdToName[name] }
export const UserAlreadyExist = (name) => { return !!lookUpUserIDByName(name) }

export let mapIdToName = {} // better strategy for this?



