<h1 style="font-family:Comic Sans MS; font-size:5em;">Solid Quality</h1>

[![Node Version](https://img.shields.io/badge/node-v18.7.0-green)](https://nodejs.org/en/blog/release/v18.7.0/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f9ad00.svg)](https://pnpm.io/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb)](https://www.solidjs.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![EsLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io)

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Scripts](#scripts)
  - [Built With](#built-with)
  - [Developer Tools](#developer-tools)
    - [VS Code](#vs-code)
- [Building](#building)
- [Deployment](#deployment)
- [Support](#support)
- [Contributing](#contributing)

</details>
<br>

# About

A quality management system for the construction management industry

<details open="open">
<summary>Screenshots</summary>
<br>

|                               Home Page                               |                               Login Page                               |
| :-------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| <img src="docs/images/screenshot.png" title="Home Page" width="100%"> | <img src="docs/images/screenshot.png" title="Login Page" width="100%"> |

</details>
<br>

# Getting Started

## Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) recommended to manage nodejs version
- [pnpm](https://pnpm.io/) package manager of choice
- [nodejs](https://nodejs.org/tr/download/package-manager/#macos) (run `nvm use` or see .nvmrc for correct Node version)
- [docker](https://www.docker.com/get-started/)

## Local Setup

Ask team member for .env.development file

Add admin user to docker group: https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo

The node version in the project's .nvmrc file will be the default when calling nvm commands without a version.

```shell
nvm install
nvm use
```

Create Docker container by running package script:

```shell
pnpm run docker:reset
```

Start MySQL + Prisma container (keep running in terminal):

```shell
pnpm run dev:db
```

Populate MySQL tables:

```shell
pnpm run db:reset-dev
```

Kill all terminals

Start dev environment (starts docker, frontend, and backend):

```shell
pnpm run dev
```

Your default browser should open the running application at http://localhost:3000

## Scripts

`build` - Runs Vite in build mode and outputs to dist folder

`check-updates` - Checks for updates on all npm modules that don't match the ncurc.json file

`clean` - Removes node_modules and package-lock.json for a clean install

`coverage` - Runs Vite in coverage mode

`coverage:view` - View the coverage html file for more granular details

`db:reset` - Resets db through prisma

`dev` - Starts local docker MySQL DB and solid project

`docker:reset` - Resets docker container

`format` - Runs a fix prettier and eslint on repo

`playwright:test` - Runs all playwright files

`playwright:debug-test` - Runs a single playwright file in test mode

`prepare` - Lifecycle hook to prepare husky

`preview` - Builds a production version of app and servers file locally

`test` - Runs Vitest in watch mode

`test:ui` - Opens the Vitest UI test runner

## Built With

<details open="open">
<summary>Technologies</summary>
<br>

| Name            | Website                                           |
| :-------------- | :------------------------------------------------ |
| dayjs           | https://day.js.org/                               |
| dotenv          | https://www.npmjs.com/package/dotenv              |
| eslint          | https://eslint.org                                |
| husky           | https://typicode.github.io/husky                  |
| lint staged     | https://github.com/okonet/lint-staged#readme      |
| msw             | https://mswjs.io                                  |
| ncu             | https://github.com/raineorshine/npm-check-updates |
| npm-run-all     | https://www.npmjs.com/package/npm-run-all         |
| mysql           | https://www.mysql.com/                            |
| playwright      | https://playwright.dev                            |
| prettier        | https://prettier.io                               |
| prisma          | https://www.prisma.io/                            |
| solid           | https://www.solidjs.com/                          |
| tailwind css    | https://tailwindcss.com/                          |
| testing library | https://testing-library.com                       |
| tRPC            | https://trpc.io/                                  |
| typescript      | https://www.typescriptlang.org                    |
| vite            | https://vitejs.dev                                |
| vitest          | https://vitest.dev                                |
| zod             | https://github.com/colinhacks/zod                 |

</details>

## Developer Tools

### VS Code

`Debug on Chrome` - Launch the project in a chrome instance and allow inline Vscode debugging. This chrome instance's user data profile resides inside this directory - `.vscode/vscode-chrome-debug-userdatadir/`. This ensures a fresh environment to test against and also allows developers to segregate their personal and developer Chrome instance (highly recommend)

`Test and Watch Current File` - Runs Vitest in watch mode on the currently focused file in editor

# Building

Run the build script to output files to the `dist` directory

```shell
pnpm run build
```

# Deployment

> **[?]**

# Support

> **[?]**
> TBD, list support instructions

# Contributing

Please read [our contribution guidelines](docs/CONTRIBUTING.md)
