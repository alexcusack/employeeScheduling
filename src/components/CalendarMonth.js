import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from '../helpers'
import { Assignment } from './assignment'
import { DayOfMonth } from './DayOfMonth'
import { User } from './user'

export default class CalendarMonth extends React.Component {
  render () {
    // extract actions
    const { setCurrentUser, createUnavailability, startSwapAssignment, swapAssignment, setVisibilityFilter, changeMonth } = this.props.actions
    const todaysAssignment = this.props.assignments[this.props.assignmentsIDsByDate[this.props.todaysDate]]
    const todaysHero = (todaysAssignment) => { return todaysAssignment ? this.props.users[todaysAssignment.user] : 'loading' }.call(null, todaysAssignment)

    const userIDsAndNames = Object.keys(this.props.users).map((userID) => {
      return [userID, this.props.users[userID]]
    })

    const datesInMonth = (m, yyyy) => {
      const numberOfDays = getDaysOfMonth(m, yyyy)
      const dates = []
      for (let day = 1; day <= numberOfDays; ++day) { dates.push(new Date(yyyy, m, day)) }
      return dates
    }

    const datesWithAssignments = datesInMonth(this.props.calendarMonthYear[0], this.props.calendarMonthYear[1]).map((date) => {
      const referenceDate = date.toISOString().slice(0, 10)
      const assignmentID = this.props.assignmentsIDsByDate[referenceDate]
      let assignment = this.props.assignments[assignmentID]
      if (assignment) { assignment.assignmentID = assignmentID }
      if (this.props.visibilityFilter === 'currentUser' && assignment && assignment.user !== this.props.currentUserID) { assignment = null }
      return [date, assignment]
    })

    return (
      <div key={this.props.calendarMonthYear}>
        <div>
          <button onClick={changeMonth.bind(null, -1)} >PreviousMonth</button>
          <button onClick={changeMonth.bind(null, +1)} >NextMonth</button>
        </div>
        <div>Today's Hero: {todaysHero}</div>
        <div>
          <button onClick={setVisibilityFilter.bind(null, 'all')} >View all users</button>
          <button onClick={setVisibilityFilter.bind(null, 'currentUser')}>View selected user schedule</button>
        </div>

        <div className='userlist'>
          { userIDsAndNames.map(([id, name]) =>
            <User key={id} {...{id, name, setCurrentUser}}/>
          )}
      </div>
      <div>
        { datesWithAssignments.map(([date, assignment]) =>
          dateIsWeekend(date)
            ? <div className='weekend'><DayOfMonth calendarDate={date.toString()} /></div>
            : <div className='weekday'>
                <DayOfMonth key={date.toString()} calendarDate={date.toString()}>
                  {assignment &&
                  <Assignment
                  key={assignment.assignmentID}
                  assignmentID={assignment.assignmentID}
                  userID={assignment.user}
                  currentUserID={this.props.currentUserID}
                  date={assignment.date}
                  todaysDate={this.props.todaysDate}
                  userName={this.props.users[assignment.user]}
                  swapStarted={this.props.swapStarted}
                  swapAssignment={swapAssignment}
                  {... {createUnavailability, startSwapAssignment}}
                />}
               </DayOfMonth>
             </div>
        )}
      </div>
      </div>
    )
  }
}

