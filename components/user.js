import React from 'react'


export class User extends React.Component {
  render () {
    return (
      <div data-userid={this.props.userid} onClick={e => this.chooseUser(e)}>
        {this.props.userName}
      </div>
    )
  }

  chooseUser (event) {
    const userId = event.target.getAttribute('data-userid')
  }
}

User.propTypes = {
  userName: React.PropTypes.string.isRequired,
  userid: React.PropTypes.string.isRequired,
}
