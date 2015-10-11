import React from 'react'
import pullFromServer from './server_calls'
import store from './main'
import { getDaysOfMonth, dateIsWeekend } from './helpers'


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
        <div>{dayNodes}</div>
      </div>
    )
  }
}

class Assignment extends React.Component {
  render () {
    return (
      <div data-assignmentid={this.props.assignmentID.toString()}>{this.props.usersObject[this.props.userID]} {this.props.date}
        <input type="checkbox"
              name="available"
              value="unavailable"
              onClick={e => this.updateAvailability(e)}
              unchecked
            />
      </div>
      )
  }

  updateAvailability(event){
    debugger
    if (event.target.value === 'unavailable'){
      this.props.createUnavailablity(this.props.userID, this.props.date)
      event.target.value = 'available'
      // need to persist this on state change.
    } else {
      this.props.createUnavailablity(this.props.userID, this.props.date)
      event.target.value = 'unavailable'
    }

  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  usersObject: React.PropTypes.object.isRequired,
  createUnavailablity: React.PropTypes.func.isRequired,
  removeUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
}


class DayOfMonth extends React.Component {
  render () {
   return (<div className='dayOfMonth' data-date={this.props.calendarDate.toString()}>{this.props.calendarDate.toString().slice(0,15)}</div>)
  }
}