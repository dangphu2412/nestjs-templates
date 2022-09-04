<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Features
[![Awesome NestJS](https://img.shields.io/badge/Awesome-NestJS-blue.svg?longCache=true&style=flat-square)](https://github.com/dangphu2412/nestjs-templates)

[Nest](https://github.com/nestjs/nest) monolithic repository

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Feature description

<dl>
  <dt>Modularization</dt>
  <dd>Separate feature into module. Each module has the same architecture</dd>

  <dt><b>JWT Authentication</b></dt>
  <dd>Installed and configured JWT authentication.</dd>

  <dt><b>Environment Configuration</b></dt>
  <dd>development, staging and production environment configurations</dd>

  <dt><b>Swagger Api Documentation</b></dt>
  <dd>Already integrated API documentation. To see all available endpoints visit http://localhost:3000/docs</dd>

  <dt><b>Linter</b></dt>  
  <dd>eslint + prettier = ❤️</dd>

  <dt></dt>
  <dd></dd>
</dl>

### Naming convention
- [English language](https://github.com/dangphu2412/nestjs-templates/tree/main/base-project/backend-nestjs#english-language)
- [Functions](https://github.com/dangphu2412/nestjs-templates/tree/main/base-project/backend-nestjs#functions)
- [Classes](https://github.com/dangphu2412/nestjs-templates/tree/main/base-project/backend-nestjs#classes)
- [Variables](https://github.com/dangphu2412/nestjs-templates/tree/main/base-project/backend-nestjs#variables)

#### English language
```typescript
/* Bad */
const primerNombre = 'Gustavo'
const amigos = ['Kate', 'John']

/* Good */
const firstName = 'Gustavo'
const friends = ['Kate', 'John']
```
>Like it or not, English is the dominant language in programming: the syntax of all programming languages is written in English, as well as countless documentations and educational materials. By writing your code in English you dramatically increase its cohesiveness.

#### Functions
- A/HC/LC Pattern

```
prefix? + action (A) + high context (HC) + low context? (LC)
```

| Name                 | Prefix | Action (A) | High context (HC) | Low context (LC) |
|----------------------|--------|------------|-------------------|------------------|
| getUser              |        | get        | User              |                  |
| getUserMessages      |        | get        | User              | Messages         |
| shouldDisplayMessage | should | Display    | Message           |                  |
| getUser              |        | get        | User              |                  |

- Actions

The verb part of your function name. The most important part responsible for describing what the function does.

Please focus on intention of name which is the most important thing when writing function.

Getting easy when naming function when you function only do one thing at a time (it is well known as SINGLETON principle)
```typescript
function getUserFullName() {
  return this.firstName + ' ' + this.lastName;
}

```

- Parameters

There are some rules when trying to define functions or method of a class. Sometimes, we may meet a function with no argument or even up to 4 or 5 or more.

Well let take a look at example:

```typescript
function getStockPrice(region: Region, day: Date, stockCode: StockCode): StockPrice {}
// Compare to
function getStockPrice(stockArea: StockArea): StockPrice {}
```

Both would get the stock price, but take a look at the meaning of the function when comparing both of them.

The first one is quite ambigious due to triac parameters and not really focus on the target in which they are getting the information. Are we getting based on region, day or stockCode? May one of this param is  used for validation only? ...

The second way is more clear about the intention: we are getting stock price based on stock area - That is it!

Avoid putting too much parameter on function or method - when it is happened, pls try to refactor, extract method, ...

Read more:
- Clean Code: Chapter 3 - Functions - Robert C. Martin
Too Many Parameters - Wiki C2
- Single Responsibility Principle - Wikipedia
- Extract Method - Refactoring Guru
- Parameter Object - Refactoring Guru

#### Classes
#### Variables