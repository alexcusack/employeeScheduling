import { pullFromServer, pushToServer } from '../server_calls'

// pullFromServer('2015-10-08 00:06:00 UTC')
// pullFromServer()
// pullFromServer('2015-10-08 00:05:00 UTC')

pushToServer(["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
             ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/date", "2015-10-08" ], 'CREATE_ASSIGNMENT')