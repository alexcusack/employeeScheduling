import { getDaysOfMonth } from '../helpers'

;[
  {
    name: 'number of days in month, standard month',
    input: [10, 2015],
    expected: 31,
  },
  {
    name: 'number of days in month, Feb 2015',
    input: [2, 2015],
    expected: 28,
  },
  {
    name: 'number of days in month, Feb 2016',
    input: [2, 2016],
    expected: 29,
  },
].forEach((td) => {
  const actual = getDaysOfMonth(td.input[0], td.input[1])
  const pass = actual === td.expected
  if (pass) {
    console.log('passed:', td.name)
  } else {
    console.log('failed:', td.name)
    console.log('actual:', actual)
    console.log('expected:', td.expected)
    process.exit()
  }
})
