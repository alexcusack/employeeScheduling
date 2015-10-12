import React from 'react'

export class Assignment extends React.Component {
  render () {
    return (
      <div data-assignmentid={this.props.assignmentID.toString()}>{this.props.usersObject[this.props.userID]} {this.props.date}
        <input type='checkbox'
              name='available'
              value='unavailable'
              onClick={e => this.updateAvailability(e)}
              unchecked
            />
      </div>
      )
  }

  updateAvailability (event) {
    if (event.target.value === 'unavailable') {
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
  assignmentID: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  usersObject: React.PropTypes.object.isRequired,
  createUnavailablity: React.PropTypes.func.isRequired,
  removeUnavailability: React.PropTypes.func.isRequired,
  swapAssignment: React.PropTypes.func.isRequired,
}

