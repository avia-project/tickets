/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ../node_modules/babel-loader/lib/index.js):\\nSyntaxError: /home/stepan/Documents/university/aviaproject/tickets/src/js/app.js: Unexpected token (165:0)\\n\\n\\u001b[0m \\u001b[90m 163 | \\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 164 | \\u001b[39m  userPageUI\\u001b[33m.\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 165 | \\u001b[39m})\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m     | \\u001b[39m\\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 166 | \\u001b[39m\\u001b[0m\\n    at Parser.raise (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:6932:17)\\n    at Parser.unexpected (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:8325:16)\\n    at Parser.parseIdentifierName (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10284:18)\\n    at Parser.parseIdentifier (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10262:23)\\n    at Parser.parseMaybePrivateName (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9606:19)\\n    at Parser.parseSubscript (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9236:28)\\n    at Parser.parseSubscripts (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9188:19)\\n    at Parser.parseExprSubscripts (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9177:17)\\n    at Parser.parseMaybeUnary (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9147:21)\\n    at Parser.parseExprOps (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9013:23)\\n    at Parser.parseMaybeConditional (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:8986:23)\\n    at Parser.parseMaybeAssign (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:8932:21)\\n    at Parser.parseExpression (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:8882:23)\\n    at Parser.parseStatementContent (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10742:23)\\n    at Parser.parseStatement (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10613:17)\\n    at Parser.parseBlockOrModuleBlockBody (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:11189:25)\\n    at Parser.parseBlockBody (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:11176:10)\\n    at Parser.parseBlock (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:11160:10)\\n    at Parser.parseFunctionBody (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10179:24)\\n    at Parser.parseArrowExpression (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10120:10)\\n    at Parser.parseExprAtom (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9458:18)\\n    at Parser.parseExprSubscripts (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9167:23)\\n    at Parser.parseMaybeUnary (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9147:21)\\n    at Parser.parseExprOps (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9013:23)\\n    at Parser.parseMaybeConditional (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:8986:23)\\n    at Parser.parseMaybeAssign (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:8932:21)\\n    at Parser.parseExprListItem (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:10254:18)\\n    at Parser.parseCallExpressionArguments (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9364:22)\\n    at Parser.parseSubscript (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9272:29)\\n    at Parser.parseSubscripts (/home/stepan/Documents/university/aviaproject/tickets/node_modules/@babel/parser/lib/index.js:9188:19)\");\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });