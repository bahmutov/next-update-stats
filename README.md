# next-update-stats

Small server keeping package upgrade version statistics to be used
as stand alone information, or with automatic update tool
[next-update](https://github.com/bahmutov/next-update)

In essense it keeps anonymous stats when upgrading public packages:

> Upgrading [lodash](https://npmjs.org/package/lodash)
from 1.0.0 to 2.0.0 breaks 200 times, is successful 300 times.

Allows you to judge how likely a successful update for your
project would be. When looking at the entire NPM universe,
only 25% of modules have working unit tests
(see [http://npmt.abru.pt/(http://npmt.abru.pt/), and the rest
either have no tests, or failing ones. This project tries to
increase this number by making unit tests highly useful.

## Development

Set environment variables to whatever MongoDB expects

```
export STATS_DB_USERNAME=username
export STATS_DB_PASSWORD=password
```

Start server `npm start`

Post an update `curl -X POST http://localhost:3000/update` (should fail)

inside folder *test-e2e* there are a few JSON files, you can try

```
curl -X POST http://localhost:3000/update -i -H "Content-Type: application/json" -d @failed-update.json
```

You can test deployed Heroku app

```
curl -X POST http://next-update.herokuapp.com/update -i -H "Content-Type: application/json" -d @failed-update.json
```

## Fetching information

```
curl -i http://localhost:3000/package/lodash/1.0.0/2.0.0
curl -i http://localhost:3000/package/lodash
```

## Small print

Author: Gleb Bahmutov &copy; 2013

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: [MIT](LICENSE-MIT) - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, click *endorse*, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github
