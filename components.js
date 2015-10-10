import React from 'react'
import pullFromServer from './server_calls'
import store from './main'
export default class CalendarMonth extends React.Component {

  render () {
    const assignmentNodes = (assignmentsObject) => {
      let list = []
      console.log(this.props.actions)
      for (let assignment in assignmentsObject) {
        list.push(
          <Assignment
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
        <div>{assignmentNodes}</div>
    )
  }
}

class Assignment extends React.Component {
  render () {
    return (
      <div>
        <div>{this.props.usersObject[this.props.userID]} {this.props.date}</div>
        <button onClick={this.newUnavailability()}></button>
      </div>
      )
  }

  newUnavailability(){
    this.props.createUnavailablity(this.props.userID, this.props.date)
  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  usersObject: React.PropTypes.object.isRequired,
  createUnavailablity: React.PropTypes.func.isRequired,
  removeUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
};