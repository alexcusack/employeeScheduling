## Setup and Running
This app has four dependencies, Ruby, Node, Sqlite, and Bundler.
```
$ ruby --version
ruby 2.0.0p481 (2014-05-08 revision 45883) [x86_64-darwin14.3.0]
$ node --version
v4.1.1
$ sqlite3 --version
3.8.10.2 2015-05-20 18:17:19 2ef4f3a5b1d1d0c4338f8243d40a2452cc1f7fe4
$ bundler --version
Bundler version 1.9.4
```

First checkout this repo, then setup the server side
```
$ cd railsApp/
$ bundle install
$ bundle exec rake db:reset
$ bundle exec rails s
```
Now setup the client
```
$ cd client
$ npm install
$ ./node_modules/.bin/http-server
```
Now visit <http://localhost:8080/>

## Use
* The schedule is generated starting October 12th, 2015
* The default view is All Users
* Click a user's name to set that user as the `currentUser`
* Options to mark unavailability or trade days will render on days the `currentUser` is scheduled for that are after today's date
* To view  days the `currentUser` is scheduled for, click 'view selected user's schedule'
* Trading Days:
  1. Select the user to act on behalf of
  2. Click 'Trade Day'
  3. Tradable alternative days will appear, click 'Trade with <user>' to trade with that user
* Marking Unavailabilities
  1. Select the user to act on behalf of
  2. Click 'I'm Unavailable' to mark a day as undoable
  3. The calendar will automatically reschedule the selected user
  4. As per instructions- a user may only have one day marked as unavailable at a time. If the users marks a different day as unavailable, the previous unavailablity is retracted and a new one is created
* Toggle between months with the 'Previous Month', 'Next Month' buttons (extends into years as well)

## Design
I used Redux with React on the frontend and a Rails API backend with a single Log format database.

Why use a Log?
The log solves the issue of event timing and ordering in distributed systems like this one. Logs are append ony, once something is entered in the log it is never modified or destroyed.
This means that at anytime the Log can be reread from it's first entry and successfully return the exact state of the application.
The Log entry format used was:
```
TableName: Journal
------------------
timestamp: datetime
name: string
facts: string
```
`facts` is a JSON string of facts. Facts are deterministic events that change the State of the application.
Assertiong Facts are formatted as quads, like so:
`["assert", fact UUID, "assignment/user", <userUUID>],`
Retraction facts are formatted as doubles:
`["retract", <uuid>],`
Fact are deterministic inputs that result in a specific change to the State of the application.
Deterministic inputs make it possible to replay the Log (read all the facts) and produce the same output State everytime. (Even if there was an error, that error can simply be replayed)
A single Log entry sent to the server would be look like this:
```
 { timestamp: '2015-10-16T16:04:46.208Z',
   name: 'createAssignment',
   facts: [
            ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
            ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/date", "2015-10-08" ]
          ]
}
```

The use of a Log with Entities, within the scope of this project, eliminates the need to maintain a separate Tables for each of the entities.
Since there are not separate tables, UUIDs were used to ensure universal uniqueness amongst Entity IDs.

###Entities
The calendar is built around three core entities
* Users
  1. UUID
  2. name
* Assignments
  1. UUID
  2. date
  3. userUUID
* Unavailabilities
  1. UUID
  2. Date
  3. UUID

###Actions
The entities are effected by three primary actions. These actions are the only ones that effect the state of the program, and the last two are the only ones that generate new facts about the program.
* LoadEntries
  1. Reads the Log from the Rails API
  2. Uses the facts from the Log to update the State of the Application (which is built client side)
* CreateUnavailability
  1. Creates a new Unavailability (this generates four facts about the application)
     ```
      ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ]

      ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/date", "2015-10-08" ]

      ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006" ]

      ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ]
     ```

  2. If the user as already marked a day as unavailable previously, that unavailability is retracted

    ```
      ['retract', "06EC3D88-BA33-4151-8E87-97F025A8EACE"]
    ```
* SwapAssignment
  1. Swaps the current users assigned day with another, user selected, user.
    ```
      ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006" ]

      ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ]
    ```

Facts generated from actions are sent to the Log as a single Journal Entry, which eliminates the risk of partial actions, since the Journal Entry is only logged if all facts are compatible.
Compatibility is checked both client and server side but comparing the timestamps of the last Journal Entry that the client as read with the actual last Journal Entry. If they're not the same, the client is said to be out of sync and pulls the missing entries.

### Queries
User interactions that have an effect on the state of the program
* View All User's Schedule
* View Current User's schedule
* Mark Unavailability
* Trade assignments
* Next Month
* Previous Month

# Redux
The strategy of Using a Log with deterministic Facts pairs really well with Redux. Redux is built around Actions and their Reducers.
Reducers generate a new state anytime a new Fact is introduced.
Actions are all sent through a single Dispatch, and only reducers called through the Dispatch can effect the state.

![React with Redux flow ](/client/src/images/react_redux_flow.png?raw=true "React with Redux flow")


This then connects naturally to React with the State matching to React's State and the actions being passed as individual props to the corresponding React Components.


## Requirerments
* Client:
"babel": "^5.8.23",
"babelify": "^6.3.0",
"bluebird": "^2.10.2",
"browserify": "^11.2.0",
"http-server": "^0.8.5",
"node-fetch": "^1.3.3",
"react": "0.13.3",
"react-redux": "3.0.1",
"uuid": "^2.0.1",
"watchify": "^3.4.0"

* Server:
gem 'rails', '4.2.3'
gem 'rails-api'
gem 'json'
gem 'spring', :group => :development
gem 'rack-cors', :require => 'rack/cors'
gem 'sqlite3'



## Limitations
* If the log became too large to efficiently read in its entirety on initial client load, "packing" could be implemented. A 'pack' would be a record of the application state at a specific moment in time, then that state would server as the initial state and only Log entries after that State's timestamps would be read.
* In current version, there is no way to add additional users
* The calendar display is imperfect. I could have used a calendar module but would add a layer of complexity (adding a dependency into a not-well understood calendar library), and I felt the trade-off of a less well rendered calendar was wise for this version. On next iteration I would manually setup the calendar rendering.
