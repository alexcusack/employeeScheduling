import React from 'react'

export class Assignment extends React.Component {
  render () {
    return (
      <div className='assignmentNode' data-assignmentid={this.props.assignmentID.toString()}>
        {this.props.usersObject[this.props.userID]}
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
    this.props.createUnavailablity(this.props.userID, this.props.date)
    // event.target.checked ? this.props.createUnavailablity(this.props.userID, this.props.date)
      // : this.props.removeUnavailability(this.props.userID, this.props.date)
    // if (event.target.value === 'unava
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

