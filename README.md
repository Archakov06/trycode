![TryCode logo](http://ileet.ru/public/assets/img/trycode_logo.svg)
=========
Is an open-source realtime collaborative code editor with syntax highlighting. Perfect for: remote coding interviews and learning code for friends.

The server part is developed on NodeJS and using Socket.io libraries under the hood to support websockets for realtime collaboration. The client side use AngularJS v1.4.8, [ACE](https://ace.c9.io/) and [dollardom.js](https://github.com/julienw/dollardom).

Join to [Gitter TryCode](https://gitter.im/trycode-gitter/chat) if you have any questions. [![Join the chat at https://gitter.im/trycode-gitter/chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/trycode-gitter/chat)

## Demo

Try out for yourself on the demo site here in Heroku: [http://trycode.herokuapp.com/](http://trycode.herokuapp.com/)

![TryCode in Safari](https://archakov.im/uploads/trycode_window_1.png)

## Installation

Clone the repository from Github

```
$ git clone https://github.com/Archakov06/trycode.git
```

To get your own TryCode running on Heroku, click the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Archakov06/trycode)

## Configuration
Before you run the application, you need to configure access to the database by writing setting in ```src/server/config.js``` and set ```OPTIONS.DEV``` (true / false. Developer mode is not finished.)

```
db = require('knex')({
	client: 'mysql',
	connection: {
		host       : options.DEV ? 'localhost' : 'eu-cdbr-west-01.cleardb.com',
		user       : options.DEV ? 'root' : 'cleardb_user',
		password   : options.DEV ? 'password' : 'cleardb_pass',
		database   : options.DEV ? 'trycode_db' : 'cleardb_dbname',
		socketPath : options.DEV ? '/Applications/MAMP/tmp/mysql/mysql.sock' : '', // I have OSX and need mysql.sock
		charset    : 'utf8',
	}
});
```

## NPM Scripts
```
"scripts": {
    "start": "node ./dist/run.js",
    "build": "babel ./src/server -d ./dist",
    "run": "node ./dist/run.js",
    "build-run": "babel ./src/server -d ./dist && node ./dist/run.js",
    "sprite": "svg-sprite-generate -d public/img/svg -o public/img/sprites.svg"
  }
```

## How to report bugs
Bugs should be files as issues on the github issue tracker at
<https://github.com/Archakov06/trycode/issues>. Contact me via GitHub if you have issues, suggestions or need any help regarding this app. Note that the code is beta quality.

## What for?
With the passage of the interview in one of the companies, I was offered to write code in collabedit.com. After using this online editor, I noticed that it works very badly and has a very sucks editor (it's uses "long polling" :facepalm:). Then I got the idea to realize a simple and convenient at the same time online code editor on the WebSockets.

P.S: Sorry for my lousy English :)

## License

MIT License

Copyright (c) 2017 Archakov Dennis

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

## Contributing

Comming soon...