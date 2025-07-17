## Install Node Packages
1. ```npm install```

## Create Database in MySQL Locally
2. Open ```scripts/init-db.sh``` and add your root password for mysql into the script.

3. In terminal run ```npm run db:init``` (Remove the password you added afterward)

## Environment Variables
4. In ```.env``` add the following line, replacing your_password_here with your root mysql password
```DATABASE_URL="mysql://root:your_password_here$@localhost:3306/devx_survey"```

## Migrate Database
5. ```npx prisma generate```

6. ```npx prisma migrate dev --name init```

7. ```npx prisma migrate reset```

8. ```npx prisma migrate dev```

## How to Run Web Application
9. ```npm run dev```

## Ensure the Database Properly Updates
10. Fill out an example survey and ensure results appear when you open ```npx prisma studio```