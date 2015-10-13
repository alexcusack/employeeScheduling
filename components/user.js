import React from 'react'

export class User extends React.Component {
  render () {
    console.log('user created')
    return (
      <div data-userid={this.props.userid} onClick={e => this.props.setCurrentUser(e.target.getAttribute('data-userid'))}>
        {this.props.userName}
      </div>
    )
  }
}

User.propTypes = {
  userName: React.PropTypes.string.isRequired,
  userid: React.PropTypes.string.isRequired,
}
