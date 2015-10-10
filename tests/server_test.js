import fetch from 'node-fetch'

console.log('push to server test')

const checkPost = (postBody) => {

  fetch('http://localhost:3000/journal',
    {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    })
    .then(function (res) {
      return res.json()
    })
    .then(function (res) {
      console.log(res.status)
    })
}

const facts = [ ["assert", "3791D856-DBB2-4715-9CDB-9098286476C9", "unavailability/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ], ["assert", "3791D856-DBB2-4715-9CDB-9098286476C9", "unavailability/date", "2015-10-09" ] ]
;[
  {
    name: 'valid',
    input: {actionType: 'CREATE_UNAVAILABILITY', timestamp: '2015-10-10T00:05:50.933Z', facts: facts},
    expected: 200,
  },
].forEach(function(td){
  var actual = checkPost(td.input)
  var pass = actual === td.expected // no nesting so this is 'fine'
  var pass = JSON.stringify(actual) === JSON.stringify(td.expected)
  if (pass){
    console.log("passed:", td.name)
  }else{
    console.log(td.name, "failed")
    console.log("actual:", actual)
    console.log("expected:", td.expected)
    process.exit()
  }
})
