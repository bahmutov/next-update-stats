# next-update-stats

Small server keeping package upgrade version statistics

In essense it keeps anonymous stats when upgrading public packages.

Upgrading [lodash](https://npmjs.org/package/lodash)
from 1.0.0 to 2.0.0 breaks 200 times, is successful 300 times.

Allows you to judge how likely a successful update for your
project would be.

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
