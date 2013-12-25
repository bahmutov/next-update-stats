
0.0.4 / 2013-12-25
==================

  * more robust error handling

0.0.3 / 2013-12-25
==================

  * added version route /version returns server's version
  * added route to fetch upgrade information /package/name/from version/to version
  * added route to update information /update

```
{
    name: package name,
    from: semver start version,
    to: semver tested version, should be greater than from,
    success: boolean
}
```
