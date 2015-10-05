# next-update-stats v0.3.0

> Collects anonymous nodejs module version upgrade statistics

[![NPM][next-update-stats-icon] ][next-update-stats-url]

[![Build status][next-update-stats-ci-image] ][next-update-stats-ci-url]
[![dependencies][next-update-stats-dependencies-image] ][next-update-stats-dependencies-url]
[![devdependencies][next-update-stats-devdependencies-image] ][next-update-stats-devdependencies-url]
[![Circle CI](https://circleci.com/gh/bahmutov/next-update-stats.svg?style=svg) ](https://circleci.com/gh/bahmutov/next-update-stats)

[next-update-stats-icon]: https://nodei.co/npm/next-update-stats.png?downloads=true
[next-update-stats-url]: https://npmjs.org/package/next-update-stats
[next-update-stats-ci-image]: https://travis-ci.org/bahmutov/next-update-stats.png?branch=master
[next-update-stats-ci-url]: https://travis-ci.org/bahmutov/next-update-stats
[next-update-stats-dependencies-image]: https://david-dm.org/bahmutov/next-update-stats.png
[next-update-stats-dependencies-url]: https://david-dm.org/bahmutov/next-update-stats
[next-update-stats-devdependencies-image]: https://david-dm.org/bahmutov/next-update-stats/dev-status.png
[next-update-stats-devdependencies-url]: https://david-dm.org/bahmutov/next-update-stats#info=devDependencies



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



### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/next-update-stats/issues) on Github



## MIT License

Copyright (c) 2013 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


