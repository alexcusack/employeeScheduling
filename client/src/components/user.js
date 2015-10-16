import React from 'react'

export class User extends React.Component {
  render () {
    const { id, name, setCurrentUser } = this.props
    return (
      <div className='username' onClick={setCurrentUser.bind(null, id)}>
        {name}
      </div>
    )
  }
}

User.propTypes = {
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  setCurrentUser: React.PropTypes.func.isRequired,
}
