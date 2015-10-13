import React from 'react'

export class Assignment extends React.Component {
  render () {
    return this.props.userID === this.props.currentUserID ? (
      // assigned user is currrent user
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()} data-userid={this.props.userID}>
        Assignee: {this.props.usersObject[this.props.userID]}
        <button href='#' onClick={e => this.createUnavailability(e)}>I'm Unavailable</button>
        <button onClick={e => this.startAssignmentSwap(e)}>Trade Day</button>
      </div>
    )
    : (// assigned user is not currrent user
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()} data-userid={this.props.userID}>
        Assignee: {this.props.usersObject[this.props.userID]}
        <button className='swapWith'>Swap </button>
      </div>
    )
  }

  startAssignmentSwap (event) {
    event.preventDefault()
    // listen for next click on trade with and pull values from that.
  }

  createUnavailability () {
    this.props.createUnavailability(this.props.userID, this.props.assignmentID, this.props.date)
  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  currentUserID: React.PropTypes.string.isRequired,
  assignmentID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  usersObject: React.PropTypes.object.isRequired,
  createUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
  // removeUnavailability: React.PropTypes.func.isRequired,
}
