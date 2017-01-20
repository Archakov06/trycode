import fs from 'fs';
import config from '../config';

export default class CodeClass {

    constructor() {
        // ...
    }

    create(req, res, next) {
		const cid = (Math.random()*10).toString(36).substr(2,8).toUpperCase();
		const ip = req.connection.remoteAddress;
		const time = Math.round(Date.now()/1000);
		config.db('trycode').insert({cid: cid, mode: 'text', ip: ip, time: time}).then( (rows) => {
			res.redirect('/' + cid, next);
			next();
		});
    }

    get(req, res, next) {

		const cid = req.params.cid;

		config.db('trycode').select('*').where({cid: cid}).then( (rows) => {
			
			var page = rows.length ? 'index' : 'error';
			fs.readFile(config.options.ROOT + '/' + page + '.html', (err, data) => {

				config.room_id = cid;

			    res.setHeader('Content-Type', 'text/html');
			    res.writeHead(200);
			    res.end(data);
			    next();
			});

		}).catch( (err) => {
			res.send(err);
			return next();
		});

    }

    json(req, res, next) {

	    const cid = req.params.cid;
		req.headers.accept = 'application/json';
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");

	    config.db('trycode').select('*').where({cid: cid}).then( (rows) => {
			
			if (!rows.length) {
				res.send({'error':'mysql__not-found','data':''});
				return next();
			}

			res.send({'error':'','data':rows[0]});
			next();

	    }).catch(function(err) {
			console.error(err);
			res.send(err);
			return next();
		});

    }

    save(req, res, next) {
	    req.headers.accept = 'application/json';
		res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");

	    const cid = req.params.cid;
	    const code = req.body.code;
	    const mode = req.body.mode;

		config.db('trycode').where('cid', '=', cid).update({code: code, mode: mode})
		.then( (rows) => {
			if (!rows) {
				res.send({'error':'mysql__not-found','data':''});
				return next();
			}
			res.send({'error':'','data':rows[0]});
			next();
		});
    }

    setMode(cid, mode) {
    	config.db('trycode').where('cid', '=', cid).update({mode: mode})
		.then( (rows) => {
			if (!rows.length) return false; else return true;
		});
    }

    viewer(type, cid, status) {
    	const params = {};
    	params[type] = status;
    	config.db('trycode').where('cid', '=', cid).update(params)
		.then( (rows) => {
			if (!rows.length) return false; else return true;
		});
    }

}