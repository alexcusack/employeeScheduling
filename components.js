import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from './helpers'
import { Assignment } from './components/assignment'
import { DayOfMonth } from './components/DayOfMonth'


export default class CalendarMonth extends React.Component {
  render () {

    const dayNodes = (m, yyyy) => {
      let nodes = []
      const days = getDaysOfMonth(m, yyyy)
      for (let day = 1; day <= days; ++day){
        const date = new Date(yyyy, m, day)
        dateIsWeekend(date) ?
          nodes.push(<div className='weekend'><DayOfMonth calendarDate={date} /></div>)
          : nodes.push(<div className='weekday'><DayOfMonth calendarDate={date} /></div>)
      }
      return nodes
    }.call(null, 9, 2015)

    const assignmentNodes = (assignmentsObject) => {
      let list = []
      console.log(this.props.actions)
      for (let assignment in assignmentsObject) {
        list.push(
          <Assignment
            assignmentID={assignment}
            userID={assignmentsObject[assignment].user}
            date={assignmentsObject[assignment].date}
            usersObject={this.props.users}
            createUnavailablity={this.props.actions.createUnavailablity}
            removeUnavailability={this.props.actions.removeUnavailability}
            swapAssignment={this.props.actions.swapAssignment}
          />
        )
      }
      return list
    }.call(null, this.props.assignments)


    return (
      <div>
        <div>{assignmentNodes}</div>
        <div></div>
        <div>{dayNodes}</div>
      </div>
    )
  }
}

