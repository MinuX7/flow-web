# FlowTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploy in AWS
* `ng build --configuration=production`
* `docker build -t flow-app .`
* `docker tag flow-app 904262290464.dkr.ecr.eu-west-1.amazonaws.com/flow-frontend:v1.0`
* `docker push 904262290464.dkr.ecr.eu-west-1.amazonaws.com/flow-frontend:v1.0`
* `Task Definition`
        `Crate new revision. Task role=none, TAsk memory=256, Add container. `
            `Port mapping 80:80`
        `Stop frontend task `
        `Run new task. Choose task definition.`

* Run pg admin in docker
 `podman run -e PGADMIN_DEFAULT_EMAIL=email@gmail.com -e PGADMIN_DEFAULT_PASSWORD=Password -p 5555:80 dpage/pgadmin4:latest`