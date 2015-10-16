import React from 'react'

export class DayOfMonth extends React.Component {
  render () {
    const { calendarDate, children, key } = this.props
    return (
      <div key={key} className='dayOfMonth' data-date={calendarDate.toString()}>
        {calendarDate.toString().slice(0, 15)}
        {children}
      </div>
    )
  }
}

DayOfMonth.propTypes = {
  calendarDate: React.PropTypes.string.isRequired,
  children: React.PropTypes.array,
}
