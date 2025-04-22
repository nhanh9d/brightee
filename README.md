# brightee
A cute test from brightee

requirement:
- optional FE (can use any framework) to show a dashboard that have a list of leads
- BE should use graphql with: (prefer use typescript)
  - 2 queries: leads and lead
  - 1 mutation: add lead (name, email, mobile, postcode, list services)
- any relational DB
- able to run solution
- should cover with unit test

solution:
- FE: should be in folder fe and I will use react with a dockerfile
- BE: should be in folder be and I will use nestjs with a dockerfile
- DB: I will use postgres
- A docker compose to up all of them
