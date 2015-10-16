## Deploy



## Use
* The schdule is generated starting October 13th, 2015
* The default view is All Users
* Click a usersname to set that user as the `currentUser`
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
The log solves the issue of event timing and ordering in distributed systems like this one(Client/Server). Logs are append ony, once something is entered in the log it is never modified or destroyed.
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

The use of a Log with Entities, within the scope of this project, eliminates the need to maintain a seperate Tables for each of the entites.
Since there are not seperate tables, UUIDs were used to ensure universal uniqueness amongest Entity IDs.

###Entities
The calendar is built around three core entites
* Users
  -- UUID
  -- name
* Assignments
  -- UUID
  -- date
  -- userUUID
* Unavailabilities
  -- UUID
  -- Date
  -- UUID

###Actions
This entites are effected by three primary actions. These actions are the only ones that effect the state of the program, and the last two are the only ones that generate new facts about the program.
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

Facts generated from actions are sent to the Log as a single Journal Entry, which eliminates the risk of partial actions, since the Journal Entry is only logged if all facts are compatiable.
Compatability is checked both client and server side but comparing the timestamp of the last Journal Entry that the client as read with the actual last Journal Entry. If they're not the same, the client is said to be out of sync and pulls the missing entries.

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

// add a diagram


This then connects naturally to React with the State matching to React's State and the actions being passed as indivdual props to the corresponding React Components.


## Requirerments



## Limitations
* If the log became too large to effeciently read in its entirety on intial client load, "blobs" could be implemented. A blob would be a record of the application state at a specific momemnt in time, then that state would server as the initial state and only Log entries after that State's timestamp would be read.






+ Entities
  + User- UUID--- non UUID would pontentially collide on system scale
    - name
  + Dates don't need to be saved to db since they're inherently distinct
  + Holidays -- UUID
    - Date, name
  + Unavailabilities -- UUID
    - Date, reason
  + Assignments -- UUID
    - User, Date

+ Commands
  //+ LoadSeedNames(list of names)
    - Generate entity for each name
    - Attach name attribute to entity
    - Generate Assignment Entities
  + SwapAssignments(userA, dateA, userB, dateB)
    - Generate user unavailability(userA, DateA)
    - Assert assignment(userA, dateB)
    - Assert assignment(userB, dateA)
  + CreateUnavailability(User, date)

+ Queries
  + Schedule for current month
    - unavailabity for everyday of month
  + Show all users and passed assigned days




