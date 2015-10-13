import React from 'react'
import { getDaysOfMonth, dateIsWeekend } from '../helpers'
import { Assignment } from './assignment'
import { DayOfMonth } from './DayOfMonth'
import { User } from './user'





export default class CalendarMonth extends React.Component {
  render () {

    // extract actions
    const {setCurrentUser} = this.props.actions

    const userIDsAndNames = Object.keys(this.props.users).map((userID) => {
      return [userID, this.props.users[userID]]
    })

    let todaysHero = {}


    const assignmentNodeMap = (assignmentsObject) => {
      let mapOfNodes = {}
      if (this.props.visibilityFilter === 'all'){
        for (let assignment in assignmentsObject) {
          if(assignmentsObject[assignment].date === this.props.todaysDate) { todaysHero = assignmentsObject[assignment]}
          const newAssignment = <Assignment
              assignmentID={assignment}
              userID={assignmentsObject[assignment].user}
              currentUserID={this.props.currentUserID}
              date={assignmentsObject[assignment].date}
              usersObject={this.props.users}
              createUnavailability={this.props.actions.createUnavailability}
              removeUnavailability={this.props.actions.removeUnavailability}
              swapAssignment={this.props.actions.swapAssignment}
            />
          mapOfNodes[assignmentsObject[assignment].date] = newAssignment
        }
      } else { // this.props.visibilityFilter = 'currentUser'
        for (let assignment in assignmentsObject) {
          if(assignmentsObject[assignment].date === this.props.todaysDate) { todaysHero = assignmentsObject[assignment]}
          if (assignmentsObject[assignment].user === this.props.currentUserID){
            const newAssignment = <Assignment
                assignmentID={assignment}
                userID={assignmentsObject[assignment].user}
                currentUserID={this.props.currentUserID}
                date={assignmentsObject[assignment].date}
                usersObject={this.props.users}
                createUnavailability={this.props.actions.createUnavailability}
                removeUnavailability={this.props.actions.removeUnavailability}
                swapAssignment={this.props.actions.swapAssignment}
              />
            mapOfNodes[assignmentsObject[assignment].date] = newAssignment
          }
        }
      }
      return mapOfNodes
    }.call(null, this.props.assignments)


    const calendarDays = (m, yyyy) => {
      let nodes = []
      const days = getDaysOfMonth(m, yyyy)
      for (let day = 1; day <= days; ++day){
        let date = new Date(yyyy, m, day)
        if (dateIsWeekend(date)) { nodes.push(<div className='weekend'><DayOfMonth calendarDate={date.toString()} /></div>) }
        else {
          const displayDate = date.toISOString().slice(0,10)
          const assignment = assignmentNodeMap[displayDate]
          assignment ?
            nodes.push(<div className='weekday'><DayOfMonth calendarDate={date.toString()} assignment={assignment}/></div>)
          : nodes.push(<div className='weekday'><DayOfMonth calendarDate={date.toString()} /></div>)
        }
      }
      return nodes
    }.call(null, 9, 2015)


    return (
      <div>
        <div>
          <button onClick={e => this.previousMonth()} >PreviousMonth</button>
          <button onClick={e => this.NextMonth()} >NextMonth</button>
        </div>
        <div>Today's Hero: {this.props.users[todaysHero.user]}</div>
        <div>
          <button onClick={e => this.viewAll()} >View all users</button>
          <button onClick={e => this.viewCurrentUser()}>View selected user schedule</button>
        </div>

        <div className="userlist">
          { userIDsAndNames.map(([id, name]) =>
            <User key={id} {...{id, name, setCurrentUser}}/>
          )}
      </div>
        <div>{calendarDays}</div>
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

