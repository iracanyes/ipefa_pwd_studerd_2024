# Angular

# Install

Globally install Angular CLI
````shell
# Run the command with privileged users
$ npm i -g @angular/cli
````


## Create a project

````shell
# Standalone app doesn't use the module system
$ ng new app --standalone --routing=true --style=scss
$ cd app
````
Test your new application with ``ng test``.

Generate boilerplate like components, directives, and pipes with ``ng generate``.

Deploy your new application and make it available to real users with ``ng deploy``.

Set up and run end-to-end tests of your application with ``ng e2e``.

## Start server

````shell
$ ng serve --open
````

## Add dependencies

````shell
# Syntax: ng add [package_name]
$ ng add @ngx-translate/core @ngx-translate/http-loader --save
````

## Generate component

As it's a standalone application no modules system is needed!
Here we generate a SignIn component
````shell
$ ng generate component security/page/SignInPage
# Using shortcuts
$ ng g c security/page/SecurityFallbackPage
````