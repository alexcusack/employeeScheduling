import React from 'react'

export class Assignment extends React.Component {
  render () {
    const { startSwapAssignment, swapAssignment, createUnavailability, userID, currentUserID, userName, assignmentID, date, swapStarted, todaysDate } = this.props
    return userID === currentUserID /* assigned user is current user */ && date > todaysDate ? (
      <div className='assignmentNode' data-assignmentid={assignmentID.toString()} data-userid={userID}>
        Assignee: {this.props.userName}
        <button onClick={createUnavailability.bind(null, userID, assignmentID, date)}>I'm Unavailable</button>
        <button onClick={startSwapAssignment.bind(null, userID, assignmentID, date)}>Trade Day</button>
      </div>
    )
    : (// assigned user is not currrent user
      <div className='assignmentNode' data-assignmentid={assignmentID.toString()} data-userid={userID}>
        {swapStarted ? /*display swap options view? */
          <div onClick={swapAssignment.bind(null, swapStarted.assignmentID, assignmentID, swapStarted.userID, userID)}>
            {'Trade with ' + userName}
          </div>
          : 'Assignee ' + userName}
      </div>
   )
  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  currentUserID: React.PropTypes.string.isRequired,
  assignmentID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  todaysDate: React.PropTypes.string.isRequired,
  createUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
}
