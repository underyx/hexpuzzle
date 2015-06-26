# Solving a Math Puzzle When You're Bad at Math

This is all the source code I had for my talk with the above title at the
[June 2015 budapest.py meetup](http://www.meetup.com/budapest-py/events/222822762/).

To see the presentation yourself, please visit
[hexpuzzle.underyx.me](https://hexpuzzle.underyx.me). Advance the slides with
the spacebar. Also, don't go backwards, that will break everything :D

I did not bother cleaning up, and the entire thing is just horribly written —
it was my first time using genetic algorithms, reveal.js, React, Sass, lodash,
and even most parts of JavaScript. Also, I was in quite a hurry to be done with
this before the meetup. Anyway, the point is, **please do not refer to this code
when learning any of these technologies!** I had no idea what I was doing, and
made tons of mistakes.

## Usage

All dependencies are vendored, so you can just start serving from the root
directory of the repository (for instance, with `python3 -m http.server`). The
SCSS file is also included as a compiled CSS one.

Also included is the script I talked about in the presentation, `hexpuzzle.py`.

## License

```
The MIT License (MIT)

Copyright (c) 2015 Bence Nagy (underyx)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
