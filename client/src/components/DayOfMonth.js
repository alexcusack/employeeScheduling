import React from 'react'

export class DayOfMonth extends React.Component {
  render () {
    const { calendarDate, children } = this.props
    return (
      <div className='dayOfMonth' data-date={calendarDate.toString()}>
        {calendarDate.toString().slice(0, 15)}
        {children}
      </div>
    )
  }
}

DayOfMonth.propTypes = {
  calendarDate: React.PropTypes.string.isRequired,
}
