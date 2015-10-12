import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from './helpers'
import { Assignment } from './components/assignment'
import { DayOfMonth } from './components/DayOfMonth'


export default class CalendarMonth extends React.Component {
  render () {

    const assignmentMap = {}

    const assignmentNodes = (assignmentsObject) => {
      let list = []
      console.log(this.props.actions)
      for (let assignment in assignmentsObject) {
        const newAssignment = <Assignment
            assignmentID={assignment}
            userID={assignmentsObject[assignment].user}
            date={assignmentsObject[assignment].date}
            usersObject={this.props.users}
            createUnavailablity={this.props.actions.createUnavailablity}
            removeUnavailability={this.props.actions.removeUnavailability}
            swapAssignment={this.props.actions.swapAssignment}
          />
        assignmentMap[assignmentsObject[assignment].date] = newAssignment
      }
      return list
    }.call(null, this.props.assignments)

    const dayNodes = (m, yyyy) => {
      let nodes = []
      const days = getDaysOfMonth(m, yyyy)
      for (let day = 1; day <= days; ++day){
        let date = new Date(yyyy, m, day)
        if (dateIsWeekend(date)) { nodes.push(<div className='weekend'><DayOfMonth calendarDate={date} /></div>) }
        else {
          const displayDate = date.toISOString().slice(0,10)
          const assignment = assignmentMap[displayDate]
          assignment ?
            nodes.push(<div className='weekday'><DayOfMonth calendarDate={date} assignment={assignment}/></div>)
          : nodes.push(<div className='weekday'><DayOfMonth calendarDate={date} /></div>)
        }
      }
      return nodes
    }.call(null, 9, 2015)


    return (
      <div>
        <div>{assignmentNodes}</div>
        <div>{dayNodes}</div>
      </div>
    )
  }
}

