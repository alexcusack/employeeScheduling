import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from '../helpers'
import { Assignment } from './assignment'
import { DayOfMonth } from './DayOfMonth'
import { User } from './user'

export default class CalendarMonth extends React.Component {
  render () {
    console.log('calender month rendering')
    let todaysHero = {}
    // extract actions
    const { setCurrentUser, createUnavailability, swapAssignment, setVisibilityFilter } = this.props.actions

    const userIDsAndNames = Object.keys(this.props.users).map((userID) => {
      return [userID, this.props.users[userID]]
    })


    const datesInMonth = (m, yyyy) => {
      const numberOfDays = getDaysOfMonth(m, yyyy)
      const dates = []
      for (let day = 1; day <= numberOfDays; ++day) { dates.push(new Date(yyyy, m, day)) }
      return dates
    }

    const datesWithAssignments = datesInMonth(9, 2015).map((date) => {
      console.log('new assignmentNode')
      const displayDate = date.toISOString().slice(0, 10)
      const assignmentID = this.props.assignmentsIDsByDate[displayDate]
      let assignment = this.props.assignments[assignmentID]
      console.log(displayDate)
      if (assignment) { assignment.assignmentID = assignmentID }
      if (this.props.visibilityFilter === 'currentUser' && assignment && assignment.user !== this.props.currentUserID) { assignment = null }
      return [date, assignment]
    })


    return (
      <div>
        <div>
          <button onClick={ () => this.previousMonth()} >PreviousMonth</button>
          <button onClick={ () => this.NextMonth()} >NextMonth</button>
        </div>
        <div>Today's Hero: {this.props.users[todaysHero.user]}</div>
        <div>
          <button onClick={ () => this.viewAll()} >View all users</button>
          <button onClick={ () => this.viewCurrentUser()}>View selected user schedule</button>
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
            : <div className='weekday'><DayOfMonth calendarDate={date.toString()}>
                {assignment &&
                <Assignment
                assignmentID={assignment.assignmentID}
                userID={assignment.user}
                currentUserID={this.props.currentUserID}
                date={assignment.date}
                userObject={this.props.users[assignment.user]}
                {... {createUnavailability, swapAssignment}}
              />}
              </DayOfMonth></div>
        )}
      </div>
      </div>
    )
  }

  viewAll () {
    this.props.actions.setVisibilityFilter('all')
  }

  viewCurrentUser () {
    this.props.actions.setVisibilityFilter('currentUser')
  }

   viewCurrentUser () {
    this.props.actions.setVisibilityFilter('currentUser')
  }

  previousMonth () {
    //
  }

   NextMonth () {
    //
  }

}

