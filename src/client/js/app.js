'use strict';

import '../stylus/app.styl';

import appController from './controllers/appController';

var app = angular.module('app', []);

app
.controller('appController', appController)
.factory('$socket', function(){return io.connect(location.origin);});