import React from 'react'

export class Assignment extends React.Component {
  render () {
    const { startSwapAssignment, swapAssignment, createUnavailability } = this.props
    return this.props.userID === this.props.currentUserID && this.props.date > this.props.todaysDate ? (
      // assigned user is currrent user
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()} data-userid={this.props.userID}>
        Assignee: {this.props.userName}
        <button onClick={createUnavailability.bind(null, this.props.userID, this.props.assignmentID, this.props.date)}>I'm Unavailable</button>
        <button onClick={startSwapAssignment.bind(null, this.props.userID, this.props.assignmentID, this.props.date)}>Trade Day</button>
      </div>
    )
    : (// assigned user is not currrent user
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()} data-userid={this.props.userID}>
        {this.props.swapStarted ? /*display swap options view? */
          <div onClick={swapAssignment.bind(null, this.props.swapStarted.assignmentID, this.props.assignmentID, this.props.swapStarted.userID, this.props.userID)}>
            {'Trade with ' + this.props.userName}
          </div>
          : 'Assignee ' + this.props.userName}
        <button className='swapWith'>Swap </button>
      </div>
   )
  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  currentUserID: React.PropTypes.string.isRequired,
  assignmentID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  createUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
}
