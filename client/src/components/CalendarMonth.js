import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from '../helpers'
import { Assignment } from './assignment'
import { DayOfMonth } from './DayOfMonth'
import { User } from './user'

export default class CalendarMonth extends React.Component {
  render () {
    // extract actions
    const { setCurrentUser, createUnavailability, startSwapAssignment, swapAssignment, setVisibilityFilter, changeMonth } = this.props.actions
    const { assignments, users, assignmentsIDsByDate, calendarMonthYear, currentUserID, todaysDate, visibilityFilter } = this.props
    const todaysAssignment = assignments[assignmentsIDsByDate[todaysDate]]
    const todaysHero = (todaysAssignment) => { return todaysAssignment ? users[todaysAssignment.user] : 'loading' }.call(null, todaysAssignment)

    const userIDsAndNames = Object.keys(users).map((userID) => {
      return [userID, users[userID]]
    })

    const datesInMonth = (m, yyyy) => {
      const numberOfDays = getDaysOfMonth(m, yyyy)
      const dates = []
      for (let day = 1; day <= numberOfDays; ++day) { dates.push(new Date(yyyy, m, day)) }
      return dates
    }

    const datesWithAssignments = datesInMonth(calendarMonthYear[0], calendarMonthYear[1]).map((date) => {
      const referenceDate = date.toISOString().slice(0, 10)
      const assignmentID = assignmentsIDsByDate[referenceDate]
      let assignment = assignments[assignmentID]
      if (assignment) { assignment.assignmentID = assignmentID }
      if (visibilityFilter === 'currentUser' && assignment && assignment.user !== currentUserID) { assignment = null }
      return [date, assignment]
    })

    const fillerNodes = () => {
      const fillerNodes = []
      const dateString = new Date(datesWithAssignments[0])
      const nodeCount = dateString.getDay()
      for (let nodes = 0; nodes < nodeCount; ++nodes){fillerNodes.push(<div className='weekday'></div>)}
      return fillerNodes
    }.call()

    return (
      <div key={calendarMonthYear}>
        <div className='togglemonth'>
          <button onClick={changeMonth.bind(null, -1)} >Previous Month</button>
          <button onClick={changeMonth.bind(null, +1)} >Next Month</button>
        </div>
        <div className="todayshero">Today's Hero: {todaysHero}</div>
        <div className='filterView'>
          <button onClick={setVisibilityFilter.bind(null, 'all')} >View all users</button>
          <button onClick={setVisibilityFilter.bind(null, 'currentUser')}>View selected user's schedule</button>
        </div>

        <div className='userlist'>
          <span className='usernamekey'> Select a user: </span>
          { userIDsAndNames.map(([id, name]) =>

            <User key={id} {...{id, name, setCurrentUser}}/>
          )}
      </div>
      <div>
        {fillerNodes}
        {
          datesWithAssignments.map(([date, assignment]) =>
          dateIsWeekend(date) ? <div className='weekend'><DayOfMonth key={date.toString()} calendarDate={date.toString()}/></div>
           :<div className='weekday'>
              <DayOfMonth key={date.toString()} calendarDate={date.toString()}>
                {assignment &&
                <Assignment
                key={assignment.assignmentID}
                assignmentID={assignment.assignmentID}
                userID={assignment.user}
                currentUserID={currentUserID}
                date={assignment.date}
                todaysDate={todaysDate}
                userName={users[assignment.user]}
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

