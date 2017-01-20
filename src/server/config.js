'use strict';

var room_id = null;

var users = [];
var messages = [];

const key = Math.round(Math.random()*100000000000);

const colors = [
	'#2a84c7', // blur
	'#9c2ac7', // purple
	'#684dcc', // purple 2
	'#c72a2a', // red
	'#c76e2a', // orange
	'#83a20f', // green
	'#2aa20f', // grenn 2
	'#10b317', // grenn 3
	'#717171', // gray
	'#503838', // red black
	'#dc5db9', // pink
];

const options = {
	DEV: true,
	PORT: process.env.PORT || 80,
	ROOT: __dirname.replace(/(\/dist|\/dist\/modules)/g,'/public')
};

var db = null;

db = require('knex')({
	client: 'mysql',
	connection: {
		host       : options.DEV ? 'localhost' : 'eu-cdbr-west-01.cleardb.com',
		user       : options.DEV ? 'root' : 'db_user',
		password   : options.DEV ? 'password' : 'db_pass',
		database   : options.DEV ? 'trycode_db' : 'db_dbname',
		socketPath : options.DEV ? '/Applications/MAMP/tmp/mysql/mysql.sock' : '', // I have OSX and need mysql.sock
		charset    : 'utf8',
	}
});

export default {
	room_id,
	users,
	colors,
	messages,
	options,
	key,
	db
}