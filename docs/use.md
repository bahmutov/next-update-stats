Small server keeping package upgrade version statistics to be used
as stand alone information, or with automatic update tool
[next-update](https://github.com/bahmutov/next-update)

In essense it keeps anonymous stats when upgrading public packages:

> Upgrading [lodash](https://npmjs.org/package/lodash)
from 1.0.0 to 2.0.0 breaks 200 times, is successful 300 times.

Allows you to judge how likely a successful update for your
project would be. When looking at the entire NPM universe,
only 25% of modules have working unit tests
(see [http://npmt.abru.pt/](http://npmt.abru.pt/)), and the rest
either have no tests, or failing ones. This project tries to
increase this number by making unit tests highly useful.
