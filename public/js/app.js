/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Applications/MAMP/htdocs/test-node/trycode/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _appController = __webpack_require__(2);

	var _appController2 = _interopRequireDefault(_appController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = angular.module('app', []);

	app.controller('appController', _appController2.default).factory('$socket', function () {
	  return io.connect(location.origin);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AppController = function () {
		function AppController($scope, $socket, $http, $sce) {
			var _this2 = this;

			_classCallCheck(this, AppController);

			var _this = this;
			_this.$scope = $scope;
			_this.$http = $http;
			_this.$sce = $sce;
			_this.$socket = $socket;

			_this.$scope.mode_values = ['text', 'html', 'css', 'javascript', 'php', 'python', 'ruby', 'c_cpp', 'csharp', 'java', 'objectivec', 'actionscript', 'coffee', 'typescript', 'batchfile', 'haml', 'handlebars', 'haskell', 'jade', 'json', 'jsx', 'less', 'sass', 'scss', 'stylus', 'livescript', 'markdown', 'mysql', 'sql', 'pascal', 'perl', 'rust', 'sh', 'svg', 'textile', 'vbscript', 'xml'];
			_this.$scope.mode_names = ['Text', 'HTML', 'CSS', 'JavaScript', 'PHP', 'Python', 'Ruby', 'C++', 'C#', 'Java', 'Objective C', 'ActionScript', 'CoffeeScript', 'TypeScript', 'Batchfile', 'Haml', 'Handlebars', 'Haskell', 'Jade', 'JSON', 'JSX', 'LESS', 'SASS', 'SCSS', 'Stylus', 'LiveScript', 'Markdown', 'MySQL', 'SQL', 'Pascal', 'Perl', 'Rust', 'Shell (Bash)', 'SVG', 'Textfile', 'VBScript', 'XML'];

			_this.$scope.currentCID = location.pathname.replace('/', '');
			_this.$scope.currentCode = null;
			_this.$scope.currentMode = 'text';
			_this.$scope.currentTheme = 'chrome'; //tomorrow_night_eighties

			_this.$scope.editor = ace.edit("editor");
			_this.$scope.editor.setTheme("ace/theme/" + _this.$scope.currentTheme);
			_this.$scope.editor.session.setMode("ace/mode/" + _this.$scope.currentMode);
			_this.$scope.editor.renderer.setPadding(10);
			_this.$scope.editor.$blockScrolling = Infinity;
			_this.$scope.editor.setOption("enableEmmet", true);

			_this.$scope.editor.commands.addCommand({
				name: 'popup_cmd',
				bindKey: { win: 'Ctrl-Shift-P', mac: 'Command-Shift-P' },
				exec: function exec(editor) {

					$d.get('.search-box input')[0].value = _this.$scope.search_cmd = '';

					_this.$scope.commands = _this.$scope.commands_rec;
					_this.$scope.search_cmd = '';
					_this.$scope.cdnjs_files = [];

					setTimeout(function () {
						$d.get('.search-box input')[0].focus();
					});

					_this.$scope.command_show = true;
					_this.$scope.$apply();
				},
				readOnly: true
			});

			_this.$scope.editor.commands.addCommand({
				name: 'close_popup',
				bindKey: { win: 'Esc', mac: 'Esc' },
				exec: function exec(editor) {
					_this.$scope.command_show = false;
					_this.$scope.$apply();
				},
				readOnly: true
			});

			_this.$scope.debounceEditor = null;
			_this.$scope.waitEditor = null;
			_this.$scope.isSaving = false;
			_this.$scope.saveDelay = 1500;

			_this.$scope.codeUrl = location.href;
			_this.$scope.cursorPos = 'Line 0, Column 0';
			_this.$scope.codeRunned = false;
			_this.$scope.autoRun = false;

			_this.$scope.commands = [{ value: 'Cdnjs: Search', cmd: 'cdnjs:search' }, { value: 'Snippet: for (...) { }', cmd: 'snippet:for' }, { value: 'Random: Int', cmd: 'random:int' }, { value: 'Random: Float', cmd: 'random:float' }, { value: 'Random: Text', cmd: 'random:text' }, { value: 'Random: UUID', cmd: 'random:uuid' }, { value: 'Random: URL', cmd: 'random:url' }, { value: 'Random: E-Mail', cmd: 'random:email' }, { value: 'Random: Fisrt Name', cmd: 'random:firstname' }, { value: 'Random: Last Name', cmd: 'random:lastname' }, { value: 'Random: Full Name', cmd: 'random:fullname' }, { value: 'Random: Hex-Color', cmd: 'random:hex' }, { value: 'Random: IPv4 Adress', cmd: 'random:ip4' }, { value: 'Random: IPv6 Adress', cmd: 'random:ip6' }, { value: 'Random: Lorem Ipsum', cmd: 'random:lorem' }, { value: 'Random: Letters and numbers', cmd: 'random:letnum' }];

			_this.$scope.commands_rec = _this.$scope.commands;

			_this.$scope.command_show = false;
			_this.$scope.search_cmd = '';
			_this.$scope.cdnjs_files = [];

			// Получаем исходный код
			_this.$http.get('/get' + location.pathname).success(function (data) {
				// Пихаем ответ от сервера в переменную
				_this.setCode(data.data);
			});

			// При изменении показа/скрытия просмотра кода,
			// отправлять запрос на сохранение
			_this.$scope.$watch('codeRunned', function (newValue, oldValue) {
				if (newValue == oldValue) return false;
				if (newValue) _this2.writeCode();
				_this.$socket.emit('server:editor:viewer', {
					type: 'viewer',
					cid: _this.$scope.currentCID,
					status: newValue ? 1 : 0
				});
			});

			// При изменении автозапуска кода,
			// отправлять запрос на сохранение
			_this.$scope.$watch('autoRun', function (newValue, oldValue) {
				if (newValue == oldValue) return false;
				if (newValue) _this2.writeCode();
				_this.$socket.emit('server:editor:viewer', {
					type: 'autorun',
					cid: _this.$scope.currentCID,
					status: newValue ? 1 : 0
				});
			});

			// Следим за изменением синтаксиса редактора
			_this.$scope.$watch('currentMode', function (newValue, oldValue) {
				if (newValue == oldValue) return false;
				// Передаем серверу, что мы изменили синтаксис
				_this.$socket.emit('server:editor:mode', {
					cid: _this.$scope.currentCID,
					mode: newValue
				});

				// Сохраняем новое значение синтаксиса
				_this.$scope.currentMode = newValue;

				// Устанавливаем новый синтаксис для редактора
				_this.$scope.editor.getSession().setMode("ace/mode/" + _this.$scope.currentMode);

				// Сохраняем изменения
				// setTimeout( () => { _this.saveCode() },500);
			});

			// Следим за изменением синтаксиса от других пользователей
			_this.$socket.on('client:editor:mode', function (data) {
				// Пихаем ответ от сервера в переменную
				if (data.cid == _this.$scope.currentCID) _this.$scope.currentMode = data.mode;
			});

			_this.$scope.editor.on("focus", function (e) {
				var pos = _this.$scope.editor.getCursorPosition();
				_this.$scope.cursorPos = 'Line ' + pos.row + ', Column ' + pos.column;
				_this.$scope.$apply();
			});

			_this.$scope.editor.on("change", function (e) {

				// Если изменения с нашей стороны
				if (_this.$scope.editor.curOp && _this.$scope.editor.curOp.command.name) {

					// Очищаем таймер сохранения
					clearTimeout(_this.$scope.debounceEditor);

					// Получаем объект сессии редактора
					var session = _this.$scope.editor.session;

					// Оповещаем об изменениях
					_this.$socket.emit('server:editor:change', {
						cid: _this.$scope.currentCID,
						mode: _this.$scope.currentMode,
						code: btoa(unescape(encodeURIComponent(session.getValue())))
					});

					_this.$scope.currentCode = session.getValue();

					if (_this.$scope.autoRun == true && _this.$scope.currentMode == 'html') {
						_this2.writeCode();
					}

					// Устанавливаем таймер на сохранения кода
					_this.$scope.debounceEditor = setTimeout(function () {
						_this.saveCode();
					}, _this.$scope.saveDelay);
				}
			});

			// Следим за изменениями в коде
			_this.$socket.on('client:editor:change', function (data) {
				// Вносим изменения в коде
				_this.setCode(data);
			});

			window.onresize = resizeEditor;

			$d.onready(function () {

				// После загрузки страницы, скрываем блок "Loading"
				$d.get('.shadow-block')[0].style.display = 'none';

				resizeEditor();

				// Следим за позицией курсора
				// setInterval( () => {
				// 	var pos = _this.$scope.editor.getCursorPosition();
				// 	_this.$scope.cursorPos = 'Line ' + pos.row + ', Column ' + pos.column;
				// 	_this.$scope.$apply();
				// }, 100);
			});

			function resizeEditor() {
				var w = window,
				    d = document,
				    e = d.documentElement,
				    g = d.getElementsByTagName('body')[0],

				// Получаем полную ширину области видимости
				x = w.innerWidth || e.clientWidth || g.clientWidth,

				// Получаем полную высоту области видимости
				y = w.innerHeight || e.clientHeight || g.clientHeight,

				// Вычисляем высоту редактора
				editor_height = y - ($d.get('.header')[0].clientHeight + $d.get('.statusbar')[0].clientHeight);

				// Устанавливаем высоту редактора
				$d.style($d.get('.editor__code')[0], { 'height': editor_height + 'px' });

				// Устанавливаем высоту просмотра примера
				$d.style($d.get('#viewer')[0], { 'height': editor_height + 'px' });
			}
		}

		_createClass(AppController, [{
			key: 'runCommand',
			value: function runCommand(command) {
				var _this = this;

				_this.$scope.command_show = false;
				_this.$scope.search_cmd = '';
				$d.get('.search-box input')[0].value = '';

				var position = _this.$scope.editor.getCursorPosition();
				var cmd = '';
				var val = '';

				var words = ['spongiolin', 'shamblingly', 'emend', 'chaetophoraceous', 'diplographic', 'wrist', 'plenitide', 'personalize', 'theftdom', 'unwarm', 'unbeseemingness', 'anthropotoxin', 'encroach', 'jewellike', 'unreproachingly', 'overdye', 'overbragging', 'firesafeness', 'overharsh', 'sermonproof', 'distilland', 'veri', 'aweigh', 'lamestery', 'glyptolith', 'zac', 'gorgonian', 'pseudodramatic', 'coaxer', 'preformant', 'lidder', 'Promethea', 'isomeride', 'gonidiospore', 'tilt', 'alpasotes', 'notionally', 'pawing', 'messieurs', 'hypozoan', 'machineless', 'nationalist', 'frondous', 'lackey', 'tooter', 'excelsior', 'Septoria', 'Heterochloridales', 'autoanalytic', 'foiling', 'stoun', 'pocketableness', 'dogtoothing', 'Tetum', 'fastingly', 'baniya', 'calendry', 'uroplania', 'evocate', 'badgerly', 'overstress', 'leucocratic', 'neuropathology', 'Vicki', 'executively', 'private', 'tropocaine', 'Mercurean', 'Oligocene', 'sciophyte', 'causational', 'weakishly', 'unparticipated', 'Guaque', 'bap', 'Panorpa', 'phytoecology', 'collinearly', 'Antarctica', 'embryoniform', 'itinerate', 'diol', 'glycolate', 'louchettes', 'underfootman', 'apocarpous', 'unelectable', 'somatocyst', 'saltator', 'etiolize', 'apophlegmatic', 'Sphenophyllum', 'furnacite', 'ygapo', 'Justine', 'Basuto', 'synanastomosis', 'quadrated', 'nonerudite', 'solent', 'typholysin', 'pollinar', 'litus', 'isolinolenic', 'hematoporphyrin', 'necromancy', 'luteous', 'eriophyllous', 'battologist', 'bifarious', 'simoom', 'venatic', 'tarantara', 'helodes', 'countervair', 'pseudopodia', 'uroschesis', 'benamidar', 'mucker', 'indecence', 'hydroplatinocyanic', 'wanderyear', 'agile', 'liferoot', 'glout', 'rooibok', 'Acalypha', 'plumpen', 'Tiwaz', 'ked', 'conquest', 'turricula', 'achillobursitis', 'nonsymbiotically', 'choragy', 'Gastrophilus', 'planirostral', 'indiscrete', 'repugnant', 'blindfoldedness', 'foreschool', 'auxiliatory', 'Eleutheri', 'linking', 'truantism', 'wringer', 'constructorship', 'periuranium', 'cleanse', 'fawn', 'Leptocephalus', 'restitutory', 'Quapaw', 'jolly', 'exothermous', 'sonnetwise', 'tubotympanal', 'uily', 'trickstering', 'characterological', 'paramorphine', 'purwannah', 'greenbrier', 'legislatively', 'infraradular', 'maximum', 'overtense', 'crumbly', 'uninvigorated', 'rumbustiousness', 'lactosuria', 'superstructural', 'uxorious', 'esoteric', 'unworshiped', 'Adamastor', 'metalleity', 'preposterously', 'hypocycloidal', 'Bakuninist', 'abstainment', 'unwritable', 'calycinal', 'underproduction', 'sloosh', 'coccous', 'distill', 'resatisfy', 'Luffa', 'klendusity', 'assident', 'usucapt', 'stealy', 'hyalophagia', 'Matagalpan', 'dunner', 'outcomer', 'ostracode', 'roccellic', 'Stephanian', 'postcalcarine', 'Carboniferous', 'autographically', 'oncological', 'radiculose', 'unpenetrated', 'plainsman', 'undoweled', 'billyboy', 'foreacquaint', 'boobery', 'Mopan', 'parode', 'infracostalis', 'favoress', 'toothcup', 'clipped', 'posticteric', 'morphinism', 'demonish', 'spratty', 'cynoid', 'nonbrowsing', 'bloodthirsty', 'deliveror', 'conarial', 'ceratitic', 'abaff', 'Boschneger', 'lithuresis', 'physitheistic', 'turpethin', 'kendir', 'Pythagoreanism', 'pteroma', 'unhidable', 'retter', 'indeclinably', 'nontraditional', 'sulfoacid', 'spinosotuberculate', 'slagman', 'palaeography', 'wreath', 'depasture', 'uneffeminated', 'unutterably', 'impleadable', 'snafu', 'bronchotomist', 'apodyterium', 'basically', 'nondeist', 'stadhouse', 'barbellate', 'wrothly', 'disintegratory', 'atriensis', 'piceotestaceous', 'malacopod', 'paratragoedia', 'klipspringer', 'Albanenses', 'endoplastule', 'spiteful', 'secularness', 'Amerindic', 'Doris', 'colonist', 'unredeemedness', 'epistemological', 'accessibly', 'bloodthirster', 'dirtbird', 'maioid', 'scyphiform', 'emotionless', 'waldmeister', 'unforestalled', 'anazoturia', 'Trionychoideachid', 'cytopathological', 'bootee', 'Caunos', 'verdigrisy', 'mild', 'recidivous', 'unmountainous', 'saponarin', 'semiannealed', 'tanacetin', 'angiostomize', 'phlegmatism', 'xanthodontous', 'frugalism', 'whush', 'coky', 'parodic', 'pupilate', 'threateningly', 'riddlings', 'vermiparousness', 'phalangian', 'misdispose', 'unhandy', 'aspish', 'chemicopharmaceutical', 'benzoiodohydrin', 'flexility', 'Grapsus', 'pentamerid', 'benzoid', 'taintment', 'vindicate', 'speeding', 'typonymic', 'gemless', 'execrator', 'borg', 'Tartarology', 'benzotetrazole', 'Riksmaal', 'sacrocostal', 'escort', 'fungo', 'submarinist', 'cebine', 'puntist', 'ropewalk', 'posthole', 'microdentous', 'prion', 'crumb', 'homoeomerian', 'kidnap', 'appointee', 'scary', 'vetanda', 'undermark', 'nonjudicial', 'jerseyed', 'recusancy', 'sicilicum', 'kleeneboc', 'pampsychist', 'pummel', 'Kartvelian', 'postantennal', 'squelch', 'cherishable', 'Majesta', 'spiflicated', 'dodginess', 'witnessable', 'sighful', 'connaught', 'backen', 'ginglyni', 'dissipated', 'sech', 'copple', 'inogenesis', 'Ascupart', 'Japanesquery', 'cappelenite', 'extraenteric', 'thicketed', 'areological', 'responsibleness', 'woldlike', 'scrap', 'methenamine', 'pegman', 'unsanctify', 'Dacian', 'dais', 'epiblema', 'compactedness', 'pawnbroker', 'mellow', 'moveableness', 'vorticist', 'chargeless', 'polyserositis'];
				var firstname = ['Alexandra', 'Alison', 'Amanda', 'Amelia', 'Amy', 'Andrea', 'Angela', 'Anna', 'Anne', 'Audrey', 'Ava', 'Bella', 'Bernadette', 'Carol', 'Caroline', 'Carolyn', 'Chloe', 'Claire', 'Deirdre', 'Diana', 'Diane', 'Donna', 'Dorothy', 'Elizabeth', 'Ella', 'Emily', 'Emma', 'Faith', 'Felicity', 'Fiona', 'Gabrielle', 'Grace', 'Hannah', 'Heather', 'Irene', 'Jan', 'Jane', 'Jasmine', 'Jennifer', 'Jessica', 'Joan', 'Joanne', 'Julia', 'Karen', 'Katherine', 'Kimberly', 'Kylie', 'Lauren', 'Leah', 'Lillian', 'Lily', 'Lisa', 'Madeleine', 'Maria', 'Mary', 'Megan', 'Melanie', 'Michelle', 'Molly', 'Natalie', 'Nicola', 'Olivia', 'Penelope', 'Pippa', 'Rachel', 'Rebecca', 'Rose', 'Ruth', 'Sally', 'Samantha', 'Sarah', 'Sonia', 'Sophie', 'Stephanie', 'Sue', 'Theresa', 'Tracey', 'Una', 'Vanessa', 'Victoria', 'Virginia', 'Wanda', 'Wendy', 'Yvonne', 'Zoe', 'Adrian', 'Alan', 'Alexander', 'Andrew', 'Anthony', 'Austin', 'Benjamin', 'Blake', 'Boris', 'Brandon', 'Brian', 'Cameron', 'Carl', 'Charles', 'Christian', 'Christopher', 'Colin', 'Connor', 'Dan', 'David', 'Dominic', 'Dylan', 'Edward', 'Eric', 'Evan', 'Frank', 'Gavin', 'Gordon', 'Harry', 'Ian', 'Isaac', 'Jack', 'Jacob', 'Jake', 'James', 'Jason', 'Joe', 'John', 'Jonathan', 'Joseph', 'Joshua', 'Julian', 'Justin', 'Keith', 'Kevin', 'Leonard', 'Liam', 'Lucas', 'Luke', 'Matt', 'Max', 'Michael', 'Nathan', 'Neil', 'Nicholas', 'Oliver', 'Owen', 'Paul', 'Peter', 'Phil', 'Piers', 'Richard', 'Robert', 'Ryan', 'Sam', 'Sean', 'Sebastian', 'Simon', 'Stephen', 'Steven', 'Stewart', 'Thomas', 'Tim', 'Trevor', 'Victor', 'Warren', 'William'];
				var lastname = ['Abraham', 'Allan', 'Alsop', 'Anderson', 'Arnold', 'Avery', 'Bailey', 'Baker', 'Ball', 'Bell', 'Berry', 'Black', 'Blake', 'Bond', 'Bower', 'Brown', 'Buckland', 'Burgess', 'Butler', 'Cameron', 'Campbell', 'Carr', 'Chapman', 'Churchill', 'Clark', 'Clarkson', 'Coleman', 'Cornish', 'Davidson', 'Davies', 'Dickens', 'Dowd', 'Duncan', 'Dyer', 'Edmunds', 'Ellison', 'Ferguson', 'Fisher', 'Forsyth', 'Fraser', 'Gibson', 'Gill', 'Glover', 'Graham', 'Grant', 'Gray', 'Greene', 'Hamilton', 'Hardacre', 'Harris', 'Hart', 'Hemmings', 'Henderson', 'Hill', 'Hodges', 'Howard', 'Hudson', 'Hughes', 'Hunter', 'Ince', 'Jackson', 'James', 'Johnston', 'Jones', 'Kelly', 'Kerr', 'King', 'Knox', 'Lambert', 'Langdon', 'Lawrence', 'Lee', 'Lewis', 'Lyman', 'MacDonald', 'Mackay', 'Mackenzie', 'MacLeod', 'Manning', 'Marshall', 'Martin', 'Mathis', 'May', 'McDonald', 'McLean', 'McGrath', 'Metcalfe', 'Miller', 'Mills', 'Mitchell', 'Morgan', 'Morrison', 'Murray', 'Nash', 'Newman', 'Nolan', 'North', 'Ogden', 'Oliver', 'Paige', 'Parr', 'Parsons', 'Paterson', 'Payne', 'Peake', 'Peters', 'Piper', 'Poole', 'Powell', 'Pullman', 'Quinn', 'Rampling', 'Randall', 'Rees', 'Reid', 'Roberts', 'Robertson', 'Ross', 'Russell', 'Rutherford', 'Sanderson', 'Scott', 'Sharp', 'Short', 'Simpson', 'Skinner', 'Slater', 'Smith', 'Springer', 'Stewart', 'Sutherland', 'Taylor', 'Terry', 'Thomson', 'Tucker', 'Turner', 'Underwood', 'Vance', 'Vaughan', 'Walker', 'Wallace', 'Walsh', 'Watson', 'Welch', 'White', 'Wilkins', 'Wilson', 'Wright', 'Young'];
				var lorem = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero', 'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut', 'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia', 'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros', 'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa', 'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus', 'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus', 'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam', 'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in', 'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque', 'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis', 'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada', 'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam', 'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat', 'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante', 'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae', 'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl', 'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu', 'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra', 'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae', 'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu', 'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis', 'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis', 'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam', 'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi', 'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus', 'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus', 'elementum', 'tempor', 'risus', 'cras'];

				if (command.indexOf('|') >= 0) {
					cmd = command.split('|')[0];
					val = command.split('|')[1];
				} else {
					cmd = command;
				}

				var _this = this;

				if (cmd == 'cdnjs:search') {
					var _ret = function () {
						var query = prompt('Enter script name:', '');
						if (!query) return {
								v: false
							};

						_this.$scope.commands = [{ value: 'Loading...', cmd: '' }];
						_this.$scope.command_show = true;

						_this.$http.post('https://2qwlvlxzb6-dsn.algolia.net/1/indexes/libraries/query?x-algolia-api-key=2663c73014d2e4d6d1778cc8ad9fd010&x-algolia-application-id=2QWLVLXZB6', { "params": "query=" + query }).success(function (data) {
							_this.$scope.commands = [];
							var items = data.hits;
							for (var i = 0; i < items.length; i++) {
								_this.$scope.commands.push({ value: items[i].name, descr: items[i].description, cmd: 'cdnjs:getversion|' + query });
							}
						});
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}

				if (cmd == 'cdnjs:getfilename') {

					_this.$scope.commands = [];
					_this.$scope.command_show = true;

					for (var i = 0; i < _this.$scope.cdnjs_files.length; i++) {
						_this.$scope.commands.push({ value: _this.$scope.cdnjs_files[i], cmd: 'cdnjs:insert|' + val + ',' + _this.$scope.cdnjs_files[i] });
					}
				}

				if (cmd == 'cdnjs:getversion') {
					_this.$scope.commands = [{ value: 'Loading...', cmd: '' }];
					_this.$scope.command_show = true;

					_this.$http.get('/lib/' + val).success(function (resp) {
						_this.$scope.commands = [];
						var match = resp.match(/\<option value="(.*?)"/g);
						var files = resp.match(/library-url'>(.*?)<\/p>/g);

						console.log(files);

						_this.$scope.cdnjs_files = [];

						for (var i = 0; i < files.length; i++) {
							var filename = files[i].replace('library-url\'>', '').replace('</p>', '');
							_this.$scope.cdnjs_files.push(filename);
						}

						for (var i = 0; i < match.length; i++) {
							var version = match[i].replace('<option value="', '').replace('"', '');
							_this.$scope.commands.push({ value: version, cmd: 'cdnjs:getfilename|' + version });
						}
					});
				}

				if (cmd == 'cdnjs:insert') {

					var version = val.split(',')[0];
					var filename = val.split(',')[1];
					var _text = '//cdnjs.cloudflare.com/ajax/libs/jquery/' + version + '/' + filename;
					_this.$scope.editor.session.insert(position, _text);
				}

				if (cmd == 'random:int') {
					var minmax = prompt('Random integer from-to:', '1,100');
					if (!minmax) return false;
					var min = minmax.split(',')[0];
					var max = minmax.split(',')[1];
					var _text2 = Math.floor(Math.random() * (max - min + 1) + min).toString();
					_this.$scope.editor.session.insert(position, _text2);
				}

				if (cmd == 'random:float') {
					var _minmax = prompt('Random integer from-to:', '1,100');
					if (!_minmax) return false;
					var _min = _minmax.split(',')[0];
					var _max = _minmax.split(',')[1];
					var _text3 = Math.random() * (_max - _min) + _min;
					_this.$scope.editor.session.insert(position, _text3);
				}

				if (cmd == 'random:text') {
					var text = '';

					for (var i = 0; i < 30; i++) {
						text += words[Math.floor(Math.random() * words.length)] + ' ';
					}_this.$scope.editor.session.insert(position, text.trim());
				}

				if (cmd == 'random:uuid') {
					var _text4 = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
						var r = Math.random() * 16 | 0,
						    v = c == 'x' ? r : r & 0x3 | 0x8;return v.toString(16);
					});
					_this.$scope.editor.session.insert(position, _text4);
				}

				if (cmd == 'random:url') {
					var _text5 = 'http' + (Math.round(Math.random() * 1) > 0 ? 's' : '') + '://' + words[Math.floor(Math.random() * words.length)] + '.com/' + words[Math.floor(Math.random() * words.length)] + '/' + words[Math.floor(Math.random() * words.length)] + '?q=' + words[Math.floor(Math.random() * words.length)];
					_this.$scope.editor.session.insert(position, _text5);
				}

				if (cmd == 'random:email') {
					var _text6 = words[Math.floor(Math.random() * words.length)] + '@' + words[Math.floor(Math.random() * words.length)] + '.com';
					_this.$scope.editor.session.insert(position, _text6);
				}

				if (cmd == 'random:firstname') {
					var _text7 = firstname[Math.floor(Math.random() * firstname.length)];
					_this.$scope.editor.session.insert(position, _text7);
				}

				if (cmd == 'random:lastname') {
					var _text8 = lastname[Math.floor(Math.random() * lastname.length)];
					_this.$scope.editor.session.insert(position, _text8);
				}

				if (cmd == 'random:fullname') {
					var _text9 = firstname[Math.floor(Math.random() * firstname.length)] + ' ' + lastname[Math.floor(Math.random() * lastname.length)];
					_this.$scope.editor.session.insert(position, _text9);
				}

				if (cmd == 'random:hex') {
					var _text10 = "#" + ((1 << 24) * Math.random() | 0).toString(16);
					_this.$scope.editor.session.insert(position, _text10);
				}

				if (cmd == 'random:ip4') {
					var _text11 = Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255);
					_this.$scope.editor.session.insert(position, _text11);
				}

				if (cmd == 'random:ip6') {
					var _text12 = Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase();
					_this.$scope.editor.session.insert(position, _text12);
				}

				if (cmd == 'random:ip6') {
					var _text13 = Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase() + ':' + Math.random().toString(36).substr(2, 4).toUpperCase();
					_this.$scope.editor.session.insert(position, _text13);
				}

				if (cmd == 'random:letnum') {
					var _text14 = Math.random().toString(36).substr(2, Math.random() * 30);
					_this.$scope.editor.session.insert(position, _text14);
				}

				if (cmd == 'random:lorem') {
					var text = '';

					for (var i = 0; i < 30; i++) {
						text += lorem[Math.floor(Math.random() * lorem.length)] + ' ';
					}_this.$scope.editor.session.insert(position, text.trim());
				}

				if (cmd == 'snippet:for') {
					var text = "for (var i = 0; i < Things.length; i++)\n{\n\tThings[i]\n}";
					_this.$scope.editor.session.insert(position, text.trim());
				}

				setTimeout(function () {
					_this.$scope.editor.focus();
				});
			}

			// Контроль изменения просмотра примера

		}, {
			key: 'viewerShow',
			value: function viewerShow(bool) {
				var _this = this;
				_this.$scope.codeRunned = bool;
			}

			// Вносит код в iframe

		}, {
			key: 'writeCode',
			value: function writeCode() {
				var _this = this;
				var iframe = document.getElementById('viewer');
				iframe = iframe.contentWindow || iframe.contentDocument.document || iframe.contentDocument;
				iframe.document.open();
				iframe.document.write(_this.$scope.editor.getValue());
				iframe.document.close();
			}

			// Просмотра результата HTML

		}, {
			key: 'runCode',
			value: function runCode() {
				this.viewerShow(true);
				this.writeCode();
			}

			// Скрыть результата HTML

		}, {
			key: 'closeCode',
			value: function closeCode() {
				this.viewerShow(false);
			}

			// Сохранение кода

		}, {
			key: 'saveCode',
			value: function saveCode() {
				var _this = this;

				var arr = {
					cid: _this.$scope.currentCID,
					mode: _this.$scope.currentMode,
					code: btoa(unescape(encodeURIComponent(_this.$scope.currentCode)))
				};

				_this.$scope.isSaving = true;

				// На момент сохранения, запрещаем редактирование.
				$d.addClass($d.get('.ace_scroller')[0], 'disabled');

				// Отправляем изменения на сервер
				_this.$http.post('save' + location.pathname, arr).success(function (data) {
					_this.$scope.isSaving = false;
					_this.disableEditor(false);
				});
			}

			// Запрет на редактирование

		}, {
			key: 'disableEditor',
			value: function disableEditor() {
				var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				if (bool) $d.addClass($d.get('.ace_scroller')[0], 'disabled');else $d.removeClass($d.get('.ace_scroller')[0], 'disabled');
				this.$scope.editor.textInput.getElement().disabled = bool;
			}
		}, {
			key: 'setCode',
			value: function setCode(data) {
				var _this = this;
				_this.$scope.currentCID = data.cid;
				_this.$scope.currentMode = data.mode;
				_this.$scope.currentCode = _this.dcd64(data.code);
				_this.$scope.editor.setValue(_this.dcd64(data.code), 1);
				if (data.hasOwnProperty('viewer')) _this.$scope.codeRunned = !!data.viewer;
				if (data.hasOwnProperty('autorun')) _this.$scope.autoRun = !!data.autorun;

				if (_this.$scope.autoRun == true && _this.$scope.currentMode == 'html') {
					this.writeCode();
				}

				//_this.$scope.$apply();
				_this.disableEditor(true);

				clearTimeout(_this.$scope.waitEditor);

				_this.$scope.waitEditor = setTimeout(function () {
					_this.disableEditor(false);
				}, _this.$scope.saveDelay);
			}
		}, {
			key: 'dcd64',
			value: function dcd64(c) {
				0 <= c.indexOf("=") && (c = c.substr(0, c.indexOf("=")));for (var k = 0, d = 0, b, l, e, g, f = 0, a, h, m = ""; k < c.length; ++k) {
					l = "=" == c.charAt(k) ? 0 : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(c.charAt(k));d = (d + 6) % 8;if (6 != d) {
						b += l >> d;if (0 == f) g = !0, h = 0, e = 1, 128 > b && (e = 0, h = b & 64, g = !1);else if (128 != (b & 192)) return !1;for (a = 32; g && 0 < a; a >>= 1) {
							b & a ? ++e : g = !1;
						}g || (a = 6 + 6 * f - e, 6 < a && (a = 6), a && (h += b % (1 << a) << 6 * (e - f)));f == e ? (m += String.fromCharCode(h), f = 0) : ++f;
					}b = d ? l % (1 << d) << 8 - d : 0;
				}return m;
			}
		}]);

		return AppController;
	}();

	exports.default = AppController;


	AppController.$inject = ['$scope', '$socket', '$http', '$sce'];

/***/ }
/******/ ]);