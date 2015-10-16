import * as reducers from '../src/reducers'
const initialState = { users: {}, assignments: {}, unavailabilities: {}, lastEntryDate: undefined, currentUserID: null, visibilityFiler: 'all', todaysDate: '2015-10-13' }

const entries = {"status":200,"updates":[{"id":1,"timestamp":"2015-10-13T03:05:42.315Z","name":"createUser","facts":"[\"assert\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\", \"user/name\", \"Sherry\"]"},{"id":2,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"a77cf20a-31d6-4ba7-95db-6690da41f694\", \"user/name\", \"Boris\"]"},{"id":3,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"f4343fcb-9a86-4680-87ce-4f1c281f00f9\", \"user/name\", \"Vicente\"]"},{"id":4,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"7bd233f7-c0e4-43df-890c-a0dd10621cff\", \"user/name\", \"Matte\"]"},{"id":5,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"0682d780-a91c-40a3-8af6-77daceb49c36\", \"user/name\", \"Jack\"]"},{"id":6,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\", \"user/name\", \"Kevin\"]"},{"id":7,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"bf9673a3-3526-4dd6-bbaf-2e2537247b11\", \"user/name\", \"Zoe\"]"},{"id":8,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"ff7574d5-1907-4980-8ab3-ec7f3f9d8565\", \"user/name\", \"Jay\"]"},{"id":9,"timestamp":"2015-10-13T03:05:42.316Z","name":"createUser","facts":"[\"assert\", \"a231ba8e-9437-46ad-b022-65b9c2b119fe\", \"user/name\", \"Eadon\"]"},{"id":10,"timestamp":"2015-10-13T03:05:42.317Z","name":"createUser","facts":"[\"assert\", \"d65a32cf-4a94-4e48-a9ab-023dff1be1e4\", \"user/name\", \"Franky\"]"},{"id":11,"timestamp":"2015-10-13T03:05:42.317Z","name":"createUser","facts":"[\"assert\", \"4bbef9fc-4f5d-4365-a535-b4e4c8a842f7\", \"user/name\", \"Luis\"]"},{"id":12,"timestamp":"2015-10-13T03:05:42.317Z","name":"createUser","facts":"[\"assert\", \"1dd0f860-ba94-4d57-a078-640194983f7d\", \"user/name\", \"James\"]"},{"id":13,"timestamp":"2015-10-13T03:05:42.318Z","name":"createAssignment","facts":"[[\"assert\", \"ffa7a825-752d-4d3e-904c-2e3527b58851\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"ffa7a825-752d-4d3e-904c-2e3527b58851\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":14,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"9236c6dd-439e-4a9c-ba9f-b69d4b90aeb6\", \"assignment/user\", \"a77cf20a-31d6-4ba7-95db-6690da41f694\"], [\"assert\", \"9236c6dd-439e-4a9c-ba9f-b69d4b90aeb6\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":15,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"0ad12a75-122b-40d4-b6e5-8de030378a22\", \"assignment/user\", \"f4343fcb-9a86-4680-87ce-4f1c281f00f9\"], [\"assert\", \"0ad12a75-122b-40d4-b6e5-8de030378a22\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":16,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"6e6ae5de-31c8-4e0b-b67f-750232370117\", \"assignment/user\", \"7bd233f7-c0e4-43df-890c-a0dd10621cff\"], [\"assert\", \"6e6ae5de-31c8-4e0b-b67f-750232370117\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":17,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"e5426cbb-869d-4cb2-a0d1-b740f7ca87b1\", \"assignment/user\", \"0682d780-a91c-40a3-8af6-77daceb49c36\"], [\"assert\", \"e5426cbb-869d-4cb2-a0d1-b740f7ca87b1\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":18,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"45d23f87-c794-4439-b6bd-012b0185713b\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"45d23f87-c794-4439-b6bd-012b0185713b\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":19,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"2cfb3918-c70c-4816-abf7-0da7ab0fd580\", \"assignment/user\", \"7bd233f7-c0e4-43df-890c-a0dd10621cff\"], [\"assert\", \"2cfb3918-c70c-4816-abf7-0da7ab0fd580\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":20,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"4c323acf-daa3-469a-8620-dc14069011ac\", \"assignment/user\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\"], [\"assert\", \"4c323acf-daa3-469a-8620-dc14069011ac\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":21,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"33cb1517-40a2-48d4-87e9-9a4db18fcbe3\", \"assignment/user\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\"], [\"assert\", \"33cb1517-40a2-48d4-87e9-9a4db18fcbe3\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":22,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"f58d57eb-c93c-45ad-9c61-7175b404423b\", \"assignment/user\", \"f4343fcb-9a86-4680-87ce-4f1c281f00f9\"], [\"assert\", \"f58d57eb-c93c-45ad-9c61-7175b404423b\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":23,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"3c65d8dd-6cd4-4f9e-8f99-9d79a60c7095\", \"assignment/user\", \"bf9673a3-3526-4dd6-bbaf-2e2537247b11\"], [\"assert\", \"3c65d8dd-6cd4-4f9e-8f99-9d79a60c7095\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":24,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"3e3f53ab-ce99-457e-9ee2-706e99f2ed24\", \"assignment/user\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\"], [\"assert\", \"3e3f53ab-ce99-457e-9ee2-706e99f2ed24\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":25,"timestamp":"2015-10-13T03:05:42.319Z","name":"createAssignment","facts":"[[\"assert\", \"f80a4320-ae6c-43d6-8eaa-ff0b75333d62\", \"assignment/user\", \"7bd233f7-c0e4-43df-890c-a0dd10621cff\"], [\"assert\", \"f80a4320-ae6c-43d6-8eaa-ff0b75333d62\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":26,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"751ae8a0-fb00-438d-8dd2-638102323869\", \"assignment/user\", \"bf9673a3-3526-4dd6-bbaf-2e2537247b11\"], [\"assert\", \"751ae8a0-fb00-438d-8dd2-638102323869\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":27,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"21bcf0b6-0f8e-460d-8562-5cb01431cabc\", \"assignment/user\", \"ff7574d5-1907-4980-8ab3-ec7f3f9d8565\"], [\"assert\", \"21bcf0b6-0f8e-460d-8562-5cb01431cabc\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":28,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"823c8de3-f53d-49e1-9865-72c118f966e3\", \"assignment/user\", \"a77cf20a-31d6-4ba7-95db-6690da41f694\"], [\"assert\", \"823c8de3-f53d-49e1-9865-72c118f966e3\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":29,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"99c76c8d-0cf9-49a0-b102-311dbef4e11d\", \"assignment/user\", \"a231ba8e-9437-46ad-b022-65b9c2b119fe\"], [\"assert\", \"99c76c8d-0cf9-49a0-b102-311dbef4e11d\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":30,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"11827692-05b9-4119-ba53-a316958f2021\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"11827692-05b9-4119-ba53-a316958f2021\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":31,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"4817e5c7-121c-4991-bd58-7ceee910f6b9\", \"assignment/user\", \"d65a32cf-4a94-4e48-a9ab-023dff1be1e4\"], [\"assert\", \"4817e5c7-121c-4991-bd58-7ceee910f6b9\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":32,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"54bf759b-2129-474a-a396-2158f9eadee7\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"54bf759b-2129-474a-a396-2158f9eadee7\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":33,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"3bb251b2-87c3-43f3-b616-baf1c9ad8330\", \"assignment/user\", \"7bd233f7-c0e4-43df-890c-a0dd10621cff\"], [\"assert\", \"3bb251b2-87c3-43f3-b616-baf1c9ad8330\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":34,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"99b46899-d961-4c5a-9e03-f4fb16e2327b\", \"assignment/user\", \"d65a32cf-4a94-4e48-a9ab-023dff1be1e4\"], [\"assert\", \"99b46899-d961-4c5a-9e03-f4fb16e2327b\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":35,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"508fe56f-6c3d-4ea2-b69c-f2b0ae4bd560\", \"assignment/user\", \"d65a32cf-4a94-4e48-a9ab-023dff1be1e4\"], [\"assert\", \"508fe56f-6c3d-4ea2-b69c-f2b0ae4bd560\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":36,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"52848337-60f8-4eec-9a06-ce49d5201385\", \"assignment/user\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\"], [\"assert\", \"52848337-60f8-4eec-9a06-ce49d5201385\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":37,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"d0f48006-11fe-4314-ad61-ca4327914626\", \"assignment/user\", \"a77cf20a-31d6-4ba7-95db-6690da41f694\"], [\"assert\", \"d0f48006-11fe-4314-ad61-ca4327914626\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":38,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"207bcae6-c657-42eb-949d-de03db767c62\", \"assignment/user\", \"d65a32cf-4a94-4e48-a9ab-023dff1be1e4\"], [\"assert\", \"207bcae6-c657-42eb-949d-de03db767c62\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":39,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"aaae883d-f325-4f63-8858-8aea44e9d5a8\", \"assignment/user\", \"f4343fcb-9a86-4680-87ce-4f1c281f00f9\"], [\"assert\", \"aaae883d-f325-4f63-8858-8aea44e9d5a8\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":40,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"587a8169-9853-436f-a720-35c462261657\", \"assignment/user\", \"4bbef9fc-4f5d-4365-a535-b4e4c8a842f7\"], [\"assert\", \"587a8169-9853-436f-a720-35c462261657\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":41,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"c9ce2d3b-3b26-4d47-ab01-c4b91aa301f6\", \"assignment/user\", \"a231ba8e-9437-46ad-b022-65b9c2b119fe\"], [\"assert\", \"c9ce2d3b-3b26-4d47-ab01-c4b91aa301f6\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":42,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"08250e8d-883a-4125-8d24-809b6704752f\", \"assignment/user\", \"a77cf20a-31d6-4ba7-95db-6690da41f694\"], [\"assert\", \"08250e8d-883a-4125-8d24-809b6704752f\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":43,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"741064f6-2cd0-4951-aaf4-ca59aa0f0e69\", \"assignment/user\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\"], [\"assert\", \"741064f6-2cd0-4951-aaf4-ca59aa0f0e69\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":44,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"d68a6fc5-0a1a-41e0-9e7e-960ffe105999\", \"assignment/user\", \"7bd233f7-c0e4-43df-890c-a0dd10621cff\"], [\"assert\", \"d68a6fc5-0a1a-41e0-9e7e-960ffe105999\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":45,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"f278640e-febf-4e38-a412-6c7d5bfceef2\", \"assignment/user\", \"ff7574d5-1907-4980-8ab3-ec7f3f9d8565\"], [\"assert\", \"f278640e-febf-4e38-a412-6c7d5bfceef2\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":46,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"d0bb2f3d-4d64-43c5-84ce-8806731f8d42\", \"assignment/user\", \"1dd0f860-ba94-4d57-a078-640194983f7d\"], [\"assert\", \"d0bb2f3d-4d64-43c5-84ce-8806731f8d42\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":47,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"ed2a693a-1db8-436c-b348-9d4382434139\", \"assignment/user\", \"878db4b8-9410-42d4-b759-4cdeb258cdeb\"], [\"assert\", \"ed2a693a-1db8-436c-b348-9d4382434139\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":48,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"d2f1aea4-8429-4fc1-bb52-b001ee9ca65c\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"d2f1aea4-8429-4fc1-bb52-b001ee9ca65c\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":49,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"aff0ee97-1c90-4899-b854-911ca1ff90ab\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"aff0ee97-1c90-4899-b854-911ca1ff90ab\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":50,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"7afc5fb2-5747-4110-9cd5-071bf6b6d6af\", \"assignment/user\", \"0682d780-a91c-40a3-8af6-77daceb49c36\"], [\"assert\", \"7afc5fb2-5747-4110-9cd5-071bf6b6d6af\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":51,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"12afa347-a6f9-459e-bfab-72468bf089c6\", \"assignment/user\", \"f777f1a0-b861-49c3-b4fb-b0d745f0dd7a\"], [\"assert\", \"12afa347-a6f9-459e-bfab-72468bf089c6\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"},{"id":52,"timestamp":"2015-10-13T03:05:42.320Z","name":"createAssignment","facts":"[[\"assert\", \"b1d1f40b-458d-4216-8344-fe40a2e2b24d\", \"assignment/user\", \"0682d780-a91c-40a3-8af6-77daceb49c36\"], [\"assert\", \"b1d1f40b-458d-4216-8344-fe40a2e2b24d\", \"assignment/date\", \"2015-12-08T01:05:24.000Z\"]]"}],"lastEntry":"2015-10-13 03:05:42 UTC"}

const newState = reducers.readJournal(entries, initialState)

const expectedState = { users:
   { 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a': 'Sherry',
     'a77cf20a-31d6-4ba7-95db-6690da41f694': 'Boris',
     'f4343fcb-9a86-4680-87ce-4f1c281f00f9': 'Vicente',
     '7bd233f7-c0e4-43df-890c-a0dd10621cff': 'Matte',
     '0682d780-a91c-40a3-8af6-77daceb49c36': 'Jack',
     '878db4b8-9410-42d4-b759-4cdeb258cdeb': 'Kevin',
     'bf9673a3-3526-4dd6-bbaf-2e2537247b11': 'Zoe',
     'ff7574d5-1907-4980-8ab3-ec7f3f9d8565': 'Jay',
     'a231ba8e-9437-46ad-b022-65b9c2b119fe': 'Eadon',
     'd65a32cf-4a94-4e48-a9ab-023dff1be1e4': 'Franky',
     '4bbef9fc-4f5d-4365-a535-b4e4c8a842f7': 'Luis',
     '1dd0f860-ba94-4d57-a078-640194983f7d': 'James' },
  assignments:
   { 'ffa7a825-752d-4d3e-904c-2e3527b58851':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     '9236c6dd-439e-4a9c-ba9f-b69d4b90aeb6':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'a77cf20a-31d6-4ba7-95db-6690da41f694' },
     '0ad12a75-122b-40d4-b6e5-8de030378a22':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f4343fcb-9a86-4680-87ce-4f1c281f00f9' },
     '6e6ae5de-31c8-4e0b-b67f-750232370117':
      { date: '2015-12-08T01:05:24.000Z',
        user: '7bd233f7-c0e4-43df-890c-a0dd10621cff' },
     'e5426cbb-869d-4cb2-a0d1-b740f7ca87b1':
      { date: '2015-12-08T01:05:24.000Z',
        user: '0682d780-a91c-40a3-8af6-77daceb49c36' },
     '45d23f87-c794-4439-b6bd-012b0185713b':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     '2cfb3918-c70c-4816-abf7-0da7ab0fd580':
      { date: '2015-12-08T01:05:24.000Z',
        user: '7bd233f7-c0e4-43df-890c-a0dd10621cff' },
     '4c323acf-daa3-469a-8620-dc14069011ac':
      { date: '2015-12-08T01:05:24.000Z',
        user: '878db4b8-9410-42d4-b759-4cdeb258cdeb' },
     '33cb1517-40a2-48d4-87e9-9a4db18fcbe3':
      { date: '2015-12-08T01:05:24.000Z',
        user: '878db4b8-9410-42d4-b759-4cdeb258cdeb' },
     'f58d57eb-c93c-45ad-9c61-7175b404423b':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f4343fcb-9a86-4680-87ce-4f1c281f00f9' },
     '3c65d8dd-6cd4-4f9e-8f99-9d79a60c7095':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'bf9673a3-3526-4dd6-bbaf-2e2537247b11' },
     '3e3f53ab-ce99-457e-9ee2-706e99f2ed24':
      { date: '2015-12-08T01:05:24.000Z',
        user: '878db4b8-9410-42d4-b759-4cdeb258cdeb' },
     'f80a4320-ae6c-43d6-8eaa-ff0b75333d62':
      { date: '2015-12-08T01:05:24.000Z',
        user: '7bd233f7-c0e4-43df-890c-a0dd10621cff' },
     '751ae8a0-fb00-438d-8dd2-638102323869':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'bf9673a3-3526-4dd6-bbaf-2e2537247b11' },
     '21bcf0b6-0f8e-460d-8562-5cb01431cabc':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'ff7574d5-1907-4980-8ab3-ec7f3f9d8565' },
     '823c8de3-f53d-49e1-9865-72c118f966e3':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'a77cf20a-31d6-4ba7-95db-6690da41f694' },
     '99c76c8d-0cf9-49a0-b102-311dbef4e11d':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'a231ba8e-9437-46ad-b022-65b9c2b119fe' },
     '11827692-05b9-4119-ba53-a316958f2021':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     '4817e5c7-121c-4991-bd58-7ceee910f6b9':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'd65a32cf-4a94-4e48-a9ab-023dff1be1e4' },
     '54bf759b-2129-474a-a396-2158f9eadee7':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     '3bb251b2-87c3-43f3-b616-baf1c9ad8330':
      { date: '2015-12-08T01:05:24.000Z',
        user: '7bd233f7-c0e4-43df-890c-a0dd10621cff' },
     '99b46899-d961-4c5a-9e03-f4fb16e2327b':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'd65a32cf-4a94-4e48-a9ab-023dff1be1e4' },
     '508fe56f-6c3d-4ea2-b69c-f2b0ae4bd560':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'd65a32cf-4a94-4e48-a9ab-023dff1be1e4' },
     '52848337-60f8-4eec-9a06-ce49d5201385':
      { date: '2015-12-08T01:05:24.000Z',
        user: '878db4b8-9410-42d4-b759-4cdeb258cdeb' },
     'd0f48006-11fe-4314-ad61-ca4327914626':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'a77cf20a-31d6-4ba7-95db-6690da41f694' },
     '207bcae6-c657-42eb-949d-de03db767c62':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'd65a32cf-4a94-4e48-a9ab-023dff1be1e4' },
     'aaae883d-f325-4f63-8858-8aea44e9d5a8':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f4343fcb-9a86-4680-87ce-4f1c281f00f9' },
     '587a8169-9853-436f-a720-35c462261657':
      { date: '2015-12-08T01:05:24.000Z',
        user: '4bbef9fc-4f5d-4365-a535-b4e4c8a842f7' },
     'c9ce2d3b-3b26-4d47-ab01-c4b91aa301f6':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'a231ba8e-9437-46ad-b022-65b9c2b119fe' },
     '08250e8d-883a-4125-8d24-809b6704752f':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'a77cf20a-31d6-4ba7-95db-6690da41f694' },
     '741064f6-2cd0-4951-aaf4-ca59aa0f0e69':
      { date: '2015-12-08T01:05:24.000Z',
        user: '878db4b8-9410-42d4-b759-4cdeb258cdeb' },
     'd68a6fc5-0a1a-41e0-9e7e-960ffe105999':
      { date: '2015-12-08T01:05:24.000Z',
        user: '7bd233f7-c0e4-43df-890c-a0dd10621cff' },
     'f278640e-febf-4e38-a412-6c7d5bfceef2':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'ff7574d5-1907-4980-8ab3-ec7f3f9d8565' },
     'd0bb2f3d-4d64-43c5-84ce-8806731f8d42':
      { date: '2015-12-08T01:05:24.000Z',
        user: '1dd0f860-ba94-4d57-a078-640194983f7d' },
     'ed2a693a-1db8-436c-b348-9d4382434139':
      { date: '2015-12-08T01:05:24.000Z',
        user: '878db4b8-9410-42d4-b759-4cdeb258cdeb' },
     'd2f1aea4-8429-4fc1-bb52-b001ee9ca65c':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     'aff0ee97-1c90-4899-b854-911ca1ff90ab':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     '7afc5fb2-5747-4110-9cd5-071bf6b6d6af':
      { date: '2015-12-08T01:05:24.000Z',
        user: '0682d780-a91c-40a3-8af6-77daceb49c36' },
     '12afa347-a6f9-459e-bfab-72468bf089c6':
      { date: '2015-12-08T01:05:24.000Z',
        user: 'f777f1a0-b861-49c3-b4fb-b0d745f0dd7a' },
     'b1d1f40b-458d-4216-8344-fe40a2e2b24d':
      { date: '2015-12-08T01:05:24.000Z',
        user: '0682d780-a91c-40a3-8af6-77daceb49c36' } },
  unavailabilities: {},
  lastEntryDate: '2015-10-13 03:05:42 UTC',
  currentUserID: null,
  visibilityFiler: 'all',
  todaysDate: '2015-10-13' }




console.log('read log test', Object.is(JSON.stringify(newState), JSON.stringify(expectedState)))

























// // "facts" => [     #  alex assignment                                             myles uID
// //       ["assert", "95D131AF-62CC-4C68-8202-B970EBBCC977", "assignment/user", "4BF57F2A-67AE-4C3D-AF7C-5B240F47E006" ],
// //       ["assert", "1A160698-EFE0-40E0-8300-233A9F5F2E4D", "assignment/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
// //       ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/user", "D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0" ],
// //       ["assert", "06EC3D88-BA33-4151-8E87-97F025A8EACE", "unavailability/date", "2015-10-08" ],
// //     ]

// // const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"}]
// // const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"},{"id":4,"timestamp":"2015-10-08T17:54:28.345Z","name":"createUnavailability","facts":"[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]","created_at":"2015-10-08T17:54:29.899Z","updated_at":"2015-10-08T17:54:29.899Z"}]
// // const exampleFactList = [{"id":2,"timestamp":"2015-10-08T16:56:45.597Z","name":"createUser","facts":"[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]","created_at":"2015-10-08T16:56:51.290Z","updated_at":"2015-10-08T16:56:51.290Z"},{"id":3,"timestamp":"2015-10-08T17:46:45.891Z","name":"createAssignment","facts":"[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]","created_at":"2015-10-08T17:46:48.043Z","updated_at":"2015-10-08T17:46:48.043Z"},{"id":4,"timestamp":"2015-10-08T17:54:28.345Z","name":"createUnavailability","facts":"[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]","created_at":"2015-10-08T17:54:29.899Z","updated_at":"2015-10-08T17:54:29.899Z"},{"id":5,"timestamp":"2015-10-08T18:03:51.816Z","name":"removeUnavailability","facts":"[[\"retract\",\"3791D856-DBB2-4715-9CDB-9098286476C9\"]]","created_at":"2015-10-08T18:03:54.264Z","updated_at":"2015-10-08T18:03:54.264Z"}]
// const sampleState = { users: {}, assignments: {}, unavailabilities: {} }

// const sampleSeed = [
//   {
//     "id": 1,
//     "timestamp": "2015-10-08T00:00:00.000Z",
//     "name": "createUser",
//     "facts": "[[\"assert\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\",\"user/name\",\"alex\"]]"
//   },
//   {
//     "id": 2,
//     "timestamp": "2015-10-08T00:01:00.000Z",
//     "name": "createAssignment",
//     "facts": "[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/date\",\"2015-10-08\"]]"
//   },
//   {
//     "id": 3,
//     "timestamp": "2015-10-08T00:02:00.000Z",
//     "name": "createUnavailability",
//     "facts": "[[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"3791D856-DBB2-4715-9CDB-9098286476C9\",\"unavailability/date\",\"2015-10-09\"]]"
//   },
//   {
//     "id": 4,
//     "timestamp": "2015-10-08T00:03:00.000Z",
//     "name": "removeUnavailability",
//     "facts": "[[\"retract\",\"3791D856-DBB2-4715-9CDB-9098286476C9\"]]"
//   },
//   {
//     "id": 5,
//     "timestamp": "2015-10-08T00:04:00.000Z",
//     "name": "createUser",
//     "facts": "[[\"assert\",\"4BF57F2A-67AE-4C3D-AF7C-5B240F47E006\",\"user/name\",\"myles\"]]"
//   },
//   {
//     "id": 6,
//     "timestamp": "2015-10-08T00:05:00.000Z",
//     "name": "createAssignment",
//     "facts": "[[\"assert\",\"1A160698-EFE0-40E0-8300-233A9F5F2E4D\",\"assignment/user\",\"4BF57F2A-67AE-4C3D-AF7C-5B240F47E006\"],[\"assert\",\"1A160698-EFE0-40E0-8300-233A9F5F2E4D\",\"assignment/date\",\"2015-10-10\"]]"
//   },
//   {
//     "id": 7,
//     "timestamp": "2015-10-08T00:06:00.000Z",
//     "name": "swapAssignment",
//     "facts": "[[\"assert\",\"95D131AF-62CC-4C68-8202-B970EBBCC977\",\"assignment/user\",\"4BF57F2A-67AE-4C3D-AF7C-5B240F47E006\"],[\"assert\",\"1A160698-EFE0-40E0-8300-233A9F5F2E4D\",\"assignment/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"06EC3D88-BA33-4151-8E87-97F025A8EACE\",\"unavailability/user\",\"D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0\"],[\"assert\",\"06EC3D88-BA33-4151-8E87-97F025A8EACE\",\"unavailability/date\",\"2015-10-08\"]]"
//   }
// ]


// const actual = readJournal(sampleSeed, sampleState)

// const expected = { users:
//    { 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0': 'alex',
//      '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006': 'myles' },
//   assignments:
//    { '95D131AF-62CC-4C68-8202-B970EBBCC977':
//       { date: '2015-10-08',
//         user: '4BF57F2A-67AE-4C3D-AF7C-5B240F47E006' },
//      '1A160698-EFE0-40E0-8300-233A9F5F2E4D':
//       { date: '2015-10-10',
//         user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } },
//   unavailabilities:
//    { '06EC3D88-BA33-4151-8E87-97F025A8EACE':
//       { date: '2015-10-08',
//         user: 'D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0' } } }


// console.log(Object.is(actual, expected))