# tract

[![Greenkeeper badge](https://badges.greenkeeper.io/passcod/tract.svg)](https://greenkeeper.io/)

Render a (Handlebars) template using a single command, pulling data from files
in JSON, YAML, or «dot env» (shell export) format, and from the environment.

Data files specified later override earlier ones, and envvars override all.

## Synopsis

    $ tract template.hbs [data files...]

    $ tract template.hbs # Environment variables only
    $ tract template.hbs test.yml config.json .env.default .env

## Install

    $ npm install -g tract

## Author

Made by Félix Saparelli and released under MIT.
