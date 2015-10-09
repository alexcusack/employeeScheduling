import React from 'react'

export class CalendarMonth extends React.Component {
  render () {
    console.log(this.props)
    return <div> Calendar { Object.keys(this.props.users) } </div>
  }
}
