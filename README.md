# Fucking spaghetti code
<img src="assets/images/Security.png" alt="Security"></img>
## How to run:
1. Clone the repository
2. `cd` into cloned repository
3. Install necessary dependencies: `npm i`
4. Rename `.env.template` to `.env` and fill it with necessary info
5. Remove files with errors (if any)
6. Run project: `npm run start`
## How to prepare database:
1. `cd` into cloned repository
2. run command `npm run generate`
3. a) run command `npm run pushtodb` (recommended)<br>b) execute script `sql/SCRIPT.sql` on user with sufficient permissions
### Development notes:
How to run raw SQL in Prisma:<br>
```ts
db.$queryRaw<Type>`QUERY`;
```
What's the meaning of life:
```
There is none
```