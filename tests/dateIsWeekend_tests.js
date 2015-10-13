import { dateIsWeekend } from '../src/helpers'

;[
  {
    name: 'Date is weekend Monday, false',
    input: 'Mon Oct 01 2015 17:05:24 GMT-0700 (PDT)',
    expected: false,
  },
  {
    name: 'Date is weekend Saturday, true',
    input: 'Sat Oct 03 2015 17:05:24 GMT-0700 (PDT)',
    expected: true,
  },
  {
    name: 'Date is weekend Sunday, true',
    input: 'Sun Oct 04 2015 17:05:24 GMT-0700 (PDT)',
    expected: true,
  },
].forEach((td) => {
  const actual = dateIsWeekend(td.input)
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

