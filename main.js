(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\twidth:100px;\r\n\theight:100px;\r\n\tborder: 1px solid black;\r\n\tmargin: 2px;\r\n\t-webkit-user-select: none;\r\n\t   -moz-user-select: none;\r\n\t    -ms-user-select: none;\r\n\t        user-select: none;\r\n}\r\n.cards {\r\n\tdisplay: flex;\r\n}\r\n.buy-list{\r\n\tdisplay: flex;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>\n  Hand:\n</h2>\n<div class=\"cards\">\n  <div class=\"card\" *ngFor=\"let card of player?.hand\" [style.background-color]=\"getStyle(card)\">\n    {{card.name}}\n  </div>\n</div>\n\n\n<div>\n</div>\n<div>\n  Money: ${{player?.money}}\n</div>\n<div>\n  Victory points: {{player?.victory}} / {{victoryGoal}}\n  <button *ngIf=\"press\" (click)=\"prestiege()\">\n    Prestiege't!\n  </button>\n</div>\n<h2>\n  Buy:\n</h2>\n<div class=\"buy-list\">\n  <div *ngFor=\"let card of buyList\">\n    <button class=\"card\" (click)=\"player.buy(card)\" [style.background-color]=\"getStyle(card)\">\n      {{card.name}} : {{card.cost}}\n    </button>\n  </div>\n</div>\n\n<h2>\n  <div *ngIf=\"prestiege > 0\">\n    Prestiege {{player?.prestiegeCount}},\n  </div>\n  Turn {{player?.turnCount}}:\n</h2>\n<div *ngFor=\"let action of turnActions\">\n  {{action}}\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.cards = {
            copper: new Card("Copper", cardType.treasure, 10, function (player, count) { return player.money += count; }),
            silver: new Card("Silver", cardType.treasure, 30, function (player, count) { return player.money += 2 * count; }),
            gold: new Card("Gold", cardType.treasure, 50, function (player, count) { return player.money += 3 * count; }),
            estate: new Card("Estate", cardType.victory, 20, function (player, count) { return player.victory += 1 * count; }),
            duchy: new Card("Duchy", cardType.victory, 50, function (player, count) { return player.victory += 3 * count; }),
            province: new Card("Province", cardType.victory, 80, function (player, count) { return player.victory += 6 * count; }),
            village: new Card("Village", cardType.action, 30, function (player, count) {
                player.actionsLeft += 2 * count;
                player.drawCards(count);
            }),
            laboratory: new Card("Laboratory", cardType.action, 50, function (player, count) {
                player.actionsLeft += count;
                player.drawCards(2 * count);
            }),
            smithy: new Card("Smithy", cardType.action, 40, function (player, count) {
                player.drawCards(3 * count);
            })
        };
        this.defaultDeck = [
            this.cards.copper,
            this.cards.copper,
            this.cards.copper,
            this.cards.copper,
            this.cards.copper,
            this.cards.copper,
            this.cards.copper,
            this.cards.estate,
            this.cards.estate,
            this.cards.estate
        ];
        this.turnActions = [];
        this.speed = 3000;
        this.press = false;
        this.buyList = Object.values(this.cards);
        this.victoryGoal = 2000;
        this.player = new Player();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.player.deck = this.defaultDeck.slice();
        setTimeout(function () { return _this.tick(); }, 0);
    };
    AppComponent.prototype.tick = function () {
        var _this = this;
        this.turnActions = [];
        this.player.newTurn();
        var treasures = 0;
        for (var i = 0; i < this.player.hand.length; i++) {
            var next = this.player.hand[i];
            if (next.type !== cardType.action || this.player.actionsLeft > 0) {
                if (next.type)
                    this.player.actionsLeft--;
                this.player.hand[i].effect(this.player, 1);
                this.turnActions.push("Played " + next.name);
            }
        }
        if (this.player.victory > this.victoryGoal) {
            this.press = true;
        }
        setTimeout(function () { return _this.tick(); }, this.speed);
    };
    AppComponent.prototype.prestiege = function () {
        this.speed /= 2;
        this.press = false;
        this.player.prestiege();
        this.player.deck = this.defaultDeck.slice();
    };
    AppComponent.prototype.getStyle = function (card) {
        switch (card.type) {
            case cardType.treasure:
                return "#ff3";
            case cardType.victory:
                return "#3f3";
            case cardType.action:
                return "#77f";
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());

var Player = /** @class */ (function () {
    function Player() {
        this.deck = [];
        this.hand = [];
        this.handSize = 5;
        this.actions = 1;
        this.turnCount = 0;
        this.money = 0;
        this.victory = 0;
        this.prestiegeCount = 0;
        this.cardsInHand = 0;
    }
    Player.prototype.reset = function () {
        this.deck = [];
        this.hand = [];
        this.turnCount = 0;
        this.money = 0;
        this.victory = 0;
    };
    Player.prototype.prestiege = function () {
        this.reset();
        this.actions++;
        this.handSize++;
        this.prestiegeCount++;
    };
    Player.prototype.addToDeck = function (card) {
        this.deck.push(card);
    };
    Player.prototype.buy = function (card) {
        if (this.money >= card.cost) {
            this.money -= card.cost;
            this.deck.push(card);
        }
    };
    Player.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
        }
        var _a;
    };
    Player.prototype.drawCards = function (cards) {
        this.cardsInHand += cards;
        this.hand = this.deck.slice(0, this.cardsInHand);
    };
    Player.prototype.newTurn = function () {
        this.shuffleArray(this.deck);
        this.cardsInHand = 0;
        this.drawCards(this.handSize);
        this.turnCount++;
        this.actionsLeft = this.actions;
    };
    return Player;
}());
var Card = /** @class */ (function () {
    function Card(name, type, cost, effect) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.effect = effect;
    }
    Card.prototype.getCardType = function (array, type) {
        return array.filter(function (card) { return card.type === type; });
    };
    return Card;
}());
var cardType;
(function (cardType) {
    cardType[cardType["treasure"] = 0] = "treasure";
    cardType[cardType["action"] = 1] = "action";
    cardType[cardType["victory"] = 2] = "victory";
})(cardType || (cardType = {}));


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\bobma\prog\card\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map