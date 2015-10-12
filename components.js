import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from './helpers'
import { Assignment } from './components/assignment'
import { DayOfMonth } from './components/DayOfMonth'
import { User } from './components/user'

// alex = "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0"
export default class CalendarMonth extends React.Component {
  render () {

    const userNodes = (usersOjbect) => {
      let nodes = []
      for (let userID in usersOjbect) {
        nodes.push( <User userid={userID} userName={usersOjbect[userID]} />)
      }
      return nodes
    }.call(null, this.props.users)

    const assignmentNodeMap = (assignmentsObject) => {
      let mapOfNodes = {}
      for (let assignment in assignmentsObject) {
        const newAssignment = <Assignment
            assignmentID={assignment}
            userID={assignmentsObject[assignment].user}
            currentUserID={this.props.currentUserID}
            date={assignmentsObject[assignment].date}
            usersObject={this.props.users}
            createUnavailablity={this.props.actions.createUnavailablity}
            removeUnavailability={this.props.actions.removeUnavailability}
            swapAssignment={this.props.actions.swapAssignment}
          />
        mapOfNodes[assignmentsObject[assignment].date] = newAssignment
      }
      return mapOfNodes
    }.call(null, this.props.assignments)


    const calendarDays = (m, yyyy) => {
      let nodes = []
      const days = getDaysOfMonth(m, yyyy)
      for (let day = 1; day <= days; ++day){
        let date = new Date(yyyy, m, day)
        if (dateIsWeekend(date)) { nodes.push(<div className='weekend'><DayOfMonth calendarDate={date} /></div>) }
        else {
          const displayDate = date.toISOString().slice(0,10)
          const assignment = assignmentNodeMap[displayDate]
          assignment ?
            nodes.push(<div className='weekday'><DayOfMonth calendarDate={date} assignment={assignment}/></div>)
          : nodes.push(<div className='weekday'><DayOfMonth calendarDate={date} /></div>)
        }
      }
      return nodes
    }.call(null, 9, 2015)


    return (
      <div>
        <div>{userNodes}</div>
        <div>{calendarDays}</div>
      </div>
    )
  }
}

