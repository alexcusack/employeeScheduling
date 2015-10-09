import React from 'react'


export class CalendarMonth extends React.Component {
  render () {
    console.log('top of calendar')
      return <Assignment assignments={this.props.assignments} />
  }
}

class Assignment extends React.Component {
  render () {
    console.log('assingment rendering')
    console.log(this.props.assignments)
    return <div className='assignment'>{this.props}</div>
  }
}

