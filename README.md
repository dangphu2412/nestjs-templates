# Nestjs & Next templates

[![Awesome NestJS](https://img.shields.io/badge/Awesome-NestJS-blue.svg?longCache=true&style=flat-square)](https://github.com/dangphu2412/nestjs-templates)

> This is an ever-evolving, very opinionated architecture and dev environment for new node projects using [NestJS](https://nestjs.com). Questions, feedback, and for now, even bikeshedding are welcome. 😄

## Nestjs monolithic template

```bash
# 1. Clone the repository or click on "Use this template" button.
git clone https://github.com/dangphu2412/nestjs-templates.git

# 2. Enter your newly-cloned folder.
cd base-project/backend-nestjs

# 3. Create Environment variables file.
cp .env.example .env

# 3. Install dependencies. (Make sure yarn is installed: https://yarnpkg.com/lang/en/docs/install)
yarn
```

### Before running project
- [ ] Not having postgres or even pgadmin? We already prepare these tools in [docker-compose.yml](https://github.com/dangphu2412/nestjs-templates/blob/main/base-project/backend-nestjs/docker-compose.yml)
- [ ] Next, try running one of services
- [ ] Prepare .env variables
```bash
docker-compose up -d postgres // Which will only run postgres image in compose
```

### Running project
```bash
yarn start:dev
# Server would run on port 3000 by default config.
# You can take a look at some example api: http://localhost:3000/api
```

### Monolithic features:

[Read more here](https://github.com/dangphu2412/nestjs-templates/tree/main/base-project/backend-nestjs)

## Nestjs microservice template

**_`IN PROGRESS`_**