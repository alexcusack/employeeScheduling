import * as redux from 'redux'
import { loadNamesWithStartDate, createUser } from './actions'
import { readSeedNames, addUser, removeUser, createUnvailability } from './reducers'

const initialState = { dates: {}, users: {}, assignmentList: [] }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_SEED_NAMES') { return readSeedNames(action.names, action.startDate, state) }
  if (action.type === 'CREATE_NEW_USER') { return addUser(state, action.name) }
  if (action.type === 'REMOVE_USER') { return removeUser(state, action.name) }
  if (action.type === 'CREATE_UNAVAILABILITY') { return createUnvailability(state, name, date) }
  return state
}

const store = redux.createStore(dispatch)
store.dispatch(loadNamesWithStartDate('2015-10-16'))

const generateScheduleForCurrentMonth = (applicationState) => {
  console.log(applicationState)
}

store.dispatch(createUser('Alex'))
store.dispatch(createUser('Sherry'))

generateScheduleForCurrentMonth(store.getState())
