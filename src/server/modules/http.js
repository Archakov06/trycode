import CookieParser from 'restify-cookies';
import Restify from 'restify';
import unirest from 'unirest';

import config from '../config';

import CodeClass from '../classes/CodeClass';

const app = Restify.createServer();

app.use(Restify.bodyParser());
app.use(CookieParser.parse);

const Code = new CodeClass();

app.get(/\/public\/?.*/, Restify.serveStatic({
    directory: __dirname.replace('dist/modules','')
}));

app.get('/', function indexHTML(req, res, next){
	
	Code.create(req, res, next);

});

app.get('/lib/:name', function indexHTML(req, res, next){

	const name = req.params.name;
	
	unirest.get('https://cdnjs.com/libraries/' + name)
	.end(function (response) {
		res.send(response.body);
		return next();
	});

});

app.get('/:cid', function(req, res, next){

	Code.get(req, res, next);

});

app.get('get/:cid', function(req, res, next){

	Code.json(req, res, next);

});

app.post('save/:cid', function(req, res, next){
	
	Code.save(req, res, next);

});

app.listen(config.options.PORT);

console.log('✅  Сервер запущен по адресу: http://localhost:5000');

export default { app }