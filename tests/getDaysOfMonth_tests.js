import { addUser } from '../reducers'
export const getDaysOfMonth = (m, yyyy) => { return new Date(yyyy, m, 0).getDate() }

console.log(getDaysOfMonth(10, 2015) === 31)
console.log(getDaysOfMonth(2, 2015) === 28)
console.log(getDaysOfMonth(2, 2016) === 29)
