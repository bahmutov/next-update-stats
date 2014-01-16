# Development

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