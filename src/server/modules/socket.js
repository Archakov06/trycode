import socket from 'socket.io';
import http from './http';
import config from '../config';
import CodeClass from '../classes/CodeClass';

const Code = new CodeClass();
const io = socket.listen(http.app.server);

io.on('connection', (socket) => {

	// Editor

	socket.on('server:editor:change', (data) => {
		socket.broadcast.emit('client:editor:change', data);
	});

	socket.on('server:editor:mode',(data) => {
		socket.broadcast.emit('client:editor:mode', data);
		Code.setMode(data.cid, data.mode);
	});

	socket.on('server:editor:viewer',(data) => {
		Code.viewer(data.type, data.cid, data.status);
	});

	socket.on('disconnect',() => {
	});

});

console.log('✅  Сокеты запущены!');
