# ApiJuegos

This project was generated with [symfony compose](https://github.com/symfony/symfony) version 7.0. Use composer install and then composer update before deploying the server in first time
Use `php bin/console doctrine:database:create` and do a dump on it.

## Development server

Run `symfony server:start` for a dev server. Navigate to `http://localhost:8000/`. And you can acces to all the api routes.
An apache and MySQL service are required.

## Code scaffolding

Run `php bin/console make:entity` to generate a new entity. Then can use `php bin/console make:migration` and `php bin/console doctrine:migrations:migrate` to push the entity at the databese.

# AppJuegos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12. Use npm install before deploying  the app in first time.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.