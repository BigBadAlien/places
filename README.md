
# Places

Main folders:

* [src/app/actions](src/app/actions)
* [src/app/components](src/app/components)
* [src/app/containers](src/app/containers)
* [src/app/reducers](src/app/reducers)

## Installation

```
$ npm install
```

`yarn install` if something goes wrong.

## Testing

```
$ npm test
```

Only actions and reducers tested. Testing of some primitive functions skipped.

* [src/app/actions/auth.spec.ts](src/app/actions/auth.spec.ts)
* [src/app/actions/place.spec.ts](src/app/actions/place.spec.ts)
* [src/app/reducers/auth.spec.ts](src/app/reducers/auth.spec.ts)
* [src/app/reducers/place.spec.ts](src/app/reducers/place.spec.ts)

## Development

```
$ npm dev
```

## Start

Change `key` here [src/environment.ts](src/environment.ts)

```
$ npm start
```

Open `http://localhost:8080` in browser

## Tips

To log out clear local storage.

Implemented simplest authentication with only one request without any additional checks. Should be ok for the test example.

Authentication tested with credential:

* login: foobar@email.com
* password: 12345

Feel free to use it ;)

# License

MIT
