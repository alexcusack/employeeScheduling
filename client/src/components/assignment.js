import React from 'react'

export class Assignment extends React.Component {
  render () {
    const { startSwapAssignment, swapAssignment, createUnavailability, userID, currentUserID, userName, assignmentID, date, swapStarted, todaysDate, key } = this.props
    return userID === currentUserID /* assigned user is current user */ && date > todaysDate ? (
      <div key={key} className='assignmentNode' data-assignmentid={assignmentID.toString()} data-userid={userID}>
        Assignee: {this.props.userName}
        <button onClick={createUnavailability.bind(null, userID, assignmentID, date, store.getState())}>I'm Unavailable</button>
        <button onClick={startSwapAssignment.bind(null, userID, assignmentID, date, store.getState())}>Trade Day</button>
      </div>
    )
    : (// assigned user is not currrent user
      <div key={key} className='assignmentNode' data-assignmentid={assignmentID.toString()} data-userid={userID}>
        {/* display swap options view? */swapStarted ?
          <div onClick={swapAssignment.bind(null, swapStarted.assignmentID, assignmentID, swapStarted.userID, userID, store.getState())}>
            {'Trade with ' + userName}
          </div>
          : 'Assignee ' + userName}
      </div>
   )
  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  assignmentID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  todaysDate: React.PropTypes.string.isRequired,
  createUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
}
