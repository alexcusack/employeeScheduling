import * as redux from 'redux'
import { loadNamesWithStartDate, readSeedNames } from './actions'

const initialState = { dates: {}, users: {}, assignmentList: [] }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_SEED_NAMES') { return readSeedNames(action.names, action.startDate, state) }
  return state
}

const store = redux.createStore(dispatch)
store.dispatch(loadNamesWithStartDate('2015-10-16'))

const generateScheduleForCurrentMonth = (applicationState) => {
  console.log(applicationState)
}

generateScheduleForCurrentMonth(store.getState())
