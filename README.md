# Flight Test

This application was created as an example of Angular best practices, using enterprise solution patterns and principles. It adheres to a clean, concise component-based architecture(https://github.com/HammerTron/monster/tree/main/src/app/areas). It also uses uni-directional data flow for all application state and store (https://github.com/HammerTron/monster/tree/main/src/app/store) management. Meaning immutables (https://github.com/HammerTron/monster/tree/main/src/app/store/App/types) are used for data allowing for a single source of truth. It also provides its own bespoke `Backend Service` (https://github.com/HammerTron/monster/tree/main/src/app/shared/services/Backend) that handles all outside communication, i.e., service calls with a wide range of custom header customization. There is also a translation file (https://github.com/HammerTron/monster/blob/main/src/app/app.translations.ts) that adds key-value pairing, which provides easy multi-language support. Unit testing examples have been added to each separation of responsibility to provide specific patterns for testing.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) [version 16.1.4.] and utilizes a number of 3rd party dependencies including:


 - [NPM](https://www.npmjs.com/) package manager
 - [TypeScript](http://www.typescriptlang.org/) typed superset of JavaScript
 - [@Types](https://www.npmjs.com/~types) npm type definition packages
 - [RxJS](http://reactivex.io/) Reactive Observables extension for JavaScript
 - [ImmutableJS](https://facebook.github.io/immutable-js/) immutable Data for JavaScript applications
 - [Karma](http://karma-runner.github.io/6.4/index.html) test runner
 - [Jasmine](http://jasmine.github.io/) framework for unit testing
 - [mocha](https://github.com/mochajs/mocha/wiki) test reporter
 - [Bootstrap](http://getbootstrap.com/) CSS Framework for responsive, mobile-first web projects
 - [Font Awesome](https://fortawesome.com/) icon and css toolkit

## Local Prerequisites Installation

1. Install [GIT](http://git-scm.com/) if it isn't already
2. Install [NodeJS/NPM](http://nodejs.org/) if it isn't already
3. cd into the project directory from a terminal/command prompt (NOTE: if using Windows be sure and launch command prompt as [Administrator](http://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-8.1/))
4. Install Client dependencies by typing `npm run clean-install`
5. Run dev build `npm run debug:mock`

## Development server

Access the project's root folder from a command prompt and type `npm run start` This will launch your default browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy

Run `npm run deploy` to build the project, and then deploy it to the Firebase hosting services configured with this solution.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

To get more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.