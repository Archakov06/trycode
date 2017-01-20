import config from '../config';
import md5 from 'md5';

export default class UserClass {

    constructor() {
    	this.uid = Math.round(Math.random()*1000000);
		this.hash = md5(config.key + this.uid);
		this.color = config.colors[ Math.floor( Math.random() * config.colors.length )];
    	this.name = 'Guest#' + this.uid;
        this.room_id = null;
    }

    getInfo(){
    	return {
			id: this.uid,
			hash: this.hash,
			color: this.color,
			online: true,
            room_id: this.room_id,
			name: this.name
		}
    }

    setName(name){
    	this.name = name;
    }

}