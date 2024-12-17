# Run project

1. open docker, then cmd → `docker compose -f docker-compose.yml up -d`
   1. if port being in use. `docker ps -a` to see what container id using that port
   2. `docker stop {container_id}` to stop it
   3. then `docker-compose up -d` again
2. use tablePlus (or pgAdmin at localhost:5050) to see database
   - host : localhost
   - port : 5432
   - user : tinker_admin
   - password : tinkerbread1234
   - database : dev

# Setup

1. `pnpm i` to install every library
2. open docker, then cmd → `docker-compose up -d`
3. run `npx prisma migrate dev`
4. run `pnpm run seed` to create mock data

## To delete data base and start from scratch

```cpp
docker-compose -f docker-compose.yml down
docker volume ls
docker volume rm 2tinkerbread_postgres-data
docker compose -f docker-compose.yml up -d

// you have to run prisma migration again
npx prisma migrate dev
pnpm run seed
```

## Project_setup

You don’t need to read this. if you didn’t have to create project from scratch

we will use next.js as a framework. In frontend we use tailwind css, three.js , \*\*\*.

backend we use progress as a database, prisma as OSA, and nextAuth for authentation.

```cpp
// next.js : choose javascript, Tailwind CSS, appRouter
npx create-next-app@latest

// other library ---------------------
pnpm i three.js
pnpm i @prisma/client

// docker
create docker-compose.yml
"
version: '3.8'
services:
postgres:
image: postgres:latest
environment:
POSTGRES_USER: tinker_admin
POSTGRES_PASSWORD: tinkerbread1234
POSTGRES_DB: mydb
ports: - "5432:5432"
volumes: - postgres-data:/var/lib/postgresql/data
volumes:
postgres-data:
"

// prisma ---------------------
pnpm i prisma --save-dev
pnpm i prisma/client
npx prisma init // init prisma schema, then write prisma schema

// prisma migration
npx prisma migrate dev --name init

// create prisma/seed.js then create mock data

// add script in package.json
"scripts": {
  "seed": "node prisma/seed.js"
}

// Run Migration and Seed
npx prisma migrate dev --name mock_data
npx run seed

```

# Next Setup

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
