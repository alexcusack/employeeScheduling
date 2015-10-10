import React from 'react'
// import PureComponent from 'react-pure-render/component'
import pullFromServer from './server_calls'
import store from './main'

export default class CalendarMonth extends React.Component {

  render () {
    const assignmentNodes = (assignmentsObject) => {
      let list = []
      for (let assignment in assignmentsObject) {
        list.push(
          <Assignment
            userName={assignmentsObject[assignment].user}
            date={assignmentsObject[assignment].date}
            usersObject={this.props.users}
          />
        )
      }
      return list
    }.call(null, this.props.assignments)

    console.log(assignmentNodes)
    return (
      <div>{assignmentNodes}</div>
    )
  }
}

class Assignment extends React.Component {
  render () {
    return (
      <div>{this.props.usersObject[this.props.userName]} {this.props.date}</div>
      )
  }
}