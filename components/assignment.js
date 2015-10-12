import React from 'react'

export class Assignment extends React.Component {
  render () {
    return this.props.userID === this.props.currentUserID ? (
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()} data-userid={this.props.userID}>
        {this.props.usersObject[this.props.userID]}
        <input type='checkbox'
              name='available'
              value='unavailable'
              onClick={e => this.updateAvailability(e)}
              unchecked
        >Unavailable</input>
        <button
              name='available'
              value='unavailable'
              onClick={e => this.startAssignmentSwap(e)}
              unchecked
        >Trade Day</button>
      </div>
    )
    : (
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()} data-userid={this.props.userID}>
        {this.props.usersObject[this.props.userID]}
        <button>Swap </button>
      </div>
    )
  }


  startAssignmentSwap (event) {
    event.preventDefault()
    // listen for next click on trade with and pull values from that.
  }

  updateAvailability (event) {
    this.props.createUnavailablity(this.props.userID, this.props.date)
    // event.target.checked ? this.props.createUnavailablity(this.props.userID, this.props.date)
      // : this.props.removeUnavailability(this.props.userID, this.props.date)
    // if (event.target.value === 'unava
  }
}

Assignment.propTypes = {
  userID: React.PropTypes.string.isRequired,
  currentUserID: React.PropTypes.string.isRequired,
  assignmentID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  usersObject: React.PropTypes.object.isRequired,
  createUnavailablity: React.PropTypes.func.isRequired,
  removeUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
}

