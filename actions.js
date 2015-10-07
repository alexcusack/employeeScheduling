import { getDate } from './helpers'

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

export const createUser = (name) => {
  return {
    type: 'CREATE_NEW_USER',
    name: name,
  }
}

export const removeUser = (name) => {
  return {
    type: 'REMOVE_USER',
    name: name,
  }
}
