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
  + LoadSeedNames(list of names)
    - Generate entity for each name
    - Attach name attribute to entity
    - Generate Assignment Entities
  + SwapAssignments(userA, dateA, userB, dateB)
    - Generate user unavailability(userA, DateA)
    - Assert assignment(userA, dateB)
    - Assert assignment(userB, dateA)
  + CreateAssignment(user, date)
  + CreateHoliday(date, name)
  + RemoveHoliday(Holiday)
  + CreateUser(name)
  + RemoveUser(name)
  + CreateUnavailability(User, date)
  + RemoveUnavailability(User, date)

+ Queries
  + Schedule for current month
    - unavailabity for everyday of month
  + Show all users and passed assigned days




