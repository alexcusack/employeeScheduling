import * as redux from 'redux'
import { loadNamesWithStartDate, LOAD_SEED_NAMES } from './actions'

const initialState = { dates: {}, users: {}, assignmentList: [] }

const dispatch = (state = initialState, action) => {
  if (action.type === 'LOAD_SEED_NAMES') {
    return LOAD_SEED_NAMES(action.names, action.startDate, state)
  }
  return state
}

const store = redux.createStore(dispatch)

store.dispatch(loadNamesWithStartDate('2015-10-16'))

const generateScheduleForCurrentMonth = (applicationState) => {
  console.log(applicationState)
}

// const currentSchedule = generateScheduleForCurrentMonth(store.getState())
// console.log(currentSchedule)
generateScheduleForCurrentMonth(store.getState())