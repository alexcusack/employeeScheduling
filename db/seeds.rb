#  create should just be able to receive a fact, parse it and save it appropriately based on what is being asked
#  index should Journal.all to JSON, and just send back that huge list of journal entries



seedJournalEntries = [
  {
    "timestamp" => "2015-10-08T00:00:00.000Z",
    "name" => "createUser",
    "facts" => [
      ["assert", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0", "user/name", "alex"]
    ],
  },

  {
    "timestamp" => "2015-10-08T00:01:00.000Z",
    "name" => "createAssignment",
    "facts" => [
      ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
      ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/date", "2015-10-08" ],
    ]
  },

  {
    "timestamp" => "2015-10-08T00:02:00.000Z",
    "name" => "createUnavailability",
    "facts" => [
      ["assert", "3791D856-DBB2-4715-9CDB-9098286476C9", "unavailability/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
      ["assert", "3791D856-DBB2-4715-9CDB-9098286476C9", "unavailability/date", "2015-10-09" ],
    ]
  },
  {
    "timestamp" => "2015-10-08T00:03:00.000Z",
    "name" => "removeUnavailability",
    "facts" => [
      ["retract","3791D856-DBB2-4715-9CDB-9098286476C9"]
    ]
  },

  {
    "timestamp" => "2015-10-08T00:04:00.000Z",
    "name" => "createUser",
    "facts" => [
      ["assert", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006", "user/name", "myles"]
    ],
  },

  {
    "timestamp" => "2015-10-08T00:05:00.000Z",
    "name" => "createAssignment",
    "facts" => [
      ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/user", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006" ],
      ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/date", "2015-10-12pa" ],
    ]
  },

  {
    "timestamp" => "2015-10-08T00:06:00.000Z",
    "name" => "swapAssignment",
    "facts" => [     #  alex assignment                                             myles uID
      ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006" ],
      ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
      ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
      ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/date", "2015-10-08" ],
    ]
  },
]


seedJournalEntries.each do |entry|
  newEntry = Journal.new(timestamp: entry['timestamp'], name: entry['name'], facts: entry['facts'].to_json )
  newEntry.save
end

