import React from 'react'

export class DayOfMonth extends React.Component {
  render () {
    return (<div className='dayOfMonth' data-date={this.props.calendarDate.toString()}>{this.props.calendarDate.toString().slice(0,15)}</div>)
  }
}

DayOfMonth.propTypes = {
  calendarDate: React.PropTypes.string.isRequired,
}
